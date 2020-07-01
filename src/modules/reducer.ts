import {ActionTypes, RESET_FACE_REFS} from "./actions";
import {FACE_OPTION_LIST} from "../models/face";
import {GlobalStateType} from "./global";

export const reducer = (state: GlobalStateType, action: ActionTypes): GlobalStateType => {
  switch (action.type) {
    case RESET_FACE_REFS:
      const resetState = {...state}
      FACE_OPTION_LIST.forEach((key) => {
        resetState[key] = {...resetState[key], ref: null}
      })
      return resetState
  }
}