import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'

// Components
import Box from '../Box/Box'
import Grid from '../Grid/Grid'
import Controls from '../Controls/Controls'

// Style
import { CanvasContainer } from './style'
import FontTest from '../FontTest/FontTest'
import Declarative from "../Declarative/Declarative";

type Props = {}

const MainCanvas: React.FC<Props> = () => {
  return (
    <CanvasContainer>
      <Canvas camera={{ position: [20, 30, 50] }}>
        <ambientLight />
        <pointLight position={[30, 20, 60]} />
        {/*<Box size={20} />*/}
        {/*<Suspense fallback={null}>*/}
        {/*  /!*<FontTest />*!/*/}
        {/*  <Declarative/>*/}
        {/*</Suspense>*/}
        <Declarative/>
        <axesHelper />
        <Grid />
        <Controls />
      </Canvas>
    </CanvasContainer>
  )
}

export default MainCanvas
