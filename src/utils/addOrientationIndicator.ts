import { BoxGeometry, Geometry, TextGeometryParameters } from 'three'
import { CombinedTextGeometry } from '../models/combinedTextGeometry'

/**
 * This function takes in all relevant size parameters of the current die as well as geometry to add onto. It then
 * creates a period with the given text geometry parameters it positions the period to the bottom right of the given
 * geometry and then merges the period into the given geometry.
 *
 * @param globalSize
 * @param globalFontScale
 * @param globalDepth
 * @param dieFontScale
 * @param dieScale
 * @param geometry
 * @param config
 * @param orientationIndicatorSize
 * @param orientationIndicatorSpace
 */
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
  const periodGeometry = new CombinedTextGeometry('.', newConfig)
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
  if (geometry instanceof CombinedTextGeometry) geometry.orientationIndicator = periodGeometry
}

/**
 * This function takes in all relevant size parameters of the current die as well as geometry to add onto. It then
 * generates a bar with a BoxGeometry and positions it centered and below the given geometry. It them merges the
 * Boxgeometry into the given geometry.
 *
 * @param globalSize
 * @param globalFontScale
 * @param globalDepth
 * @param dieFontScale
 * @param dieScale
 * @param geometry
 * @param orientationIndicatorSize
 * @param orientationIndicatorSpace
 */
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
  if (geometry instanceof CombinedTextGeometry) geometry.orientationIndicator = barGeometry
}
