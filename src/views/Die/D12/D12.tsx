import React from 'react'
import Internal from './Internal/Internal'
import Face from '../../Face/Face'
import { useGlobalState } from '../../../modules/global'

type Props = {}

const SIDES = [1,2,3,4,5,6,7,8,9,10,11,12]
const D12: React.FC<Props> = () => {
  const diePreview = useGlobalState('diePreview')[0]
  return (
    <>
      {!diePreview && SIDES.map(side => <Face key={side} dieNum={12} faceNum={side} />)}
      <Internal />
    </>
  )
}

export default D12
