import React from 'react'

// Components
import D6 from './D6/D6'

type Props = {
  size: number
}

const Die: React.FC<Props> = ({ size }: Props) => {
  return (
    <>
      <D6 size={size} />
    </>
  )
}

export default Die
