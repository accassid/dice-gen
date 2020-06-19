import { Geometry, ExtrudeGeometry } from 'three'
import { SVGType } from '../models/svg'

export const createSVGGeometry = (svg: SVGType, depth: number, size: number, die?: string): Geometry => {
  let geometry: Geometry = new Geometry()

  let dieScale = 1
  if (die === 'd4') dieScale = 0.25
  if (die === 'd20') dieScale = 0.6

  for (let i = 0; i < svg.data.paths.length; i++) {
    const path = svg.data.paths[i]
    const shapes = path.toShapes(true, false)
    for (let j = 0; j < shapes.length; j++) {
      const shape = shapes[j]
      const partialGeometry = new ExtrudeGeometry(shape, {
        depth: depth,
        bevelEnabled: false,
      })
      if (!geometry) geometry = partialGeometry
      else geometry.merge(partialGeometry)
    }
  }

  if (geometry) {
    geometry.center()
    geometry.rotateZ(Math.PI)
    let scale = 1
    if (geometry.boundingBox) {
      const targetMax = (size * svg.scale * dieScale) / 2
      if (geometry.boundingBox.max.x > geometry.boundingBox.max.y) scale = targetMax / geometry.boundingBox.max.x
      else scale = targetMax / geometry.boundingBox.max.y
    }
    geometry.scale(scale, scale, 1)
  }
  return geometry
}
