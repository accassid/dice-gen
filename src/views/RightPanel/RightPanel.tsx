import React from 'react'
import { useGlobalState } from '../../modules/global'
// Style
import { RightPanelContainer } from './style'

type Props = {}

const RightPanel: React.FC<Props> = () => {
  const [rightPanelActive] = useGlobalState('rightPanelActive')
  const [rightPanelActiveMobile] = useGlobalState('rightPanelActiveMobile')
  return <RightPanelContainer mobileActive={rightPanelActiveMobile} active={rightPanelActive}></RightPanelContainer>
}

export default RightPanel
