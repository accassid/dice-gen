import React from 'react'
import { useGlobalState } from '../../modules/global'

type Props = {}

/**
 * Simple grid that is rendered in the center of the canvas. Can be passed additional props to vary the size and
 * concentration of the grid.
 * @constructor
 */
const Grid: React.FC<Props> = () => {
  const [showGrid] = useGlobalState('showGrid')
  return showGrid ? <gridHelper args={[60, 60, 0xb4b4b4]} position={[0, 0, 0]} receiveShadow /> : <></>
}

export default Grid
