export const RESET_FACE_REFS = 'resetFaceRefs'
export const SET_STATE = 'setGlobalState'

type GlobalStoreActionTypes = {
  type: 'resetFaceRefs' | 'setGlobalState'
  input?: any
}
export const resetFaceRefs = (): GlobalStoreActionTypes => ({
  type: RESET_FACE_REFS,
})

export const setGlobalState = (newState: any): GlobalStoreActionTypes => ({
  type: SET_STATE,
  input: newState,
})
export type ActionTypes = GlobalStoreActionTypes
