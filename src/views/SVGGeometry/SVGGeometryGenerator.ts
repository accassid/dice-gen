import {createSVGGeometry} from "../../utils/createSVGGeometry";

export const svgGeometryGenerator = (globalScale: number, globalDepth: number, svg, die: string, dieSize: number, d2Radius: number) => {
  if (svg.primitiveMesh) {
    const geometry = createSVGGeometry(svg, globalDepth, globalScale, die, die === 'd2' ? d2Radius * 2 : dieSize)
    return geometry
  }
  return null
}