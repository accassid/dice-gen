import React, { useCallback, useState } from 'react'
import { useGlobalState } from '../../../../modules/global'

// Style
import { RcFile } from 'antd/es/upload'
import { StyledDragger } from '../../../style'
import { DropzoneWidthWrapper } from './style'

// Libraries
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader'
import * as THREE from 'three'

type Props = {}

/**
 * This component renders an antdesign file dropzone that accepts TTF files. When received the file is converted to
 * a three.js Font class and stored in the global state along with the name of the font (the file name).
 * @constructor
 */
const FontDropzone: React.FC<Props> = () => {
  const [file, setFile] = useState<RcFile | null>(null)
  const setGlobalFont = useGlobalState('globalFont')[1]
  const [globalFontName, setGlobalFontName] = useGlobalState('globalFontName')

  const onDrop = useCallback(
    (file: RcFile) => {
      setFile(file)
      const ttfLoader = new TTFLoader()
      const fontLoader = new THREE.FontLoader()
      ttfLoader.load(URL.createObjectURL(file), fnt => {
        const final = fontLoader.parse(fnt)
        setGlobalFont(final)
      })
      setGlobalFontName(file.name)
      return true
    },
    [setGlobalFont, setGlobalFontName],
  )

  return (
    <DropzoneWidthWrapper>
      <StyledDragger
        style={{ width: '100%' }}
        width="100%"
        showUploadList={false}
        accept={'.ttf'}
        fileList={file ? [file] : []}
        name="file"
        multiple={false}
        beforeUpload={onDrop}>
        <p>{globalFontName ? globalFontName : 'Click or drag TTF.'}</p>
      </StyledDragger>
    </DropzoneWidthWrapper>
  )
}

export default FontDropzone
