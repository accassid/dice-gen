import React from 'react'
import { Font } from 'three'
import { FaceType } from '../../models/face'

type Props = {
  font: Font | null
  face: FaceType
}

const TextGeometry: React.FC<Props> = ({ font, face }: Props) => {
  if (!font) return <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
  const config = {
    font,
    hAlign: 'center',
    size: 10,
    height: 1.02,
    curveSegments: 6,
    bevelEnabled: false,
    bevelThickness: 0.01,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 8,
  }
  return <textGeometry attach="geometry" args={[face.text, config]} />
}

export default TextGeometry
