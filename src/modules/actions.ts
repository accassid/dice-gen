import { GlobalStateType } from './global'

export const RESET_FACE_REFS = 'resetFaceRefs'
export const SET_STATE = 'setGlobalState'

export type GlobalStoreActionTypes = {
  type: 'resetFaceRefs' | 'setGlobalState'
  input?: Record<string, unknown>
}
export const resetFaceRefs = (): GlobalStoreActionTypes => ({
  type: RESET_FACE_REFS,
})

export const setGlobalState = (newState: GlobalStateType): GlobalStoreActionTypes => ({
  type: SET_STATE,
  input: newState,
})
export type ActionTypes = GlobalStoreActionTypes
