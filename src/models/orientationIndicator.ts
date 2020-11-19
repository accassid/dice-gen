export const ORIENTATION_INDICATOR: Record<string, OrientationIndicatorType> = {
  PERIOD: 'period',
  BAR: 'bar',
  NONE: 'none',
}

export const ORIENTATION_INDICATOR_OPTIONS: Array<OrientationIndicatorType> = ['period', 'bar', 'none']

export type OrientationIndicatorType = 'period' | 'bar' | 'none'
