import React, { useCallback, useState } from 'react'
import { useGlobalState } from '../../modules/global'
import { Upload } from 'antd'
// Style
import { Dropzone } from './style'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import {RcFile} from "antd/es/upload";

const { Dragger } = Upload

type Props = {}

const SVGDropzone: React.FC<Props> = () => {
  const [globalSVG, setGlobalSVG] = useGlobalState('globalSVG')
  const [file, setFile] = useState<RcFile | null>(null)

  const onDrop = useCallback(
    (file: RcFile) => {
      const loader = new SVGLoader()
      loader.load(URL.createObjectURL(file), data =>
        setGlobalSVG({ ...globalSVG, max: { scale: 0.7, rotation: 0, data: data } }),
      )
      setFile(file)
      return true
    },
    [globalSVG, setGlobalSVG],
  )
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.svg' })

  return (
    <Dragger showUploadList={false} accept={'.svg'} fileList={file ? [file] : []} name="file" multiple={false} beforeUpload={onDrop}>
     <p>{file ? file.name : 'Drop here.'}</p>
    </Dragger>
  )
}

export default SVGDropzone
