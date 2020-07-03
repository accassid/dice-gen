import React, { useCallback, useState } from 'react'
import { useGlobalState } from '../../modules/global'
import { Upload } from 'antd'
// Style
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import {RcFile} from "antd/es/upload";

const { Dragger } = Upload

type Props = {
  name: string
}

const SVGDropzone: React.FC<Props> = ({name}: Props) => {
  const [globalSVG, setGlobalSVG] = useGlobalState('globalSVG')
  const [file, setFile] = useState<RcFile | null>(null)

  const onDrop = useCallback(
    (file: RcFile) => {
      const loader = new SVGLoader()
      loader.load(URL.createObjectURL(file), data =>
        setGlobalSVG({ ...globalSVG, [name]: { scale: 0.7, rotation: 0, data: data } }),
      )
      setFile(file)
      return true
    },
    [globalSVG, setGlobalSVG],
  )
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.svg' })

  return (
    <Dragger style={{width: 125}} showUploadList={false} accept={'.svg'} fileList={file ? [file] : []} name="file" multiple={false} beforeUpload={onDrop}>
     <p>{file ? file.name : 'Drop here.'}</p>
    </Dragger>
  )
}

export default SVGDropzone
