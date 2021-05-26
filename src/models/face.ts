import { Mesh } from 'three'
import { SVGType } from './svg'

export type FaceType = {
  ref: Mesh | null
  text: string
  svg: SVGType | null
}

export const DEFAULT_FACE = {
  ref: null,
  text: 0,
  svg: null,
}

export type FaceOptions =
  | 'd2f1'
  | 'd2f2'
  | 'd4f1'
  | 'd4f2'
  | 'd4f3'
  | 'd4f4'
  | 'd4Crystalf1'
  | 'd4Crystalf2'
  | 'd4Crystalf3'
  | 'd4Crystalf4'
  | 'd4Shardf1'
  | 'd4Shardf2'
  | 'd4Shardf3'
  | 'd4Shardf4'
  | 'd6f1'
  | 'd6f2'
  | 'd6f3'
  | 'd6f4'
  | 'd6f5'
  | 'd6f6'
  | 'd8f1'
  | 'd8f2'
  | 'd8f3'
  | 'd8f4'
  | 'd8f5'
  | 'd8f6'
  | 'd8f7'
  | 'd8f8'
  | 'd10f1'
  | 'd10f2'
  | 'd10f3'
  | 'd10f4'
  | 'd10f5'
  | 'd10f6'
  | 'd10f7'
  | 'd10f8'
  | 'd10f9'
  | 'd10f0'
  | 'd12f1'
  | 'd12f2'
  | 'd12f3'
  | 'd12f4'
  | 'd12f5'
  | 'd12f6'
  | 'd12f7'
  | 'd12f8'
  | 'd12f9'
  | 'd12f10'
  | 'd12f11'
  | 'd12f12'
  | 'd20f1'
  | 'd20f2'
  | 'd20f3'
  | 'd20f4'
  | 'd20f5'
  | 'd20f6'
  | 'd20f7'
  | 'd20f8'
  | 'd20f9'
  | 'd20f10'
  | 'd20f11'
  | 'd20f12'
  | 'd20f13'
  | 'd20f14'
  | 'd20f15'
  | 'd20f16'
  | 'd20f17'
  | 'd20f18'
  | 'd20f19'
  | 'd20f20'

export type FaceStateType = {
  d2f1: FaceType
  d2f2: FaceType

  d4f1: FaceType
  d4f2: FaceType
  d4f3: FaceType
  d4f4: FaceType

  d4Crystalf1: FaceType
  d4Crystalf2: FaceType
  d4Crystalf3: FaceType
  d4Crystalf4: FaceType

  d4Shardf1: FaceType
  d4Shardf2: FaceType
  d4Shardf3: FaceType
  d4Shardf4: FaceType

  d6f1: FaceType
  d6f2: FaceType
  d6f3: FaceType
  d6f4: FaceType
  d6f5: FaceType
  d6f6: FaceType

  d8f1: FaceType
  d8f2: FaceType
  d8f3: FaceType
  d8f4: FaceType
  d8f5: FaceType
  d8f6: FaceType
  d8f7: FaceType
  d8f8: FaceType

  d10f1: FaceType
  d10f2: FaceType
  d10f3: FaceType
  d10f4: FaceType
  d10f5: FaceType
  d10f6: FaceType
  d10f7: FaceType
  d10f8: FaceType
  d10f9: FaceType
  d10f0: FaceType

  d100f1: FaceType
  d100f2: FaceType
  d100f3: FaceType
  d100f4: FaceType
  d100f5: FaceType
  d100f6: FaceType
  d100f7: FaceType
  d100f8: FaceType
  d100f9: FaceType
  d100f0: FaceType

  d12f1: FaceType
  d12f2: FaceType
  d12f3: FaceType
  d12f4: FaceType
  d12f5: FaceType
  d12f6: FaceType
  d12f7: FaceType
  d12f8: FaceType
  d12f9: FaceType
  d12f10: FaceType
  d12f11: FaceType
  d12f12: FaceType

  d20f1: FaceType
  d20f2: FaceType
  d20f3: FaceType
  d20f4: FaceType
  d20f5: FaceType
  d20f6: FaceType
  d20f7: FaceType
  d20f8: FaceType
  d20f9: FaceType
  d20f10: FaceType
  d20f11: FaceType
  d20f12: FaceType
  d20f13: FaceType
  d20f14: FaceType
  d20f15: FaceType
  d20f16: FaceType
  d20f17: FaceType
  d20f18: FaceType
  d20f19: FaceType
  d20f20: FaceType
}

export const DEFAULT_FACE_STATE: FaceStateType = {
  d2f1: { ...DEFAULT_FACE, text: '1' },
  d2f2: { ...DEFAULT_FACE, text: '2' },

  d4f1: { ...DEFAULT_FACE, text: '1' },
  d4f2: { ...DEFAULT_FACE, text: '2' },
  d4f3: { ...DEFAULT_FACE, text: '3' },
  d4f4: { ...DEFAULT_FACE, text: '4' },

  d4Crystalf1: { ...DEFAULT_FACE, text: '1' },
  d4Crystalf2: { ...DEFAULT_FACE, text: '2' },
  d4Crystalf3: { ...DEFAULT_FACE, text: '3' },
  d4Crystalf4: { ...DEFAULT_FACE, text: '4' },

  d4Shardf1: { ...DEFAULT_FACE, text: '1' },
  d4Shardf2: { ...DEFAULT_FACE, text: '2' },
  d4Shardf3: { ...DEFAULT_FACE, text: '3' },
  d4Shardf4: { ...DEFAULT_FACE, text: '4' },

  d6f1: { ...DEFAULT_FACE, text: '1' },
  d6f2: { ...DEFAULT_FACE, text: '2' },
  d6f3: { ...DEFAULT_FACE, text: '3' },
  d6f4: { ...DEFAULT_FACE, text: '4' },
  d6f5: { ...DEFAULT_FACE, text: '5' },
  d6f6: { ...DEFAULT_FACE, text: '6' },

  d8f1: { ...DEFAULT_FACE, text: '1' },
  d8f2: { ...DEFAULT_FACE, text: '2' },
  d8f3: { ...DEFAULT_FACE, text: '3' },
  d8f4: { ...DEFAULT_FACE, text: '4' },
  d8f5: { ...DEFAULT_FACE, text: '5' },
  d8f6: { ...DEFAULT_FACE, text: '6' },
  d8f7: { ...DEFAULT_FACE, text: '7' },
  d8f8: { ...DEFAULT_FACE, text: '8' },

  d10f1: { ...DEFAULT_FACE, text: '1' },
  d10f2: { ...DEFAULT_FACE, text: '2' },
  d10f3: { ...DEFAULT_FACE, text: '3' },
  d10f4: { ...DEFAULT_FACE, text: '4' },
  d10f5: { ...DEFAULT_FACE, text: '5' },
  d10f6: { ...DEFAULT_FACE, text: '6' },
  d10f7: { ...DEFAULT_FACE, text: '7' },
  d10f8: { ...DEFAULT_FACE, text: '8' },
  d10f9: { ...DEFAULT_FACE, text: '9' },
  d10f0: { ...DEFAULT_FACE, text: '0' },

  d100f1: { ...DEFAULT_FACE, text: '10' },
  d100f2: { ...DEFAULT_FACE, text: '20' },
  d100f3: { ...DEFAULT_FACE, text: '30' },
  d100f4: { ...DEFAULT_FACE, text: '40' },
  d100f5: { ...DEFAULT_FACE, text: '50' },
  d100f6: { ...DEFAULT_FACE, text: '60' },
  d100f7: { ...DEFAULT_FACE, text: '70' },
  d100f8: { ...DEFAULT_FACE, text: '80' },
  d100f9: { ...DEFAULT_FACE, text: '90' },
  d100f0: { ...DEFAULT_FACE, text: '00' },

  d12f1: { ...DEFAULT_FACE, text: '1' },
  d12f2: { ...DEFAULT_FACE, text: '2' },
  d12f3: { ...DEFAULT_FACE, text: '3' },
  d12f4: { ...DEFAULT_FACE, text: '4' },
  d12f5: { ...DEFAULT_FACE, text: '5' },
  d12f6: { ...DEFAULT_FACE, text: '6' },
  d12f7: { ...DEFAULT_FACE, text: '7' },
  d12f8: { ...DEFAULT_FACE, text: '8' },
  d12f9: { ...DEFAULT_FACE, text: '9' },
  d12f10: { ...DEFAULT_FACE, text: '10' },
  d12f11: { ...DEFAULT_FACE, text: '11' },
  d12f12: { ...DEFAULT_FACE, text: '12' },

  d20f1: { ...DEFAULT_FACE, text: '1' },
  d20f2: { ...DEFAULT_FACE, text: '2' },
  d20f3: { ...DEFAULT_FACE, text: '3' },
  d20f4: { ...DEFAULT_FACE, text: '4' },
  d20f5: { ...DEFAULT_FACE, text: '5' },
  d20f6: { ...DEFAULT_FACE, text: '6' },
  d20f7: { ...DEFAULT_FACE, text: '7' },
  d20f8: { ...DEFAULT_FACE, text: '8' },
  d20f9: { ...DEFAULT_FACE, text: '9' },
  d20f10: { ...DEFAULT_FACE, text: '10' },
  d20f11: { ...DEFAULT_FACE, text: '11' },
  d20f12: { ...DEFAULT_FACE, text: '12' },
  d20f13: { ...DEFAULT_FACE, text: '13' },
  d20f14: { ...DEFAULT_FACE, text: '14' },
  d20f15: { ...DEFAULT_FACE, text: '15' },
  d20f16: { ...DEFAULT_FACE, text: '16' },
  d20f17: { ...DEFAULT_FACE, text: '17' },
  d20f18: { ...DEFAULT_FACE, text: '18' },
  d20f19: { ...DEFAULT_FACE, text: '19' },
  d20f20: { ...DEFAULT_FACE, text: '20' },
}

export const FACE_OPTION_LIST = [
  'd2f1',
  'd2f2',

  'd4f1',
  'd4f2',
  'd4f3',
  'd4f4',

  'd4Crystalf1',
  'd4Crystalf2',
  'd4Crystalf3',
  'd4Crystalf4',

  'd4Shardf1',
  'd4Shardf2',
  'd4Shardf3',
  'd4Shardf4',

  'd6f1',
  'd6f2',
  'd6f3',
  'd6f4',
  'd6f5',
  'd6f6',

  'd8f1',
  'd8f2',
  'd8f3',
  'd8f4',
  'd8f5',
  'd8f6',
  'd8f7',
  'd8f8',

  'd10f1',
  'd10f2',
  'd10f3',
  'd10f4',
  'd10f5',
  'd10f6',
  'd10f7',
  'd10f8',
  'd10f9',
  'd10f0',

  'd100f1',
  'd100f2',
  'd100f3',
  'd100f4',
  'd100f5',
  'd100f6',
  'd100f7',
  'd100f8',
  'd100f9',
  'd100f0',

  'd12f1',
  'd12f2',
  'd12f3',
  'd12f4',
  'd12f5',
  'd12f6',
  'd12f7',
  'd12f8',
  'd12f9',
  'd12f10',
  'd12f11',
  'd12f12',

  'd20f1',
  'd20f2',
  'd20f3',
  'd20f4',
  'd20f5',
  'd20f6',
  'd20f7',
  'd20f8',
  'd20f9',
  'd20f10',
  'd20f11',
  'd20f12',
  'd20f13',
  'd20f14',
  'd20f15',
  'd20f16',
  'd20f17',
  'd20f18',
  'd20f19',
  'd20f20',
]

export const isFaceOption = (keyInput: string): keyInput is FaceOptions => {
  return FACE_OPTION_LIST.includes(keyInput)
}
