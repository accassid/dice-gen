import React from 'react'
import { useGlobalState } from '../../../../modules/global'
import { useUpdate } from 'react-three-fiber'
import { Geometry, Mesh, Vector3 } from 'three'

type Props = {
  size: number
}

const Internal: React.FC<Props> = ({ size }: Props) => {
  const [diePreview] = useGlobalState('diePreview')
  const [globalSize] = useGlobalState('globalSize')

  const meshRef = useUpdate<Mesh>(self => {
    self.geometry.center()
    self.rotateOnWorldAxis(new Vector3(0,1,0), Math.PI/4)
    self.rotateOnWorldAxis(new Vector3(0,0,1), (Math.PI-Math.acos(1/3))/2)
    // self.rotateOnAxis(new Vector3(1,0,1), Math.PI/2)
    // if (self.geometry instanceof Geometry) console.log(self.geometry.faces)
  }, [])

  // rotation={[ 0.9595313, 0.6861731, -0.3675318 ]}
  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[0.999, 0.999, 0.999]} >
      <coneGeometry attach="geometry" args={[globalSize/Math.sqrt(2), globalSize, 3]} />
      <tetrahedronBufferGeometry attach="geometry" args={[globalSize / Math.sqrt(2)]} />
      <meshStandardMaterial transparent attach="material" opacity={diePreview ? 0.6 : 0.95} color={'#515151'} />
    </mesh>
  )
}

export default Internal
