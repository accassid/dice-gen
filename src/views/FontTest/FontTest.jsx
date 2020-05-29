import * as THREE from 'three'
import React, { useMemo, useEffect, useState } from 'react'
import { useGlobalState } from '../../modules/global'
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader'

/**
 * https://medium.com/@joshmarinacci/threejs-secretly-supports-true-type-fonts-b896df19af2e
 */
const FontTest = () => {
  // const font = useLoader(THREE.FontLoader, '/fonts/Strait_Regular.json')
  // const ttfLoader = useLoader(TTFLoader, '/fonts/Strait_Regular.ttf')
  const [fontUrl] = useGlobalState('fontUrl')

  const [font, setFont] = useState(null)

  const config = useMemo(
    () => ({
      font,
      hAlign: 'center',
      size: 0.3,
      height: 0.2,
      curveSegments: 32,
      bevelEnabled: false,
      bevelThickness: 0.01,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font],
  )

  useEffect(() => {
    if (fontUrl) {
      const ttfLoader = new TTFLoader()
      const fontLoader = new THREE.FontLoader()
      ttfLoader.load(fontUrl, fnt => setFont(fontLoader.parse(fnt)))
    }
  }, [fontUrl])

  if (!font) return null
  return (
    <mesh position={[0, 1, 0.45]}>
      <textGeometry attach="geometry" args={['0 1 2 3 4 5', config]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

export default FontTest
