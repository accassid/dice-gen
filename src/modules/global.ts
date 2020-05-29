import { createGlobalState } from 'react-hooks-global-state'

const initialState = {
  rightPanelActive: true,
  rightPanelActiveMobile: false,
}

export const { useGlobalState } = createGlobalState(initialState)
