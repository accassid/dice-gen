import React from 'react'


type Props = {
  size: number
}

const Internal: React.FC<Props> = ({ size }: Props) => {
  return (
    <mesh position={[0, 0, 0]} scale={[0.999, 0.999, 0.999]}>
      <boxBufferGeometry attach="geometry" args={[size, size, size]} />
      <meshStandardMaterial transparent attach="material" opacity={0.95} color={'#515151'} />
    </mesh>
  )
}

export default Internal
