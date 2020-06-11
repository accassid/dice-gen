import React from 'react'
import { useGlobalState } from '../../modules/global'

// Libraries
import FontDropdown from '../FontDropdown/FontDropdown'

// Style
import { RightPanelContainer } from './style'

// Components
import Downloader from '../Downloader/Downloader'
import SVGDropzone from '../SVGDropzone/SVGDropzone'
import PreviewButton from '../PreviewButton/PreviewButton'
import ValueSlider from "./ValueSlider/ValueSlider";

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
          <ValueSlider label="Dice Size (mm):" stateKey="globalSize" min={1} max={50} step={1}/>
          <ValueSlider label="Font Scale:" stateKey="globalFontScale" min={.1} max={1} step={.05}/>
          <ValueSlider label="Symbol Depth (mm):" stateKey="globalDepth" min={.25} max={5} step={.25}/>
          <FontDropdown />
          <SVGDropzone />
          <Downloader />
          <PreviewButton />
        </>
      )}
    </RightPanelContainer>
  )
}

export default RightPanel
