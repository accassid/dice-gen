import React from 'react'
import { useGlobalState } from '../../modules/global'

// Components
import Internal from './Internal/Internal'
import Face from '../Face/Face'

// Models
import { DICE_FACE_LISTS, isDiceOption } from '../../models/dice'

type Props = {}

/**
 * This is the general component for a die. It renders a transparent preview of the die shape as well as mapping all
 * the die faces to solid meshes.
 * @constructor
 */
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
