import React, { useEffect, useState } from 'react'
import { useGlobalState } from '../../modules/global'

// Libraries
import { Font, Geometry, TextGeometryParameters, TextGeometry } from 'three'

// Models
import { FaceType } from '../../models/face'
import { ORIENTATION_INDICATOR } from '../../models/orientationIndicator'

// Utils
import { addBarIndicator, addPeriodIndicator } from '../../utils/addOrientationIndicator'

type Props = {
  font: Font | null
  face: FaceType
  dieFontScale: number
  dieSize: number
}

/**
 * This component renders our custom TextGeometry. While three.js does provide a TextGeometry object and thus
 * react-three-fiber a react element, we still generate our own geometry to pass to a <primitive> element so that we
 * can add our orientation indicators to 6s and 9s. Thus why the function itself is named TextGeometry2.
 * @param font
 * @param face
 * @param dieFontScale
 * @param dieSize
 * @constructor
 */
const TextGeometry2: React.FC<Props> = ({ font, face, dieFontScale, dieSize }: Props) => {
  const [globalScale] = useGlobalState('globalScale')
  const [globalFontScale] = useGlobalState('globalFontScale')
  const [globalDepth] = useGlobalState('globalDepth')
  const [orientationIndicator] = useGlobalState('orientationIndicator')
  const [orientationIndicatorSize] = useGlobalState('orientationIndicatorSize')
  const [orientationIndicatorSpace] = useGlobalState('orientationIndicatorSpace')
  const [orientationIndicatorOnD8D6] = useGlobalState('orientationIndicatorOnD6D8')
  const [die] = useGlobalState('die')
  const [geometry, setGeometry] = useState<Geometry>(new Geometry())

  /**
   * This effect is called whenever a property changes that effects a text geometry on a die, including sizes, fonts,
   * and orientation indicator properties. The number itself it created with the default three.js TextGeometry object.
   * From there orientation indicators are applied if applicable and based on the specified type. Check those functions
   * for more information. That merged geometry is then set in the local state which the <primitive> element renders.
   */
  useEffect(() => {
    let config: null | TextGeometryParameters = null
    let geometry: Geometry = new Geometry()
    if (font) {
      config = {
        font,
        size: globalScale * globalFontScale * dieFontScale * dieSize,
        height: globalDepth + 0.02,
        curveSegments: 6,
        bevelEnabled: false,
        bevelThickness: 0.01,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 8,
      }
      geometry = new TextGeometry(face.text, config)
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

    setGeometry(geometry)
  }, [
    font,
    globalScale,
    globalFontScale,
    globalDepth,
    face,
    dieFontScale,
    dieSize,
    die,
    orientationIndicator,
    orientationIndicatorOnD8D6,
    orientationIndicatorSize,
    orientationIndicatorSpace,
  ])

  return <primitive object={geometry} attach="geometry" />
}

export default TextGeometry2
