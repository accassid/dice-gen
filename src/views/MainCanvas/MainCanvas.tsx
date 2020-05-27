import React from 'react'
import { Canvas } from 'react-three-fiber'

// Components
import Box from '../Box/Box'
import Grid from '../Grid/Grid'
import Controls from '../Controls/Controls'

// Style
import { CanvasContainer } from './style'

type Props = {}

const MainCanvas: React.FC<Props> = () => {
  return (
    <CanvasContainer>
      <Canvas camera={{ position: [4, 3, 10] }}>
        <ambientLight />
        <pointLight position={[8, 5, 15]} />
        <Box position={[0, 1, 0]} />
        <axesHelper />
        <Grid />
        <Controls />
      </Canvas>
    </CanvasContainer>
  )
}

export default MainCanvas
