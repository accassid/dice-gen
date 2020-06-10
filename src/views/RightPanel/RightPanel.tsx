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
          <FontDropdown />
          <Downloader />
          <SVGDropzone />
          <PreviewButton />
        </>
      )}
    </RightPanelContainer>
  )
}

export default RightPanel
