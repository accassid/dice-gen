import React from 'react'
import { Canvas } from 'react-three-fiber'

// Components
import Box from "../Box/Box";

type Props = {}

const MainCanvas: React.FC<Props> = (props: Props) => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}

export default MainCanvas
