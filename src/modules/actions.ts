export const RESET_FACE_REFS = 'resetFaceRefs'


type ResetFaceRefsType = {
  type: 'resetFaceRefs'
}
export const resetFaceRefs = (): ResetFaceRefsType => ({
  type: RESET_FACE_REFS
})

export type ActionTypes =
  | ResetFaceRefsType