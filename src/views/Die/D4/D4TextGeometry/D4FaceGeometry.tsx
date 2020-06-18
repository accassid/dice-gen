import React, { useEffect, useState } from 'react'
import { Font, TextGeometry, TextGeometryParameters, Geometry } from 'three'
import { useGlobalState } from '../../../../modules/global'
import { createSVGGeometry } from '../../../../utils/createSVGGeometry'

type Props = {
  font: Font | null
  faceNum: number
}

const FACE_MAP: Record<string, [string, string, string]> = {
  '1': ['3', '4', '2'],
  '2': ['1', '2', '4'],
  '3': ['2', '1', '3'],
  '4': ['4', '3', '1'],
}

const D4FaceGeometry: React.FC<Props> = ({ font, faceNum }: Props) => {
  const [geometry, setGeometry] = useState<Geometry>(new Geometry())
  const [globalSize] = useGlobalState('globalSize')
  const [globalFontScale] = useGlobalState('globalFontScale')
  const [globalDepth] = useGlobalState('globalDepth')
  const [globalSVG] = useGlobalState('globalSVG')

  useEffect(() => {
    let config: null | TextGeometryParameters = null

    if (font)
      config = {
        font,
        size: (globalSize / 4) * globalFontScale,
        height: globalDepth + 0.02,
        curveSegments: 6,
        bevelEnabled: false,
        bevelThickness: 0.01,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 8,
      }

    const numbers = FACE_MAP[`${faceNum}`]
    const radius = globalSize / 3
    let rotation = 0
    let geometry: Geometry = new Geometry()
    for (let i = 0; i < numbers.length; i++) {
      const text = numbers[i]
      let currentGeometry = new Geometry()
      if (text === '4' && globalSVG.max) currentGeometry = createSVGGeometry(globalSVG.max, globalDepth, globalSize, 4)
      else if (config) currentGeometry = new TextGeometry(text, config)
      currentGeometry.center()
      currentGeometry.translate(0, radius, 0)
      currentGeometry.rotateZ(rotation)
      if (!geometry) geometry = currentGeometry
      else geometry.merge(currentGeometry)
      rotation += (Math.PI * 2) / 3
    }
    if (!geometry) throw new Error('There must be at least one number for the D4 face generator.')

    setGeometry(geometry)
  }, [font, globalSize, globalFontScale, globalDepth, faceNum, globalSVG])

  return <primitive object={geometry} attach="geometry" />
}

export default D4FaceGeometry