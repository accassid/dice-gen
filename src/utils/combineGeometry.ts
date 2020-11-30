import { ExtrudeGeometry, Face3, Geometry, Shape, Vector2 } from 'three'
import { ThreeBSP } from 'three-js-csg-es6'

export const combineGeometry = (geometry: Geometry, depth: number): Geometry => {
  let sum = null

  // const face = geometry.faces[0]
  //
  // const ax = geometry.vertices[face.a].x
  // const ay = geometry.vertices[face.a].y
  //
  // const bx = geometry.vertices[face.b].x
  // const by = geometry.vertices[face.b].y
  //
  // const cx = geometry.vertices[face.c].x
  // const cy = geometry.vertices[face.c].y
  //
  // const shape = new Shape([new Vector2(ax, ay), new Vector2(bx, by), new Vector2(cx, cy)])
  //
  // const partialGeometry = new ExtrudeGeometry(shape, {
  //   depth: depth+0.02,
  //   bevelEnabled: false,
  // })
  //
  // const partialBSP = new ThreeBSP(geometry)
  //
  // const originalBSP = new ThreeBSP(geometry)
  // sum = originalBSP.union(partialBSP)

  geometry.faces.forEach((face: Face3) => {
    const ax = geometry.vertices[face.a].x
    const ay = geometry.vertices[face.a].y

    const bx = geometry.vertices[face.b].x
    const by = geometry.vertices[face.b].y

    const cx = geometry.vertices[face.c].x
    const cy = geometry.vertices[face.c].y

    const shape = new Shape([new Vector2(ax, ay), new Vector2(bx, by), new Vector2(cx, cy)])

    const partialGeometry = new ExtrudeGeometry(shape, {
      depth: depth + 0.02,
      bevelEnabled: false,
    })
    const partialBSP = new ThreeBSP(partialGeometry)
    if (!sum) sum = partialBSP
    else sum = sum.union(partialBSP)
  })

  return sum.toGeometry()
}
