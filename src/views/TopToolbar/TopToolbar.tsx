import React from 'react'

// Style
import { Toolbar, BarSegment } from './style'
import { MenuOutlined } from '@ant-design/icons'

// Assets
import title from '../../assets/title.svg'
import logo from '../../assets/dicegenlight.svg'
import { useGlobalState } from '../../modules/global'

type Props = {}

const TopToolbar: React.FC<Props> = () => {
  const [rightPanelActive, setRightPanel] = useGlobalState('rightPanelActive')
  const [rightPanelActiveMobile, setRightPanelMobile] = useGlobalState('rightPanelActiveMobile')

  const togglePanel = (): void => {
    setRightPanel(!rightPanelActive)
    setRightPanelMobile(!rightPanelActiveMobile)
  }

  return (
    <Toolbar>
      <BarSegment>
        <a href="/">
          <img alt="DiceGen Logo" src={logo} height="30x" />
          <img alt="DiceGen" src={title} height="23x" />
        </a>
      </BarSegment>
      <BarSegment>
        <MenuOutlined onClick={togglePanel} style={{ fontSize: 25, cursor: 'pointer' }} />
      </BarSegment>
    </Toolbar>
  )
}

export default TopToolbar
