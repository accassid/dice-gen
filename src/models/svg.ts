export type SVGType = {
  scale: number
  rotation: number
  primitiveMesh: Record<string, unknown> | null
  x: number
  y: number
  fileName: string | null
  showNumber: boolean
}
export const DEFAULT_SVG = {
  scale: 0.7,
  rotation: 0,
  primitiveMesh: null,
  x: 0,
  y: 0,
  fileName: null,
  showNumber: false,
}
