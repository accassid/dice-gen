export type DiceType = 'd2' | 'd4' | 'd4Crystal' | 'd4Shard' | 'd6' | 'd8' | 'd10' | 'd100' | 'd12' | 'd20'

export const DICE_LIST = ['d2', 'd4', 'd4Crystal', 'd4Shard', 'd6', 'd8', 'd10', 'd100', 'd12', 'd20']

export const isDiceType = (keyInput: string): keyInput is DiceType => {
  return DICE_LIST.includes(keyInput)
}

/**
 * The three.js shape objects are not measured from face to face as most people would measure dice. These are ratios
 * manually calculated from three.js's size property for the die's shape to it's corresponding face to face size. For
 * example, if we want a d8 that is 15mm from face to face, we need to pass 15 * 0.866 into three.js's octahedron's
 * height parameter. Therefore those values are set be default. The scalars are used in reverse when rendering the size
 * value to the user so they see the face to face size, not the three.js size.
 */
export const DIE_SIZE_SCALARS = {
  d2: 1,
  d4: 0.75,
  d4Crystal: 1,
  d4Shard: 0.866,
  d6: 1,
  d8: 0.866,
  d10: 1.30187,
  d100: 1.30187,
  d12: 0.62915,
  d20: 0.62912,
}

export type DiceOptions = {
  d2Size: number
  d2FontScale: number
  d2Radius: number
  d2Sides: number

  d4Size: number
  d4FontScale: number
  d4RadiusScale: number
  d4FontBottom: number

  d4CrystalSize: number
  d4CrystalFontScale: number
  d4CrystalHeight: number
  d4CrystalPointHeight: number

  d4ShardSize: number
  d4ShardTopPointHeight: number
  d4ShardBottomPointHeight: number
  d4ShardFontScale: number

  d6Size: number
  d6FontScale: number

  d8Size: number
  d8Height: number
  d8FontScale: number

  d10Size: number
  d10Height: number
  d10FontScale: number
  d10Spindown: number

  d100Size: number
  d100FontScale: number
  d100FontVertical: number

  d12Size: number
  d12FontScale: number

  d20Size: number
  d20FontScale: number
  d20Spindown: number
}

export const DEFAULT_DICE_OPTIONS = {
  d2Size: 2 * DIE_SIZE_SCALARS['d2'],
  d2FontScale: 1,
  d2Radius: 12,
  d2Sides: 32,

  d4Size: 20 * DIE_SIZE_SCALARS['d4'],
  d4FontScale: 1,
  d4RadiusScale: 1,
  d4FontBottom: 0,

  d4CrystalSize: 12 * DIE_SIZE_SCALARS['d4Crystal'],
  d4CrystalFontScale: 1,
  d4CrystalHeight: 14,
  d4CrystalPointHeight: 7,

  d4ShardSize: 12 * DIE_SIZE_SCALARS['d4Shard'],
  d4ShardTopPointHeight: 0.75,
  d4ShardBottomPointHeight: 1.75,
  d4ShardFontScale: 1,

  d6Size: 15 * DIE_SIZE_SCALARS['d6'],
  d6FontScale: 1,

  d8Size: 15 * DIE_SIZE_SCALARS['d8'],
  d8Height: 1,
  d8FontScale: 1,

  d10Size: 16 * DIE_SIZE_SCALARS['d10'],
  d10FontScale: 0.55,
  d10Height: 0.6,
  d10Spindown: 0,

  d100Size: 16 * DIE_SIZE_SCALARS['d100'],
  d100FontScale: 0.4,
  d100FontVertical: 0,

  d12Size: 18 * DIE_SIZE_SCALARS['d12'],
  d12FontScale: 1,

  d20Size: 20 * DIE_SIZE_SCALARS['d20'],
  d20FontScale: 0.5,
  d20Spindown: 0,
}

export const isDiceOption = (key: string): key is keyof DiceOptions => {
  return Object.keys(DEFAULT_DICE_OPTIONS).includes(key)
}

export const DICE_FACE_LISTS = {
  d2: [1, 2],
  d4: [1, 2, 3, 4],
  d4Crystal: [1, 2, 3, 4],
  d4Shard: [1, 2, 3, 4],
  d6: [1, 2, 3, 4, 5, 6],
  d8: [1, 2, 3, 4, 5, 6, 7, 8],
  d10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  d100: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  d12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  d20: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
}

export const SVG_FACE_OPTIONS = [
  'max',
  'min',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '30',
  '40',
  '50',
  '60',
  '70',
  '80',
  '90',
  '00',
  'd2',
  'd4',
  'd4Crystal',
  'd4Shard',
  'd6',
  'd8',
  'd10',
  'd100',
  'd12',
  'd20',
  'd4 face 1',
  'd4 face 2',
  'd4 face 3',
  'd4 face 4',
]

export const DIE_NAME = {
  d2: 'D2',
  d4: 'D4',
  d4Crystal: 'D4 Crystal',
  d4Shard: 'D4 Shard',
  d6: 'D6',
  d8: 'D8',
  d10: 'D10',
  d100: 'D100',
  d12: 'D12',
  d20: 'D20',
}
