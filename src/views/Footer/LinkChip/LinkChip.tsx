import React, { ReactElement } from 'react'

// Style
import { ChipContainer, TextContainer } from './style'

type Props = {
  icon: ReactElement
  href: string
  text?: string
}

const LinkChip: React.FC<Props> = ({ icon, href, text }: Props) => {
  return (
    <ChipContainer href={href} target="_blank">
      {icon}
      {!!text && <TextContainer>{text}</TextContainer>}
    </ChipContainer>
  )
}

export default LinkChip
