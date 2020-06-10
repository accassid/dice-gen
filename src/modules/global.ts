import { createGlobalState } from 'react-hooks-global-state'
import { Mesh } from 'three'
import { SVGType } from '../models/svg'
import { DEFAULT_FACE_STATE, FaceStateType } from '../models/face'
import { Font } from 'three'

export type GlobalStateType = {
  rightPanelActive: boolean
  rightPanelActiveMobile: boolean
  fontUrl: string
  svgFile: File | null

  diePreview: Mesh | null

  globalFont: Font | null
  globalFontScale: number
  globalSize: number
  globalDepth: number
  globalSVG: Record<string, SVGType>

} & FaceStateType

export type GlobalStateKey = keyof GlobalStateType

const initialState: GlobalStateType = {
  rightPanelActive: true,
  rightPanelActiveMobile: false,
  fontUrl: '',
  svgFile: null,

  diePreview: null,

  globalFont: null,
  globalFontScale: .5,
  globalSize: 20,
  globalDepth: 1,
  globalSVG: {},

  ...DEFAULT_FACE_STATE,
}
const globalState = createGlobalState(initialState)
export const useGlobalState = globalState.useGlobalState
export const getGlobalState = globalState.getGlobalState
