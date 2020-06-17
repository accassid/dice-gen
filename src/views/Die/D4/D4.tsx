import React from 'react'

import Face from '../../Face/Face'
import { useGlobalState } from '../../../modules/global'
import Internal from './Internal/Internal'

type Props = {
  size: number
}

const SIDES = [1, 2, 3, 4]
const D4: React.FC<Props> = ({ size }: Props) => {
  const diePreview = useGlobalState('diePreview')[0]
  return (
    <>
      {!diePreview && SIDES.map(side => <Face key={side} dieNum={4} faceNum={side} />)}
      <Internal/>
    </>
  )
}

export default D4
