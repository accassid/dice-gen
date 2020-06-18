import React from 'react'

// Components
import D12 from "./D12/D12";
import D8 from './D8/D8'
import D6 from './D6/D6'
import D4 from './D4/D4'
import { useGlobalState } from '../../modules/global'

type Props = {}

const Die: React.FC<Props> = () => {
  const [currentDie] = useGlobalState('die')
  return (
    <>
      {currentDie === 'd4' && <D4 />}
      {currentDie === 'd6' && <D6 />}
      {currentDie === 'd8' && <D8 />}
      {currentDie === 'd12' && <D12/>}
    </>
  )
}

export default Die
