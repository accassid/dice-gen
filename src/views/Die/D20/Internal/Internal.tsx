import React from 'react'
import { useGlobalState } from '../../../../modules/global'

type Props = {}

const Internal: React.FC<Props> = () => {
  const [diePreview] = useGlobalState('diePreview')
  const [globalSize] = useGlobalState('globalSize')
  return (
    <mesh position={[0, 0, 0]} scale={[0.999, 0.999, 0.999]}>
      <icosahedronBufferGeometry attach="geometry" args={[globalSize]} />
      <meshStandardMaterial transparent attach="material" opacity={diePreview ? 0.6 : 0.95} color={'#515151'} />
    </mesh>
  )
}

export default Internal
