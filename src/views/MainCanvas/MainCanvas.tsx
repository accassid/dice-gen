import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'

// Components
import Grid from '../Grid/Grid'
import { OrbitView } from '../Controls/Controls'
import Die from '../Die/Die'
import Preview from '../Preview/Preview'

// Style
import { CanvasContainer } from './style'

type Props = {}

/**
 * This component is the main three.js canvas and contains all 3d components. It handles all the lighting as well as
 * camera positioning. The main 3d elements that appear are the Die which is the live view of changes and Preview which
 * rendered a processes, shape subtracted, preview when the user requests it.
 * @constructor
 */
const MainCanvas: React.FC<Props> = () => {
  return (
    <CanvasContainer>
      <Canvas camera={{ position: [15, 23, 40] }}>
        <ambientLight />
        <pointLight position={[30, 20, 60]} />
        <pointLight position={[-60, -20, 0]} />
        <Die />
        <Preview />
        <Suspense fallback={null}></Suspense>
        <axesHelper args={[5]} />
        <Grid />
        <OrbitView />
      </Canvas>
    </CanvasContainer>
  )
}

export default MainCanvas
