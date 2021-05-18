import { createSVGGeometry } from '../../../utils/createSVGGeometry'
import { SVGType } from '../../../models/svg'
import { Geometry } from 'three'

export const svgGeometryGenerator = (
  globalScale: number,
  globalDepth: number,
  svg: SVGType,
  die: string,
  dieSize: number,
  d2Radius: number,
  isFace = false,
): Geometry | null => {
  if (svg.primitiveMesh) {
    return createSVGGeometry(svg, globalDepth, globalScale, die, die === 'd2' ? d2Radius * 2 : dieSize, isFace)
  }
  return null
}
