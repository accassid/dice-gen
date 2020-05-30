import { createGlobalState } from 'react-hooks-global-state'
import { Scene } from 'three'

type InitialStateType = {
  rightPanelActive: boolean
  rightPanelActiveMobile: boolean
  scene: Scene | null
  fontUrl: string
}
const initialState: InitialStateType = {
  rightPanelActive: true,
  rightPanelActiveMobile: false,
  scene: null,
  fontUrl: '',
}

export const useGlobalState = createGlobalState(initialState).useGlobalState
