import React from 'react'

// Libraries
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter'

// Style
import { Button } from 'antd'
import { subtractSolid } from '../../utils/subtractSolid'
import { Scene } from 'three'

type Props = {}

/**
 * https://dev.to/terrierscript/printing-3d-model-jsx-with-react-three-renderer-gd7
 * @constructor
 */
const Downloader: React.FC<Props> = () => {
  const download = (): void => {
    const exportScene = new Scene()
    const finalMesh = subtractSolid()
    // exportScene.add(finalMesh)

    const exporter = new STLExporter()
    const stlString = exporter.parse(exportScene)
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stlString))
    element.setAttribute('download', 'test.stl')

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  return <Button onClick={download}>Download</Button>
}

export default Downloader
