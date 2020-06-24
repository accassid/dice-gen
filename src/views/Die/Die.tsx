import React from 'react'
import { useGlobalState } from '../../modules/global'

// Components
import Internal from "./Internal/Internal";
import Face from "../Face/Face";

// Models
import {DICE_FACE_LISTS, isDiceOption} from "../../models/dice";

type Props = {}

const Die: React.FC<Props> = () => {

  const [die] = useGlobalState('die')
  const diePreview = useGlobalState('diePreview')[0]
  const sides = DICE_FACE_LISTS[die]

  const dieScaleKey = die+'Scale'
  if (!isDiceOption(dieScaleKey)) throw new Error(`${die}Scale is not a valid key in the global state.`)
  const [dieScale] = useGlobalState(dieScaleKey)

  return (
    <>
      {!diePreview && sides.map(side => <Face key={side} faceNum={side} dieScale={dieScale} />)}
      <Internal dieScale={dieScale}/>
    </>
  )
}

export default Die
