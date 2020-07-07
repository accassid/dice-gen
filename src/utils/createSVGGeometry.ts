import { Geometry, ExtrudeGeometry, Vector3, Face3, Shape, Vector2 } from 'three'
import { SVGType } from '../models/svg'
import complex from 'three-simplicial-complex'
import * as THREE from 'three'
import { ThreeBSP } from 'three-js-csg-es6'

export const createSVGGeometry = (
  svg: SVGType,
  depth: number,
  size: number,
  die: string,
  dieScale: number,
): Geometry => {
  let geometry: Geometry = new Geometry()

  let dieSVGScale = 1
  if (die === 'd4') dieSVGScale = 0.4
  if (die === 'd10' || die === 'd100') dieSVGScale = 0.5
  if (die === 'd20') dieSVGScale = 0.6

  // for (let i = 0; i < svg.data.paths.length; i++) {
  //   const path = svg.data.paths[i]
  //   const shapes = path.toShapes(true, false)
  //   for (let j = 0; j < shapes.length; j++) {
  //     const shape = shapes[j]
  //     const partialGeometry = new ExtrudeGeometry(shape, {
  //       depth: depth,
  //       bevelEnabled: false,
  //     })
  //     if (!geometry) geometry = partialGeometry
  //     else geometry.merge(partialGeometry)
  //   }
  // }
  // console.log(svg.primitiveMesh)
  const Complex = complex(THREE)

  geometry = Complex(svg.primitiveMesh)
  // console.log(geometry)

  const faces2 = geometry.faces.slice()
  const originalLength = geometry.vertices.length
  const vertices2 = geometry.vertices.slice()

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


  const facesFormRect = (face1: Face3, face2: Face3): boolean => {
    if(!face1.normal.equals(face2.normal)) return false
    const union = new Set([...[face1.a, face1.b, face1.c], ...[face2.a, face2.b, face2.c]])
    return union.size > 1
  }
  const getRectString = (face1: Face3, face2: Face3, vertices: Array<Vector3>): string => {
    const vertexList = [face1.a, face1.b, face1.c]
    if (vertexList.indexOf(face2.a) < 0) vertexList.push(face2.a)
    else if (vertexList.indexOf(face2.b) < 0) vertexList.push(face2.b)
    else if (vertexList.indexOf(face2.c) < 0) vertexList.push(face2.c)
    const vertexStringList = vertexList.map(index => `${vertices[index].x},${vertices[index].y},${vertices[index].z}`)
    return vertexStringList.sort().join(':')
  }
  const getFaceString = (face: Face3, vertices: Array<Vector3>): string => {
    const vertexList = [face.a, face.b, face.c]
    const vertexStringList = vertexList.map(index => `${vertices[index].x},${vertices[index].y},${vertices[index].z}`)
    return vertexStringList.sort().join(':')
  }

  geometry = null
  // let bspGeometry = null
  const rectMap = {}
  for (let j = 0; j < shapes.length; j++) {
    const shape = shapes[j]
    const partialGeometry = new ExtrudeGeometry(shape, {
      depth: depth,
      bevelEnabled: false,
    })

    const possibleFaces = []
    partialGeometry.computeFaceNormals()
    partialGeometry.faces.forEach(face => {
      if (face.normal.z !== 0) return
      let found = false
      for (let i = 0; i< possibleFaces.length; i++){
        if (facesFormRect(face, possibleFaces[i])){
          const rectString = getRectString(face, possibleFaces[i], partialGeometry.vertices)
          const face1String = getFaceString(face, partialGeometry.vertices)
          const face2String = getFaceString(possibleFaces[i], partialGeometry.vertices)
          if (rectMap[rectString]) {
            rectMap[rectString].push(face1String)
            rectMap[rectString].push(face2String)
          }
          else rectMap[rectString] = [face1String, face2String]
          possibleFaces.splice(i, 1)
          found = true
          break
        }
      }
      if (!found) possibleFaces.push(face)
    })
    if (!geometry)  {
      // bspGeometry = new ThreeBSP(partialGeometry)
      geometry = partialGeometry
    }
    else {
      // const bspPartial = new ThreeBSP(partialGeometry)
      // bspGeometry = bspGeometry.union(bspPartial)
      geometry.merge(partialGeometry)
    }
  }
  const faceLists: Array<Array<Face3>> = Object.values(rectMap)
  console.log('Total', faceLists.length)
  console.log('Duplicated', faceLists.filter(list => list.length > 2).length)
  // geometry = bspGeometry.toGeometry()
  geometry.mergeVertices()
  // const faceMap: Record<string, Array<Face3>> = {}
  // geometry.faces.forEach(face => {
  //   const keys = [[face.a, face.b].sort().join(','), [face.b, face.c].sort().join(','), [face.c, face.a].sort().join(',')]
  //
  //   keys.forEach(key => {
  //     if (faceMap[key]) faceMap[key].push(face)
  //     else faceMap[key] = [face]
  //   })
  // })




  console.log('before', geometry.faces.length)
  for (const key in rectMap) {
    const faceList = rectMap[key]
    if (faceList.length > 2){
      faceList.forEach(face => {
        geometry.faces = geometry.faces.filter(geometryFace => face !== getFaceString(geometryFace, geometry.vertices)) // TODO do this operation as we're processing the partial geometries
      })
    }
  }
  console.log('after', geometry.faces.length)


  if (geometry) {
    geometry.center()
    // geometry.rotateY(Math.PI)
    geometry.rotateZ( (svg.rotation * Math.PI) / 180)
    let scale = 1
    if (geometry.boundingBox) {
      const targetMax = (size * dieScale * svg.scale * dieSVGScale) / 2
      if (geometry.boundingBox.max.x > geometry.boundingBox.max.y) scale = targetMax / geometry.boundingBox.max.x
      else scale = targetMax / geometry.boundingBox.max.y
    }
    geometry.scale(scale, scale, 1)
  }
  return geometry
}
