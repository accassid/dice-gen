import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'

// Components
import Grid from '../Grid/Grid'
import Controls from '../Controls/Controls'
import Die from '../Die/Die'

// Style
import { CanvasContainer } from './style'
import SVGTest from '../SVGTest/SVGTest'

type Props = {}

const MainCanvas: React.FC<Props> = () => {
  return (
    <CanvasContainer>
      <Canvas camera={{ position: [20, 30, 50] }}>
        <ambientLight />
        <pointLight position={[30, 20, 60]} />
        {/*<Die size={20} />*/}
        <Suspense fallback={null}>
          <SVGTest />
        </Suspense>
        <axesHelper />
        <Grid />
        <Controls />
      </Canvas>
    </CanvasContainer>
  )
}

export default MainCanvas
