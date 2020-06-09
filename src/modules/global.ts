import { createGlobalState } from 'react-hooks-global-state'
import { Scene } from 'three'
import { SVGType } from '../models/svg'
import { DEFAULT_FACE, DEFAULT_FACE_STATE, FaceStateType, FaceType } from '../models/face'
import { Font } from 'three'

type InitialStateType = {
  rightPanelActive: boolean
  rightPanelActiveMobile: boolean
  scene: Scene | null
  fontUrl: string
  exporting: boolean
  svgFile: File | null

  globalFont: Font | null
  globalFontScale: number
  globalSVG: Record<string, SVGType>
} & FaceStateType

const initialState: InitialStateType = {
  rightPanelActive: true,
  rightPanelActiveMobile: false,
  scene: null,
  fontUrl: '',
  exporting: false,
  svgFile: null,

  globalFont: null,
  globalFontScale: 1,
  globalSVG: {},

  ...DEFAULT_FACE_STATE,
}

export const useGlobalState = createGlobalState(initialState).useGlobalState
