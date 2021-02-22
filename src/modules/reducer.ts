import { ActionTypes, RESET_FACE_REFS, SET_STATE } from './actions'
import { FACE_OPTION_LIST } from '../models/face'
import { GlobalStateType } from './global'

export const reducer = (state: GlobalStateType, action: ActionTypes): GlobalStateType => {
  const outputState = { ...state }
  switch (action.type) {
    case RESET_FACE_REFS:
      FACE_OPTION_LIST.forEach(key => {
        outputState[key] = { ...outputState[key], ref: null }
      })
      return outputState
      break

    case SET_STATE:
      const newState = action.input

      for (const key in newState) {
        outputState[key] = newState[key]
      }
      return outputState
      break
  }
}

export const DispatchVerbs = {
  RESET_FACE_REFS: RESET_FACE_REFS,
  RESET_STORE: SET_STATE,
}
