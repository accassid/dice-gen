import React, { useCallback, useState } from 'react'
import { useGlobalState } from '../../../../modules/global'

// Style
import { RcFile } from 'antd/es/upload'
import { StyledDragger } from '../../../style'

// SVG Libraries

import {TTFLoader} from "three/examples/jsm/loaders/TTFLoader";
import * as THREE from "three";

type Props = {
}

/**
 * This component renders an antdesign file dropzone that accepts SVG files. When a file is dropped in the zone  it
 * uses several external libraries to process the file. Three.js does have some built in options but most of them
 * messed with the svg more than these libraries. The simplify parameter tries to simplify the svg more depending on
 * how complex it is so it does not bog down three.js.
 * @param name
 * @constructor
 */
const FontDropzone: React.FC<Props> = ({ }: Props) => {
  const [file, setFile] = useState<RcFile | null>(null)
  const setGlobalFont = useGlobalState('globalFont')[1]
  const [globalFontName, setGlobalFontName] = useGlobalState('globalFontName')

  const onDrop = useCallback(
    (file: RcFile) => {
      setFile(file)
      const ttfLoader = new TTFLoader()
      const fontLoader = new THREE.FontLoader()
      ttfLoader.load(URL.createObjectURL(file), fnt => setGlobalFont(fontLoader.parse(fnt)))
      setGlobalFontName(file.name)
      return true
    },
    [],
  )

  return (
    <StyledDragger
      style={{width: '100%'}}
      width="100%"
      showUploadList={false}
      accept={'.ttf'}
      fileList={file ? [file] : []}
      name="file"
      multiple={false}
      beforeUpload={onDrop}>
      <p>{globalFontName ? globalFontName : 'Click or drag TTF.'}</p>
    </StyledDragger>
  )
}

export default FontDropzone
