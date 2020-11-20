import React from 'react'
import { useGlobalState } from '../../modules/global'

// Components
import Internal from './Internal/Internal'
import Face from '../Face/Face'

// Models
import { DICE_FACE_LISTS, isDiceOption } from '../../models/dice'

type Props = {}

const Die: React.FC<Props> = () => {
  const [die] = useGlobalState('die')
  const diePreview = useGlobalState('diePreview')[0]
  const sides = DICE_FACE_LISTS[die]

  const dieSizeKey = die + 'Size'
  if (!isDiceOption(dieSizeKey)) throw new Error(`${die}Scale is not a valid key in the global state.`)
  const [dieSize] = useGlobalState(dieSizeKey)

  return (
    <>
      {!diePreview && sides.map(side => <Face key={side} faceNum={side} dieSize={dieSize} die={die} />)}
      <Internal dieSize={dieSize} />
    </>
  )
}

export default Die
