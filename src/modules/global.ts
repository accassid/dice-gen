import { createGlobalState } from 'react-hooks-global-state'

const initialState = {}

export const { useGlobalState } = createGlobalState(initialState)
