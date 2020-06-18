import React from 'react'

// Components
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
    </>
  )
}

export default Die
