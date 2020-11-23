import React, { ReactElement } from 'react'

// Style
import { ChipContainer, TextContainer } from './style'

type Props = {
  icon: ReactElement
  href: string
  text?: string
}

/**
 * This is a simple component that renders a chip to be used for external links at the footer of the page. An icon
 * element as well as a url are required for the component. Additional text can be passed in and rendered to the right
 * of the icon.
 * @param icon
 * @param href
 * @param text
 * @constructor
 */
const LinkChip: React.FC<Props> = ({ icon, href, text }: Props) => {
  return (
    <ChipContainer href={href} target="_blank">
      {icon}
      {!!text && <TextContainer>{text}</TextContainer>}
    </ChipContainer>
  )
}

export default LinkChip
