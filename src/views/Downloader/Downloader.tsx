import React from 'react'

// Libraries
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter'

// Style
import { Button } from 'antd'
import { useGlobalState } from '../../modules/global'

type Props = {}

/**
 * https://dev.to/terrierscript/printing-3d-model-jsx-with-react-three-renderer-gd7
 * @constructor
 */
const Downloader: React.FC<Props> = () => {
  const [scene] = useGlobalState('scene')
  const setExporting = useGlobalState('exporting')[1]

  const download = (): void => {
    if (!scene) return

    setExporting(true)

    const exporter = new STLExporter()
    const stlString = exporter.parse(scene)
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stlString))
    element.setAttribute('download', 'test.stl')

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
    setExporting(false)
  }

  return <Button onClick={download}>Download</Button>
}

export default Downloader
