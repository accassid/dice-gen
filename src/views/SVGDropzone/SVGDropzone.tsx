import React, { useCallback, useState } from 'react'
import { useGlobalState } from '../../modules/global'
import { useDropzone } from 'react-dropzone'

// Style
import { Dropzone } from './style'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

type Props = {}

const SVGDropzone: React.FC<Props> = () => {
  const [globalSVG, setGlobalSVG] = useGlobalState('globalSVG')
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback(
    acceptedFiles => {
      const loader = new SVGLoader()
      loader.load(URL.createObjectURL(acceptedFiles[0]), data =>
        setGlobalSVG({ ...globalSVG, max: { scale: 0.7, rotation: 0, data: data } }),
      )
      setFile(acceptedFiles[0])
    },
    [globalSVG, setGlobalSVG],
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.svg' })

  return (
    <Dropzone {...getRootProps()}>
      <input {...getInputProps()} />
      {file ? (
        <p>{file.name}</p>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag an SVG file here, or click to select a file.</p>
      )}
    </Dropzone>
  )
}

export default SVGDropzone
