import React from 'react'
import { useGlobalState } from '../../../modules/global'

// Libraries
import { extend } from 'react-three-fiber'

// Models
import { PentagonalTrapezohedronGeometry } from '../../../models/pentagonalTrapezohedron'
import { CrystalD4Geometry } from '../../../models/crystalD4'
import { AdjustableOctahedronGeometry } from '../../../models/adjustableOctahedron'

extend({ PentagonalTrapezohedronGeometry })
extend({ CrystalD4Geometry })
extend({ AdjustableOctahedronGeometry })

type Props = {
  dieSize: number
}

/**
 * This component renders the internal base shape of the die as a transparent preview. Based on the current die that
 * is selected from the global state, it picks the proper geometry to render.
 * @param dieSize
 * @constructor
 */
const Internal: React.FC<Props> = ({ dieSize }: Props) => {
  const [die] = useGlobalState('die')
  const [diePreview] = useGlobalState('diePreview')
  const [globalScale] = useGlobalState('globalScale')
  const [d8Height] = useGlobalState('d8Height')
  const [d10Height] = useGlobalState('d10Height')
  const [d4CrystalHeight] = useGlobalState('d4CrystalHeight')
  const [d4CrystalPointHeight] = useGlobalState('d4CrystalPointHeight')
  const [d4ShardTopPointHeight] = useGlobalState('d4ShardTopPointHeight')
  const [d4ShardBottomPointHeight] = useGlobalState('d4ShardBottomPointHeight')
  const [d2Radius] = useGlobalState('d2Radius')
  const [d2Sides] = useGlobalState('d2Sides')

  const size = globalScale * dieSize

  return (
    <mesh position={[0, 0, 0]} scale={[0.98, 0.98, 0.98]}>
      {die === 'd2' && (
        <cylinderGeometry attach="geometry" args={[d2Radius * globalScale, d2Radius * globalScale, size, d2Sides]} />
      )}
      {die === 'd4' && <tetrahedronGeometry attach="geometry" args={[size]} />}
      {die === 'd4Crystal' && (
        <crystalD4Geometry
          args={[size, d4CrystalHeight * globalScale, d4CrystalPointHeight * globalScale]}
          attach="geometry"
        />
      )}
      {die === 'd4Shard' && (
        <adjustableOctahedronGeometry
          args={[size, d4ShardTopPointHeight, d4ShardBottomPointHeight]}
          attach="geometry"
        />
      )}
      {die === 'd6' && <boxBufferGeometry attach="geometry" args={[size, size, size]} />}
      {die === 'd8' && <adjustableOctahedronGeometry attach="geometry" args={[size, d8Height, d8Height]} />}
      {(die === 'd10' || die === 'd100') && (
        <pentagonalTrapezohedronGeometry args={[size, d10Height]} attach="geometry" />
      )}
      {die === 'd12' && <dodecahedronBufferGeometry attach="geometry" args={[size]} />}
      {die === 'd20' && <icosahedronBufferGeometry attach="geometry" args={[size]} />}
      <meshStandardMaterial transparent attach="material" opacity={diePreview ? 0.6 : 0.95} color={'#515151'} />
    </mesh>
  )
}

export default Internal
