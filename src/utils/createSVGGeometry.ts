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
  let bspGeometry = null
  for (let j = 0; j < shapes.length; j++) {
    const shape = shapes[j]
    const partialGeometry = new ExtrudeGeometry(shape, {
      depth: depth,
      bevelEnabled: false,
    })
    if (!bspGeometry) bspGeometry = new ThreeBSP(partialGeometry)
    else {
      const bspPartial = new ThreeBSP(partialGeometry)
      bspGeometry = bspGeometry.union(bspPartial)
    }
  }
  geometry = bspGeometry.toGeometry()
  geometry.mergeVertices()
  const faceMap: Record<string, Array<Face3>> = {}
  geometry.faces.forEach(face => {
    const key = [face.a, face.b, face.c].sort().join(',')
    if (faceMap[key]) faceMap[key].push(face)
    else faceMap[key] = [face]
  })
  console.log(Object.values(faceMap))

  const segmentMap = {}

  // geometry.vertices.forEach(vector => {
  //   vertices2.push(new Vector3(vector.x, vector.y, -1))
  // })
  // geometry.vertices = vertices2
  //
  //
  // geometry.faces.forEach(face => {
  //   const sides = [[face.a, face.b].sort().join(','), [face.b, face.c].sort().join(','), [face.c, face.a].sort().join(',')]
  //   sides.forEach(side => {
  //     if(segmentMap[side]) segmentMap[side] = segmentMap[side]+1
  //     else segmentMap[side] = 1
  //   })
  //   // face.normal = new Vector3(0 , 0, 1)
  //   // face.vertexNormals = [new Vector3(0 , 0, 1), new Vector3(0 , 0, 1), new Vector3(0 , 0, 1)]
  //   faces2.push(new Face3(face.a+originalLength, face.b+originalLength, face.c+originalLength))
  // })
  // console.log('Initial length', Object.keys(segmentMap).length)
  // for (const key in segmentMap){
  //   if (segmentMap[key] > 1) {
  //     console.log('yo')
  //     delete segmentMap[key]
  //   }
  // }
  // console.log('Only edges length', Object.keys(segmentMap).length)
  // console.log("Vertices length", originalLength)
  // console.log(segmentMap)
  // geometry.faces = faces2

  // for (const key in segmentMap){
  //   const split = key.split(',')
  //   const a = Number(split[0])
  //   const b = Number(split[1])
  //   const a1 = a + originalLength
  //   const b1 = b + originalLength
  //   geometry.faces.push(new Face3(a, b, b1))
  //   geometry.faces.push(new Face3(b1, a1, a))
  // }
  //
  // const holeMap = {}
  // geometry.faces.forEach(face => {
  //   const sides = [[face.a, face.b].sort().join(','), [face.b, face.c].sort().join(','), [face.c, face.a].sort().join(',')]
  //   sides.forEach(side => {
  //     if(holeMap[side]) holeMap[side] += 1
  //     else holeMap[side] = 1
  //   })
  // })
  //
  // console.log('Initial hole map', Object.keys(holeMap).length)
  // for (const key in holeMap){
  //   if (holeMap[key] > 1) delete holeMap[key]
  // }
  // console.log('Final hole map', Object.keys(holeMap).length)
  //
  // geometry.normalize()
  // console.log(geometry.faces[0].normal)
  // geometry.computeBoundingSphere()
  // geometry.computeMorphNormals()

  if (geometry) {
    geometry.center()
    geometry.rotateZ(Math.PI - (svg.rotation * Math.PI) / 180)
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
