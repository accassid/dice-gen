import { Geometry, ExtrudeGeometry } from 'three'
import { SVGType } from '../models/svg'

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
