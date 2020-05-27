import React from 'react'

type Props = {}

/**
 * Simple grid that is rendered in the center of the canvas. Can be passed additional props to vary the size and
 * concentration of the grid.
 * @constructor
 */
const Grid: React.FC<Props> = () => {
  return <gridHelper position={[0, 0, 0]} receiveShadow />
}

export default Grid
