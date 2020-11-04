import React, { useEffect, useState } from 'react'
import { Font, Geometry, TextGeometryParameters, TextGeometry, BoxGeometry } from 'three'
import { FaceType } from '../../models/face'
import { useGlobalState } from '../../modules/global'

type Props = {
  font: Font | null
  face: FaceType
  dieFontScale: number
  dieScale: number
}

const TextGeometry2: React.FC<Props> = ({ font, face, dieFontScale, dieScale }: Props) => {
  const [globalSize] = useGlobalState('globalSize')
  const [globalFontScale] = useGlobalState('globalFontScale')
  const [globalDepth] = useGlobalState('globalDepth')
  const [geometry, setGeometry] = useState<Geometry>(new Geometry())

  useEffect(() => {
    let config: null | TextGeometryParameters = null
    let geometry: Geometry = new Geometry()
    if (font) {
      config = {
        font,
        size: globalSize * globalFontScale * dieFontScale * dieScale,
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
      // if (face.text === '6' || face.text === '9'){
      //   const buffer = globalSize * globalFontScale * dieFontScale * dieScale * .05
      //   geometry.computeBoundingBox()
      //   const numberBoxMin = geometry.boundingBox.min
      //   const numberBoxMax = geometry.boundingBox.max
      //   const periodGeometry = new TextGeometry('.', config)
      //   periodGeometry.center()
      //   periodGeometry.computeBoundingBox()
      //   const periodHeight = periodGeometry.boundingBox.max.y - periodGeometry.boundingBox.min.y
      //   const periodWidth = periodGeometry.boundingBox.max.x - periodGeometry.boundingBox.min.x
      //   periodGeometry.translate(numberBoxMax.x+periodWidth/2+buffer, numberBoxMin.y+periodHeight/2+buffer/2, numberBoxMin.z+globalDepth/2)
      //   geometry.merge(periodGeometry)
      // }
      if (face.text === '6' || face.text === '9') {
        const buffer = globalSize * globalFontScale * dieFontScale * dieScale * 0.1
        geometry.computeBoundingBox()
        const numberBoxMin = geometry.boundingBox.min
        const numberBoxMax = geometry.boundingBox.max
        const numberBoxWidth = numberBoxMax.x - numberBoxMin.x
        const barGeometry = new BoxGeometry(numberBoxWidth, buffer, globalDepth + 0.02)
        barGeometry.center()
        barGeometry.computeBoundingBox()
        const barHeight = barGeometry.boundingBox.max.y - barGeometry.boundingBox.min.y
        barGeometry.translate(0, numberBoxMin.y - barHeight / 2 - buffer, numberBoxMin.z + globalDepth / 2)
        geometry.merge(barGeometry)
        geometry.center()
      }
    }

    if (!geometry) throw new Error('There must be at least one number for the D4 face generator.')

    setGeometry(geometry)
  }, [font, globalSize, globalFontScale, globalDepth, face, dieFontScale, dieScale])

  return <primitive object={geometry} attach="geometry" />
}

export default TextGeometry2
