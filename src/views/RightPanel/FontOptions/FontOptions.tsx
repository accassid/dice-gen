import React from 'react'
import { useGlobalState } from '../../../modules/global'

// Style
import { HorizontalContainer } from './style'
import { Button } from 'antd'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons/lib'

// Components
import FontDropdown from './FontDropdown/FontDropdown'
import FontDropzone from './FontDropzone/FontDropzone'

type Props = {}

/**
 * This component renders the font selection options at the top of the right panel. By default this displays the
 * dropdown of all the google fonts as well as a button that switches to upload font mode. This sets the property
 * globalFontUploadActive to true in the google state which switches this component to render a font file dropzone
 * instead with a button that resets the state back to the font dropdown.
 * @constructor
 */
const FontOptions: React.FC<Props> = () => {
  const [uploadOpen, setUploadOpen] = useGlobalState('globalFontUploadActive')
  const setGlobalFont = useGlobalState('globalFont')[1]
  const setGlobalFontName = useGlobalState('globalFontName')[1]

  /**
   * When switching between upload and dropdown modes, clear the currently selected font and set the flag.
   * @param flag
   */
  const toggle = (flag: boolean): void => {
    setUploadOpen(flag)
    setGlobalFont(null)
    setGlobalFontName('')
  }

  if (uploadOpen)
    return (
      <HorizontalContainer>
        <FontDropzone />
        <Button
          onClick={(): void => toggle(false)}
          title="Remove uploaded font"
          type="primary"
          icon={<DeleteOutlined />}
        />
      </HorizontalContainer>
    )

  return (
    <HorizontalContainer>
      <FontDropdown />
      <Button
        title="Upload a font"
        onClick={(): void => toggle(true)}
        type="primary"
        shape="circle"
        icon={<UploadOutlined />}
      />
    </HorizontalContainer>
  )
}

export default FontOptions
