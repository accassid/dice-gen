import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { subtractSolid } from '../../utils/subtractSolid'
import { useGlobalState } from '../../modules/global'
import { Mesh, MeshStandardMaterial } from 'three'
// eslint-disable-next-line
// @ts-ignore
import Worker from '../../subtractSolid.worker'
import { GeometryGenerator } from '../../models/geometryGenerator'

//   import Worker from 'worker-loader!./subtractSolid.worker.js'
type Props = {
  close?: boolean
}

const PreviewButton: React.FC<Props> = ({ close }: Props) => {
  const setDiePreview = useGlobalState('diePreview')[1]
  const [worker, setWorker] = useState(null)
  const [loadingDice, setLoadingDice] = useGlobalState('loadingDice')
  const [loadingFaces, setLoadingFaces] = useGlobalState('loadingFaces')
  const preview = (): void => {
    if (close) {
      setDiePreview(null)
      return
    }
    const newWorker = new Worker()
    setWorker(newWorker)

    newWorker.addEventListener('message', event => {
      const geometry = new GeometryGenerator(event.data)
      const mesh = new Mesh(geometry)
      mesh.material = new MeshStandardMaterial({ color: 0xacacac })
      setDiePreview(mesh)
      newWorker.terminate()
    })

    subtractSolid(newWorker)
  }

  // useEffect(() => {
  //   if (!worker) setWorker(new Worker())
  // })

  return <Button onClick={preview}>Solid Preview</Button>
}

export default PreviewButton
