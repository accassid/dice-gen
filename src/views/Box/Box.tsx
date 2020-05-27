import React, { useRef, useState } from 'react'

type Props = {
  position: [number, number, number]
}

const Box: React.FC<Props> = ({ position }: Props) => {
  // This reference will give us direct access to the mesh
  const box = useRef<THREE.Mesh>()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => {
  //   if(box.current) box.current.rotation.x = box.current.rotation.y += 0.01
  // })

  return (
    <group>
      <mesh
        position={position}
        ref={box}
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={(): void => setActive(!active)}
        onPointerOver={(): void => setHover(true)}
        onPointerOut={(): void => setHover(false)}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : '#acacac'} />
      </mesh>
    </group>
  )
}

export default Box
