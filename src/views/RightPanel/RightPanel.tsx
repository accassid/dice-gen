import React from 'react'
import { useGlobalState } from '../../modules/global'

// Libraries
import FontDropdown from '../FontDropdown/FontDropdown'

// Style
import { RightPanelContainer, SectionContainer, ButtonContainer } from './style'
import { Spacer } from '../style'

// Components
import Downloader from './Downloader/Downloader'
import PreviewButton from './PreviewButton/PreviewButton'
import ValueSlider from './ValueSlider/ValueSlider'
import DiceTabs from './DiceTabs/DiceTabs'
import MassDownloader from './MassDownloader/MassDownloader'
import SVGMenu from './SVGMenu/SVGMenu'
import OrientationIndicatorMenu from './OrientationIndicatorMenu/OrientationIndicatorMenu'

type Props = {}

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
            <FontDropdown />
            <Spacer />
            <ValueSlider label="Dice Size (mm):" stateKey="globalSize" min={1} max={50} step={1} />
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
