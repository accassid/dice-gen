import React from 'react'
import {useGlobalState} from "../../../../modules/global";

type Props = {
  size: number
}

const Internal: React.FC<Props> = ({ size }: Props) => {
  const [diePreview] = useGlobalState('diePreview')
  const [globalSize] = useGlobalState('globalSize')
  return (
    <mesh position={[0, 0, 0]} scale={[0.999, 0.999, 0.999]}>
      <coneBufferGeometry attach="geometry" args={[globalSize/Math.sqrt(2), globalSize, 3]} />
      <meshStandardMaterial transparent attach="material" opacity={diePreview ? 0.6 : 0.95} color={'#515151'} />
    </mesh>
  )
}

export default Internal
