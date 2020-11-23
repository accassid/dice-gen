import React from 'react'

// Assets
import patreon from '../../assets/patreon_light.svg'

// Style
import { FootContainer } from './style.js'
import { GithubOutlined, TwitterOutlined } from '@ant-design/icons'
import LinkChip from './LinkChip/LinkChip'

type Props = {}

/**
 * This is a simple container element styled to a fixed position at the bottom of the page (although it uses css media
 * queries to reposition to the left on small screens). It includes all the external links.
 * @constructor
 */
const Footer: React.FC<Props> = () => {
  return (
    <FootContainer>
      <LinkChip href="https://github.com/accassid/dice-gen" icon={<GithubOutlined />} />
      <LinkChip href="https://twitter.com/dicegenapp" icon={<TwitterOutlined />} />
      <LinkChip
        href="https://www.patreon.com/dicegen"
        icon={<img alt="patreon" height={20} src={patreon} />}
        text="Support Us"
      />
    </FootContainer>
  )
}

export default Footer
