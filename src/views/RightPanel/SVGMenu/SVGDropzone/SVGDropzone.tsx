import React, { useCallback, useState } from 'react'
import { useGlobalState } from '../../../../modules/global'

// Style
import { RcFile } from 'antd/es/upload'
import { StyledDragger } from '../../../style'

// SVG Libraries
import loadSvg from 'load-svg'
import svgMesh3d from 'svg-mesh-3d'
import { parse } from 'extract-svg-path'
import mergeVertices from 'merge-vertices'

type Props = {
  name: string
}

/**
 * This component renders an antdesign file dropzone that accepts SVG files. When a file is dropped in the zone  it
 * uses several external libraries to process the file. Three.js does have some built in options but most of them
 * messed with the svg more than these libraries. The simplify parameter tries to simplify the svg more depending on
 * how complex it is so it does not bog down three.js.
 * @param name
 * @constructor
 */
const SVGDropzone: React.FC<Props> = ({ name }: Props) => {
  const [globalSVG, setGlobalSVG] = useGlobalState('globalSVG')
  const [file, setFile] = useState<RcFile | null>(null)

  const onDrop = useCallback(
    (file: RcFile) => {
      loadSvg(URL.createObjectURL(file), (error, svg) => {
        if (error) throw error
        const svgPath = parse(svg)
        let mesh = svgMesh3d(svgPath, {
          delaunay: true,
          simplify: svgPath.length / 10000,
          normalize: false,
        })
        mesh = mergeVertices(mesh.cells, mesh.positions)

        setGlobalSVG({ ...globalSVG, [name]: { ...globalSVG[name], primitiveMesh: mesh, fileName: file.name } })
      })
      setFile(file)
      return true
    },
    [globalSVG, setGlobalSVG, name],
  )

  return (
    <StyledDragger
      width="110px"
      showUploadList={false}
      accept={'.svg'}
      fileList={file ? [file] : []}
      name="file"
      multiple={false}
      beforeUpload={onDrop}>
      <p>{globalSVG[name].fileName ? globalSVG[name].fileName : 'Click or drag.'}</p>
    </StyledDragger>
  )
}

export default SVGDropzone
