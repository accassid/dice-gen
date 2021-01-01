import React from 'react'
import { useGlobalState } from '../../../modules/global'

// Libraries
import { extend } from 'react-three-fiber'

// Models
import { PentagonalTrapezohedronGeometry } from '../../../models/pentagonalTrapezohedron'
import { CrystalD4ShardGeometry } from '../../../models/crystalD4Shard'

extend({ PentagonalTrapezohedronGeometry })
extend({ CrystalD4ShardGeometry })

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
  const [d10Height] = useGlobalState('d10Height')
  const [d4ShardHeight] = useGlobalState('d4ShardHeight')
  const [d4ShardPointHeight] = useGlobalState('d4ShardPointHeight')

  const size = globalScale * dieSize

  return (
    <mesh position={[0, 0, 0]} scale={[0.999, 0.999, 0.999]}>
      {die === 'd4' && <tetrahedronGeometry attach="geometry" args={[size]} />}
      {die === 'd4Shard' && (
        <crystalD4ShardGeometry
          args={[size, d4ShardHeight * globalScale, d4ShardPointHeight * globalScale]}
          attach="geometry"
        />
      )}
      {die === 'd6' && <boxBufferGeometry attach="geometry" args={[size, size, size]} />}
      {die === 'd8' && <octahedronBufferGeometry attach="geometry" args={[size]} />}
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
