import { SVGResult } from 'three/examples/jsm/loaders/SVGLoader'

export type SVGType = {
  data: SVGResult
  scale: number
  rotation: number
}
export const DEFAULT_SVG = {
  data: null,
  scale: 0.7,
  rotation: 0,
}
