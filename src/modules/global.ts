import { createStore } from 'react-hooks-global-state'
import { Mesh } from 'three'
import { SVGType } from '../models/svg'
import { DEFAULT_FACE_STATE, FaceStateType } from '../models/face'
import { Font } from 'three'
import { DEFAULT_DICE_OPTIONS, DiceOptions, DiceType } from '../models/dice'
import { reducer } from './reducer'
import { ORIENTATION_INDICATOR, OrientationIndicatorType } from '../models/orientationIndicator'
import { DEFAULT_CONFIGURATION_SETTINGS, ConfigurationSettings } from '../models/Configuration'

export type GlobalStateType = {
  rightPanelActive: boolean
  rightPanelActiveMobile: boolean
  fontUrl: string
  svgFile: File | null

  die: DiceType

  diePreview: Mesh | null

  globalFont: Font | null
  globalFontName: string
  globalFontScale: number
  globalFontUploadActive: boolean
  globalScale: number
  globalDepth: number
  globalSVG: Record<string, SVGType>

  orientationIndicator: OrientationIndicatorType
  orientationIndicatorSize: number
  orientationIndicatorSpace: number
  orientationIndicatorOnD6D8: 0 | 1

  loadingDice: null | { current: number; max: number }
  loadingFaces: null | { current: number; max: number }
} & FaceStateType &
  DiceOptions &
  ConfigurationSettings

export type GlobalStateKey = keyof GlobalStateType

const initialState: GlobalStateType = {
  rightPanelActive: true,
  rightPanelActiveMobile: false,
  fontUrl: '',
  svgFile: null,

  die: 'd6',

  diePreview: null,

  globalFont: null,
  globalFontName: '',
  globalFontScale: 0.5,
  globalFontUploadActive: false,
  globalScale: 1,
  globalDepth: 0.75,
  globalSVG: {},

  orientationIndicator: ORIENTATION_INDICATOR.PERIOD,
  orientationIndicatorSize: 1,
  orientationIndicatorSpace: 1,
  orientationIndicatorOnD6D8: 0,

  loadingDice: null,
  loadingFaces: null,

  ...DEFAULT_FACE_STATE,
  ...DEFAULT_DICE_OPTIONS,
  ...DEFAULT_CONFIGURATION_SETTINGS,
}
const globalState = createStore(reducer, initialState)
export const useGlobalState = globalState.useGlobalState
export const getGlobalState = globalState.getState
export const dispatch = globalState.dispatch
