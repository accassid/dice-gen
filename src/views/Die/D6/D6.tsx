import React from 'react'
import Internal from './Internal/Internal'
import Face from '../../Face/Face'
import { useGlobalState } from '../../../modules/global'

type Props = {}

const SIDES = [1, 2, 3, 4, 5, 6]
const D6: React.FC<Props> = () => {
  const diePreview = useGlobalState('diePreview')[0]
  return (
    <>
      {!diePreview && SIDES.map(side => <Face key={side} dieNum={6} faceNum={side} />)}
      <Internal />
    </>
  )
}

export default D6
