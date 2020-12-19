/**
 * Spindown dice have descending numbers next to each other meaning different faces have different numbers. For each
 * number for the dice below, there is a mapping of what the number is on the spindown to the number of the face that it
 * should be on with our normal dice.
 */

export const D20_SPINDOWN_MAP = {
  '1': 1,
  '2': 19,
  '3': 3,
  '4': 17,
  '5': 7,
  '6': 15,
  '7': 5,
  '8': 13,
  '9': 11,
  '10': 9,
  '11': 6,
  '12': 16,
  '13': 8,
  '14': 10,
  '15': 12,
  '16': 2,
  '17': 18,
  '18': 4,
  '19': 14,
  '20': 20,
}

export const D10_SPINDOWN_MAP = {
  '1': 1,
  '2': 9,
  '3': 5,
  '4': 3,
  '5': 7,
  '6': 4,
  '7': 0,
  '8': 8,
  '9': 2,
  '0': 6,
}
