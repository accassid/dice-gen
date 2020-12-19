export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd100' | 'd12' | 'd20'

export const DICE_LIST = ['d4', 'd6', 'd8', 'd10', 'd100', 'd12', 'd20']

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
  d4: 0.75,
  d6: 1,
  d8: 0.866,
  d10: 1.30187,
  d100: 1.30187,
  d12: 0.62915,
  d20: 0.62912,
}

export type DiceOptions = {
  d4Size: number
  d4FontScale: number
  d4RadiusScale: number

  d6Size: number
  d6FontScale: number

  d8Size: number
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
  d4Size: 20 * DIE_SIZE_SCALARS['d4'],
  d4FontScale: 1,
  d4RadiusScale: 1,

  d6Size: 15 * DIE_SIZE_SCALARS['d6'],
  d6FontScale: 1,

  d8Size: 15 * DIE_SIZE_SCALARS['d8'],
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
  d4: [1, 2, 3, 4],
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
]
