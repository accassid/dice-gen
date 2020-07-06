import { SVGResult } from 'three/examples/jsm/loaders/SVGLoader'

export type SVGType = {
  data: SVGResult
  scale: number
  rotation: number
  primitiveMesh: object | null
}
export const DEFAULT_SVG = {
  data: null,
  scale: 0.7,
  rotation: 0,
  primitiveMesh: null
}
