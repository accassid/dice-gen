import React from 'react'
import { useGlobalState } from '../../modules/global'

// Style
import { RightPanelContainer, SectionContainer, ButtonContainer } from './style'
import { Spacer } from '../style'

// Components
import Downloader from './Downloader/Downloader'
import PreviewButton from './PreviewButton/PreviewButton'
import ValueSlider from '../Controls/ValueSlider'
import DiceTabs from './DiceTabs/DiceTabs'
import MassDownloader from './MassDownloader/MassDownloader'
import SVGMenu from './SVGMenu/SVGMenu'
import OrientationIndicatorMenu from './OrientationIndicatorMenu/OrientationIndicatorMenu'
import FontOptions from './FontOptions/FontOptions'

type Props = {}

/**
 * This component is the absolutely positioned right panel menu. It is by default open with the rightPanelActive and
 * closed on mobile with rightPanelActiveMobile. The mobile prop is only used by the styled-component when the media
 * query detects a small screen. Both props are toggled by the menu button in the top toolbar. The panel contains global
 * values, the die specific menu tabs as well as the action buttons for previews and downloads.
 * @constructor
 */
const RightPanel: React.FC<Props> = () => {
  const [rightPanelActive] = useGlobalState('rightPanelActive')
  const [rightPanelActiveMobile] = useGlobalState('rightPanelActiveMobile')
  const [diePreview] = useGlobalState('diePreview')
  return (
    <RightPanelContainer mobileActive={rightPanelActiveMobile} active={rightPanelActive}>
      {diePreview ? (
        <PreviewButton close />
      ) : (
        <>
          <h2>&nbsp;Global Settings:</h2>
          <SectionContainer>
            <FontOptions />
            <Spacer />
            <ValueSlider label="Dice Scale:" stateKey="globalScale" min={0.1} max={3} step={0.1} />
            <ValueSlider label="Font Scale:" stateKey="globalFontScale" min={0.1} max={1} step={0.05} />
            <ValueSlider label="Symbol Depth (mm):" stateKey="globalDepth" min={0.25} max={5} step={0.25} />
            <Spacer />
            <OrientationIndicatorMenu />
            <SVGMenu />
          </SectionContainer>
          <h2>&nbsp;Die Settings:</h2>
          <DiceTabs />
          <ButtonContainer>
            <PreviewButton />
            <Downloader />
            <MassDownloader />
          </ButtonContainer>
        </>
      )}
    </RightPanelContainer>
  )
}

export default RightPanel
