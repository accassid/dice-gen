import React, { useCallback } from 'react'
import { useGlobalState } from '../../modules/global'
import { useDropzone } from 'react-dropzone'

// Style
import { Dropzone } from './style'

type Props = {}

const SVGDropzone: React.FC<Props> = ({}: Props) => {
  const [file, setFile] = useGlobalState('svgFile')

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.svg' })

  return (
    <Dropzone {...getRootProps()}>
      <input {...getInputProps()} />
      {file ? (
        <p>{file.name}</p>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag an STL file here, or click to select a file.</p>
      )}
    </Dropzone>
  )
}

export default SVGDropzone
