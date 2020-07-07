import React, { useCallback, useState } from 'react'
import { useGlobalState } from '../../../../modules/global'
// Style
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { RcFile } from 'antd/es/upload'
import { StyledDragger } from './style'
import loadSvg from 'load-svg'
import svgMesh3d from 'svg-mesh-3d'
import { parse } from 'extract-svg-path'
import reindex from 'mesh-reindex'
import unindex from 'unindex-mesh'
import mergeVertices from 'merge-vertices'
import removeDegenerateCells from 'remove-degenerate-cells'

type Props = {
  name: string
}

const SVGDropzone: React.FC<Props> = ({ name }: Props) => {
  const [globalSVG, setGlobalSVG] = useGlobalState('globalSVG')
  const [file, setFile] = useState<RcFile | null>(null)

  const onDrop = useCallback(
    (file: RcFile) => {
      // const loader = new SVGLoader()
      // loader.load(URL.createObjectURL(file), data =>
      //   setGlobalSVG({ ...globalSVG, [name]: { ...globalSVG[name], data: data } }),
      // )
      loadSvg(URL.createObjectURL(file), (error, svg) => {
        if (error) throw error
        const svgPath = parse(svg)
        let mesh = svgMesh3d(svgPath, {
          delaunay: true,
          simplify: svgPath.length/10000,
          normalize: false,
        })
        mesh = reindex(unindex(mesh.positions, mesh.cells))
        mesh = mergeVertices(mesh.cells, mesh.positions)

        setGlobalSVG({ ...globalSVG, [name]: { ...globalSVG[name], primitiveMesh: mesh } })
      })
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
