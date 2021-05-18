import { Font, Geometry, TextGeometryParameters } from 'three'
import { CombinedTextGeometry } from '../../../models/combinedTextGeometry'
import { ORIENTATION_INDICATOR, OrientationIndicatorType } from '../../../models/orientationIndicator'
import { addBarIndicator, addPeriodIndicator } from '../../../utils/addOrientationIndicator'
import { FaceType } from '../../../models/face'

export const textGeometryGenerator = (
  font: Font,
  globalScale: number,
  globalFontScale: number,
  globalDepth: number,
  face: FaceType,
  dieFontScale: number,
  dieSize: number,
  die: string,
  orientationIndicator: OrientationIndicatorType,
  orientationIndicatorOnD8D6: number,
  orientationIndicatorSize: number,
  orientationIndicatorSpace: number,
  d2Radius: number,
): Geometry => {
  let config: null | TextGeometryParameters = null
  let geometry: Geometry = new Geometry()
  if (font) {
    config = {
      font,
      size: globalScale * globalFontScale * dieFontScale * (die === 'd2' ? d2Radius * 2 : dieSize),
      height: globalDepth + 0.02,
      curveSegments: 6,
      bevelEnabled: false,
      bevelThickness: 0.01,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 8,
    }
    geometry = new CombinedTextGeometry(face.text, config)
    geometry.center()
    if (
      orientationIndicator !== ORIENTATION_INDICATOR.NONE &&
      (face.text === '6' || face.text === '9') &&
      (orientationIndicatorOnD8D6 || (die !== 'd6' && die !== 'd8'))
    ) {
      if (orientationIndicator === ORIENTATION_INDICATOR.PERIOD)
        addPeriodIndicator(
          globalScale,
          globalFontScale,
          globalDepth,
          dieFontScale,
          dieSize,
          geometry,
          config,
          orientationIndicatorSize,
          orientationIndicatorSpace,
        )
      if (orientationIndicator === ORIENTATION_INDICATOR.BAR)
        addBarIndicator(
          globalScale,
          globalFontScale,
          globalDepth,
          dieFontScale,
          dieSize,
          geometry,
          orientationIndicatorSize,
          orientationIndicatorSpace,
        )
    }
  }

  if (!geometry) throw new Error('There must be at least one number for the D4 face generator.')

  return geometry
}
