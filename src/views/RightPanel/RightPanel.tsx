import React from 'react'
import { useGlobalState } from '../../modules/global'

// Libraries
import FontDropdown from '../FontDropdown/FontDropdown'

// Style
import { RightPanelContainer } from './style'

// Components

type Props = {}

const RightPanel: React.FC<Props> = () => {
  const [rightPanelActive] = useGlobalState('rightPanelActive')
  const [rightPanelActiveMobile] = useGlobalState('rightPanelActiveMobile')
  return (
    <RightPanelContainer mobileActive={rightPanelActiveMobile} active={rightPanelActive}>
      <FontDropdown />
    </RightPanelContainer>
  )
}

export default RightPanel
