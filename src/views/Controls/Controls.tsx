import React, { useRef } from 'react'
import { useThree, extend } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type Props = {}

extend({ OrbitControls })

/**
 * This component puts orbit controls on the same level of the dom as other children of the MainCanvas. The
 * OrbitControls are a set of controls that allow the user to rotate the camera around the center of the canvas with
 * left and right click drag and the scroll wheel.
 * @param children
 * @constructor
 */
const Controls: React.FC<Props> = () => {
  const orbit = useRef()
  const { camera, gl } = useThree()

  return (
    <orbitControls ref={orbit} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.1} />
  )
}

export default Controls
