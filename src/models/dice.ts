export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd100' | 'd12' | 'd20'

export const DICE_LIST = ['d4', 'd6', 'd8', 'd10', 'd100', 'd12', 'd20']

export const isDiceType = (keyInput: string): keyInput is DiceType => {
  return DICE_LIST.includes(keyInput)
}

export type DiceOptions = {
  d4Scale: number
  d4FontScale: number
  d4RadiusScale: number

  d6Scale: number
  d6FontScale: number

  d8Scale: number
  d8FontScale: number

  d10Scale: number
  d10Height: number
  d10FontScale: number

  d100Scale: number
  d100FontScale: number
  d100FontVertical: number

  d12Scale: number
  d12FontScale: number

  d20Scale: number
  d20FontScale: number
}

export const DEFAULT_DICE_OPTIONS = {
  d4Scale: 1,
  d4FontScale: 1,
  d4RadiusScale: 1,

  d6Scale: 1,
  d6FontScale: 1,

  d8Scale: 1,
  d8FontScale: 1,

  d10Scale: 1,
  d10FontScale: .55,
  d10Height: .6,

  d100Scale: 1,
  d100FontScale: .4,
  d100FontVertical: 0,

  d12Scale: 1,
  d12FontScale: 1,

  d20Scale: 1,
  d20FontScale: .5,
}

export const isDiceOption = (key: string): key is keyof DiceOptions => {
  return Object.keys(DEFAULT_DICE_OPTIONS).includes(key)
}

export const DICE_FACE_LISTS = {
  'd4': [1,2,3,4],
  'd6': [1,2,3,4,5,6],
  'd8': [1,2,3,4,5,6,7,8],
  'd10': [1,2,3,4,5,6,7,8,9,0],
  'd100': [1,2,3,4,5,6,7,8,9,0],
  'd12': [1,2,3,4,5,6,7,8,9,10,11,12],
  'd20': [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
}