import React from 'react'
import {useGlobalState} from "../../../../modules/global";

type Props = {
  size: number
}

const Internal: React.FC<Props> = ({ size }: Props) => {
  const [diePreview] = useGlobalState('diePreview')
  return (
    <mesh position={[0, 0, 0]} scale={[0.999, 0.999, 0.999]}>
      <boxBufferGeometry attach="geometry" args={[size, size, size]} />
      <meshStandardMaterial transparent attach="material" opacity={diePreview ? 0.6 : 0.95} color={'#515151'} />
    </mesh>
  )
}

export default Internal
