import React, { useRef, useState } from 'react'

type Props = {
  size: number
}

const Box: React.FC<Props> = ({ size }: Props) => {
  return (
    <group>
      <mesh position={[0, 0, 0]} scale={[0.999, 0.999, 0.999]}>
        <boxBufferGeometry attach="geometry" args={[size, size, size]} />
        <meshStandardMaterial transparent attach="material" opacity={0.5} color={'#515151'} />
      </mesh>
    </group>
  )
}

export default Box
