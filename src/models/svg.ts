export type SVGType = {
  scale: number
  rotation: number
  primitiveMesh: object | null
  x: number
  y: number
  fileName: string | null
}
export const DEFAULT_SVG = {
  scale: 0.7,
  rotation: 0,
  primitiveMesh: null,
  x: 0,
  y: 0,
  fileName: null,
}
