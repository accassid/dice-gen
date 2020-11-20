import React from 'react'

// Assets
import patreon from '../../assets/patreon_light.svg'

// Style
import { FootContainer } from './style.js'
import { GithubOutlined, TwitterOutlined } from '@ant-design/icons'
import LinkChip from './LinkChip/LinkChip'

type Props = {}

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
