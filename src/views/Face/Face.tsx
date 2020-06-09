import React, { useRef, useEffect } from 'react'
import { useGlobalState } from '../../modules/global'
import { isFaceOption } from '../../models/face'
import { Mesh } from 'three'

type Props = {
  dieNum: number
  faceNum: number
}

const Face: React.FC<Props> = ({ dieNum, faceNum }: Props) => {
  const key = `d${dieNum}f${faceNum}`
  if (!isFaceOption(key)) return null

  const [face, setFace] = useGlobalState(key)

  const meshRef = useRef<Mesh>()

  // TODO add check if dieNum === faceNum for max svg, 1 for min svg, and number for numbered svg (global)

  if (face.svg) return null

  const [font] = useGlobalState('globalFont')

  if (!font) return null

  const config = {
    font,
    hAlign: 'center',
    size: 10,
    height: 1,
    curveSegments: 32,
    bevelEnabled: false,
    bevelThickness: 0.01,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 8,
  }

  useEffect(() => {
    if (meshRef.current) {
      setFace({ ...face, ref: meshRef.current })
    }
  }, [meshRef])

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <textGeometry attach="geometry" args={[face.text, config]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

export default Face
