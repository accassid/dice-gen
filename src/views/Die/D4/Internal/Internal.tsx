import React from 'react'
import { useGlobalState } from '../../../../modules/global'
import { useUpdate } from 'react-three-fiber'
import { Geometry, Mesh } from 'three'

type Props = {
  size: number
}

const Internal: React.FC<Props> = ({ size }: Props) => {
  const [diePreview] = useGlobalState('diePreview')
  const [globalSize] = useGlobalState('globalSize')

  const meshRef = useUpdate<Mesh>(self => {
    self.geometry.center()

    if (self.geometry instanceof Geometry) console.log(self.geometry.faces)
  }, [])

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[0.999, 0.999, 0.999]} rotation={[0, 0, 0]}>
      {/*<coneGeometry attach="geometry" args={[globalSize/Math.sqrt(2), globalSize, 3]} />*/}
      <tetrahedronBufferGeometry attach="geometry" args={[globalSize / Math.sqrt(2)]} />
      <meshStandardMaterial transparent attach="material" opacity={diePreview ? 0.6 : 0.95} color={'#515151'} />
    </mesh>
  )
}

export default Internal
