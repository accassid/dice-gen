import React from 'react'
import { Font, Geometry } from 'three'
import { FaceType } from '../../models/face'
import { useGlobalState } from '../../modules/global'
import { useUpdate } from 'react-three-fiber'

type Props = {
  font: Font | null
  face: FaceType
  dieFontScale: number
  dieScale: number
}

const TextGeometry: React.FC<Props> = ({ font, face, dieFontScale, dieScale }: Props) => {
  const [globalSize] = useGlobalState('globalSize')
  const [globalFontScale] = useGlobalState('globalFontScale')
  const [globalDepth] = useGlobalState('globalDepth')

  const geometryRef = useUpdate(
    (self: Geometry) => {
      self.center()
    },
    [globalFontScale, globalSize, globalDepth, dieFontScale, dieScale],
  )
  if (!font) return <geometry attach="geometry" />
  const config = {
    font,
    hAlign: 'center',
    size: globalSize * globalFontScale * dieFontScale * dieScale,
    height: globalDepth + 0.02,
    curveSegments: 6,
    bevelEnabled: false,
    bevelThickness: 0.01,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 8,
  }

  return <textGeometry ref={geometryRef} attach="geometry" args={[face.text, config]} />
}

export default TextGeometry
