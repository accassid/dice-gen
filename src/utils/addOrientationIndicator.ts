import { BoxGeometry, Geometry, TextGeometry, TextGeometryParameters } from 'three'

export const addPeriodIndicator = (
  globalSize: number,
  globalFontScale: number,
  globalDepth: number,
  dieFontScale: number,
  dieScale: number,
  geometry: Geometry,
  config: TextGeometryParameters,
  orientationIndicatorSize: number,
  orientationIndicatorSpace: number,
): void => {
  const buffer = globalSize * globalFontScale * dieFontScale * dieScale * 0.05
  geometry.computeBoundingBox()
  const numberBoxMin = geometry.boundingBox.min
  const numberBoxMax = geometry.boundingBox.max
  const newConfig = {
    ...config,
    size: config.size * orientationIndicatorSize,
  }
  const periodGeometry = new TextGeometry('.', newConfig)
  periodGeometry.center()
  periodGeometry.computeBoundingBox()
  const periodHeight = periodGeometry.boundingBox.max.y - periodGeometry.boundingBox.min.y
  const periodWidth = periodGeometry.boundingBox.max.x - periodGeometry.boundingBox.min.x
  periodGeometry.translate(
    numberBoxMax.x + periodWidth / 2 + buffer * orientationIndicatorSpace,
    numberBoxMin.y + periodHeight / 2 + buffer / 2,
    numberBoxMin.z + globalDepth / 2,
  )
  geometry.merge(periodGeometry)
}

export const addBarIndicator = (
  globalSize: number,
  globalFontScale: number,
  globalDepth: number,
  dieFontScale: number,
  dieScale: number,
  geometry: Geometry,
  orientationIndicatorSize: number,
  orientationIndicatorSpace: number,
): void => {
  const buffer = globalSize * globalFontScale * dieFontScale * dieScale * orientationIndicatorSpace * 0.1
  const height = globalSize * globalFontScale * dieFontScale * dieScale * orientationIndicatorSize * 0.1
  geometry.computeBoundingBox()
  const numberBoxMin = geometry.boundingBox.min
  const numberBoxMax = geometry.boundingBox.max
  const numberBoxWidth = numberBoxMax.x - numberBoxMin.x
  const barGeometry = new BoxGeometry(numberBoxWidth, height, globalDepth + 0.02)
  barGeometry.center()
  barGeometry.computeBoundingBox()
  const barHeight = barGeometry.boundingBox.max.y - barGeometry.boundingBox.min.y
  barGeometry.translate(0, numberBoxMin.y - barHeight / 2 - buffer, numberBoxMin.z + globalDepth / 2)
  geometry.merge(barGeometry)
  geometry.center()
}
