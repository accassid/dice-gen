import React, { useCallback, useState } from 'react'
import { useGlobalState } from '../../../../modules/global'
// Style
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { RcFile } from 'antd/es/upload'
import { StyledDragger } from './style'

type Props = {
  name: string
}

const SVGDropzone: React.FC<Props> = ({ name }: Props) => {
  const [globalSVG, setGlobalSVG] = useGlobalState('globalSVG')
  const [file, setFile] = useState<RcFile | null>(null)

  const onDrop = useCallback(
    (file: RcFile) => {
      const loader = new SVGLoader()
      loader.load(URL.createObjectURL(file), data =>
        setGlobalSVG({ ...globalSVG, [name]: { ...globalSVG[name], data: data } }),
      )
      setFile(file)
      return true
    },
    [globalSVG, setGlobalSVG, name],
  )

  return (
    <StyledDragger
      showUploadList={false}
      accept={'.svg'}
      fileList={file ? [file] : []}
      name="file"
      multiple={false}
      beforeUpload={onDrop}>
      <p>{file ? file.name : 'Click or drag.'}</p>
    </StyledDragger>
  )
}

export default SVGDropzone
