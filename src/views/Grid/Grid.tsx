import React from 'react'

type Props = {}

/**
 * Simple grid that is rendered in the center of the canvas. Can be passed additional props to vary the size and
 * concentration of the grid.
 * @constructor
 */
const Grid: React.FC<Props> = () => {
  return <gridHelper args={[75, 75, 0xb4b4b4]} position={[0, 0, 0]} receiveShadow />
}

export default Grid
