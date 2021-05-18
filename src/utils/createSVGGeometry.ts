import { Geometry, ExtrudeGeometry, Vector3, Face3, Shape, Vector2 } from 'three'
import { SVGType } from '../models/svg'
import complex from 'three-simplicial-complex'
import * as THREE from 'three'

/**
 * This takes in two faces and checks if they form a rectangle by checking that they are facing the same direction
 * (same normal) and if they share a side.
 * @param face1
 * @param face2
 */
const facesFormRect = (face1: Face3, face2: Face3): boolean => {
  if (!face1.normal.equals(face2.normal)) return false
  const union = new Set([...[face1.a, face1.b, face1.c], ...[face2.a, face2.b, face2.c]])
  return union.size > 1
}

/**
 * Given two faces (triangles) that form a rectangle this functions returns a string representing their points. It
 * bases it off of the actual coordinates of their verticies rather than indices so that rectangles from different
 * geometries can be compared. The vertices are sorted so that rectangle comparisons are always accurate regardless of
 * the original ordering.
 * @param face1
 * @param face2
 * @param vertices
 */
const getRectString = (face1: Face3, face2: Face3, vertices: Array<Vector3>): string => {
  const vertexList = [face1.a, face1.b, face1.c]
  if (vertexList.indexOf(face2.a) < 0) vertexList.push(face2.a)
  else if (vertexList.indexOf(face2.b) < 0) vertexList.push(face2.b)
  else if (vertexList.indexOf(face2.c) < 0) vertexList.push(face2.c)
  const vertexStringList = vertexList.map(index => `${vertices[index].x},${vertices[index].y},${vertices[index].z}`)
  return vertexStringList.sort().join(':')
}

/**
 * This is a custom function to generate an extruded SVG Geometry given an SVG. Functions do exist in three.js to do
 * this however they seem to be very poor at loading in SVGs (filling in holes, not detecting touching faces, etc.)
 * three-simplicial-complex does a sufficient job of converting an SVG into a a 2d mesh however we then need to manually
 * extrude that 2d SVG to the symbol depth for the dice. This function extrudes every single sub face. Then it deletes
 * any faces in those partials that match another face (that means it is not an outward facing face). The partials
 * are all merged together for a final extruded geometry. That geometry is then scaled appropriately while maintaining
 * the passed in depth.
 * @param svg
 * @param depth
 * @param size
 * @param die
 * @param dieScale
 */
export const createSVGGeometry = (
  svg: SVGType,
  depth: number,
  size: number,
  die: string,
  dieScale: number,
  isFace = false,
): Geometry => {
  let geometry: Geometry = new Geometry()

  let dieSVGScale = 1
  if (die === 'd4' && !isFace) dieSVGScale = 0.45
  if (die === 'd10' || die === 'd100') dieSVGScale = 0.5
  if (die === 'd20') dieSVGScale = 0.65

  const Complex = complex(THREE)

  geometry = Complex(svg.primitiveMesh)

  // Create shapes from the faces of the complex geometry which will later be extruded
  const shapes = []
  geometry.faces.forEach(face => {
    const ax = geometry.vertices[face.a].x
    const ay = geometry.vertices[face.a].y

    const bx = geometry.vertices[face.b].x
    const by = geometry.vertices[face.b].y

    const cx = geometry.vertices[face.c].x
    const cy = geometry.vertices[face.c].y
    shapes.push(new Shape([new Vector2(ax, ay), new Vector2(bx, by), new Vector2(cx, cy)]))
  })

  geometry = new Geometry()
  const partialGeometries = [] // Where all the extruded triangles are stored
  const rectMap: Record<string, Array<{ index: number; face: Face3 }>> = {} // Will contain a map of a rectangle string to a list of faces with the index of the partial they come from

  /**
   * Loop over every shape (sub triangle of the svg) and extrude it. Once that geometry is created all of it's side
   * rectangles are calculated and stored in a map with the index of the shape and the faces it contains.
   */
  for (let j = 0; j < shapes.length; j++) {
    const shape = shapes[j]
    const partialGeometry = new ExtrudeGeometry(shape, {
      depth: depth,
      bevelEnabled: false,
    })
    partialGeometries.push(partialGeometry)
    const possibleFaces = []
    partialGeometry.computeFaceNormals()
    partialGeometry.faces.forEach(face => {
      if (face.normal.z !== 0) return
      let found = false
      for (let i = 0; i < possibleFaces.length; i++) {
        if (facesFormRect(face, possibleFaces[i])) {
          const rectString = getRectString(face, possibleFaces[i], partialGeometry.vertices)
          if (rectMap[rectString]) {
            rectMap[rectString].push({ index: j, face: face })
            rectMap[rectString].push({ index: j, face: possibleFaces[i] })
          } else
            rectMap[rectString] = [
              { index: j, face: face },
              { index: j, face: possibleFaces[i] },
            ]
          possibleFaces.splice(i, 1)
          found = true
          break
        }
      }
      if (!found) possibleFaces.push(face)
    })
  }

  /**
   * Loop over every rectangle in the map, if more than two faces make it up, that means it is a rectangle that overlaps
   * which means that it is a face that would be inside the combined extruded svg. Therefore we remove the faces in
   * question from each partial geometry.
   */
  for (const key in rectMap) {
    const faceList = rectMap[key]
    if (faceList.length > 2) {
      faceList.forEach(({ index, face }) => {
        const partialGeometry = partialGeometries[index]
        const faceIndex = partialGeometry.faces.indexOf(face)
        if (faceIndex > -1) partialGeometry.faces.splice(faceIndex, 1)
      })
    }
  }

  // Finally we merge all the partial geometries together to form the full extruded SVG
  partialGeometries.forEach(partial => {
    geometry.merge(partial)
  })

  if (geometry) {
    geometry.center()
    geometry.rotateY(Math.PI)
    geometry.rotateZ((svg.rotation * Math.PI) / 180)
    let scale = 1
    if (geometry.boundingBox) {
      const targetMax = (size * dieScale * svg.scale * dieSVGScale) / 2.3
      if (geometry.boundingBox.max.x > geometry.boundingBox.max.y) scale = targetMax / geometry.boundingBox.max.x
      else scale = targetMax / geometry.boundingBox.max.y
    }
    geometry.scale(scale, scale, 1)
    geometry.translate(svg.x * dieSVGScale * 0.25, svg.y * dieSVGScale * 0.25, 0)
  }
  return geometry
}
