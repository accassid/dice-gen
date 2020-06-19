import React from 'react'
import { Font, Geometry } from 'three'
import { FaceType } from '../../models/face'
import { useGlobalState } from '../../modules/global'
import { useUpdate } from 'react-three-fiber'

type Props = {
  font: Font | null
  face: FaceType
}

const TextGeometry: React.FC<Props> = ({ font, face }: Props) => {
  const [globalSize] = useGlobalState('globalSize')
  const [globalFontScale] = useGlobalState('globalFontScale')
  const [globalDepth] = useGlobalState('globalDepth')
  const [die] = useGlobalState('die')
  const geometryRef = useUpdate(
    (self: Geometry) => {
      self.center()
    },
    [globalFontScale, globalSize, globalDepth],
  )
  if (!font) return <geometry attach="geometry" />
  const config = {
    font,
    hAlign: 'center',
    size: globalSize * globalFontScale * (die === 'd20' ? .5 : 1),
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
