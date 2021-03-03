import React from 'react'

// Style
import { Toolbar, BarSegment } from './style'
import { MenuOutlined } from '@ant-design/icons'

// Assets
import title from '../../assets/title.svg'
import logo from '../../assets/dicegenlight.svg'
import beta from '../../assets/beta.svg'
import { useGlobalState } from '../../modules/global'
import ConfigurationDialog from '../UIOptionsPopup/ConfigurationDialog'

type Props = {}

/**
 * This component is absolutely positioned at the top of the page. It is a styled bar containing the logo link left
 * aligned and the menu button controlling the right panel right aligned. The logo link toggles both regular flag and a
 * mobile flag in the global state for the right panel although only one is used depending on if the css styling for
 * the panel detects a small screen.
 * @constructor
 */
const TopToolbar: React.FC<Props> = () => {
  const [rightPanelActive, setRightPanel] = useGlobalState('rightPanelActive')
  const [rightPanelActiveMobile, setRightPanelMobile] = useGlobalState('rightPanelActiveMobile')

  const togglePanel = (): void => {
    setRightPanel(!rightPanelActive)
    setRightPanelMobile(!rightPanelActiveMobile)
  }

  const iconStyle = { fontSize: 25, cursor: 'pointer' }

  return (
    <Toolbar>
      <BarSegment>
        <a href="/">
          <img alt="DiceGen Logo" src={logo} height="30x" />
          <img alt="DiceGen" src={title} height="23x" />
          {location.hostname.includes('beta.dicegen') && (
            <img alt="beta" src={beta} height="20x" style={{ marginBottom: 15 }} />
          )}
        </a>
      </BarSegment>
      <BarSegment>
        <ConfigurationDialog style={{ ...iconStyle, margin: '0 0.5em' }} />
        <MenuOutlined onClick={togglePanel} style={iconStyle} />
      </BarSegment>
    </Toolbar>
  )
}

export default TopToolbar
