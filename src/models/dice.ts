export type DiceType =
  | 'd4'
  | 'd6'
  | 'd8'
  | 'd10'
  | 'd100'
  | 'd12'
  | 'd20'

export const DICE_LIST = ['d4', 'd6', 'd8', 'd10', 'd100', 'd12', 'd20']

export const isDiceType = (keyInput: string): keyInput is DiceType => {
  return DICE_LIST.includes(keyInput)
}
