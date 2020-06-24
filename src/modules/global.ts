import { createGlobalState } from 'react-hooks-global-state'
import { Mesh } from 'three'
import { SVGType } from '../models/svg'
import { DEFAULT_FACE_STATE, FaceStateType } from '../models/face'
import { Font } from 'three'
import {DEFAULT_DICE_OPTIONS, DiceOptions, DiceType} from '../models/dice'

export type GlobalStateType = {
  rightPanelActive: boolean
  rightPanelActiveMobile: boolean
  fontUrl: string
  svgFile: File | null

  die: DiceType

  diePreview: Mesh | null

  globalFont: Font | null
  globalFontScale: number
  globalSize: number
  globalDepth: number
  globalSVG: Record<string, SVGType>
} & FaceStateType & DiceOptions

export type GlobalStateKey = keyof GlobalStateType

const initialState: GlobalStateType = {
  rightPanelActive: true,
  rightPanelActiveMobile: false,
  fontUrl: '',
  svgFile: null,

  die: 'd10',

  diePreview: null,

  globalFont: null,
  globalFontScale: 0.5,
  globalSize: 20,
  globalDepth: 1,
  globalSVG: {},

  ...DEFAULT_FACE_STATE,
  ...DEFAULT_DICE_OPTIONS,
}
const globalState = createGlobalState(initialState)
export const useGlobalState = globalState.useGlobalState
export const getGlobalState = globalState.getGlobalState
