import React, { useRef, useState } from 'react'

type Props = {
  size: number
}

const Box: React.FC<Props> = ({ size }: Props) => {
  // This reference will give us direct access to the mesh
  const box = useRef<THREE.Mesh>()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => {
  //   if(box.current) box.current.rotation.x = box.current.rotation.y += 0.01
  // })

  return (
    <group>
      <mesh
        position={[0,size/2,0]}
        ref={box}
        onPointerOver={(): void => setHover(true)}
        onPointerOut={(): void => setHover(false)}>
        <boxBufferGeometry attach="geometry" args={[size, size, size]} />
        <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : '#acacac'} />
      </mesh>
    </group>
  )
}

export default Box
