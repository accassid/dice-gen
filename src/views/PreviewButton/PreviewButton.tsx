import React from 'react'
import { Button } from 'antd'
import { subtractSolid } from '../../utils/subtractSolid'
import { useGlobalState } from '../../modules/global'
import { Mesh, MeshStandardMaterial } from 'three'
import Worker from 'worker-loader!../../subtractSolid.worker' // eslint-disable-line import/no-webpack-loader-syntax
import { GeometryGenerator } from '../../models/geometryGenerator'

//   import Worker from 'worker-loader!./subtractSolid.worker.js'
type Props = {
  close?: boolean
}

const PreviewButton: React.FC<Props> = ({ close }: Props) => {
  const setDiePreview = useGlobalState('diePreview')[1]
  const setLoadingDice = useGlobalState('loadingDice')[1]
  const setLoadingFaces = useGlobalState('loadingFaces')[1]
  const preview = (): void => {
    if (close) {
      setDiePreview(null)
      return
    }
    setLoadingDice({ current: 1, max: 1 })

    const newWorker = new Worker()

    newWorker.addEventListener('message', event => {
      const { current, max, passableGeometry } = event.data

      if (typeof current === 'number' && typeof max === 'number') {
        setLoadingFaces({ current, max })
      }

      if (passableGeometry) {
        const geometry = new GeometryGenerator(passableGeometry)
        const mesh = new Mesh(geometry)
        mesh.material = new MeshStandardMaterial({ color: 0xacacac })
        setDiePreview(mesh)
        newWorker.terminate()
        setLoadingFaces(null)
        setLoadingDice(null)
      }
    })

    subtractSolid(newWorker)
  }

  // useEffect(() => {
  //   if (!worker) setWorker(new Worker())
  // })

  return <Button onClick={preview}>Solid Preview</Button>
}

export default PreviewButton
