import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { subtractSolid } from '../../utils/subtractSolid'
import { useGlobalState } from '../../modules/global'
import WebWorker from '../../workerSetup'
import subtractionWorker from '../../subtractSolid.worker'

type Props = {
  close?: boolean
}

const PreviewButton: React.FC<Props> = ({ close }: Props) => {
  const setDiePreview = useGlobalState('diePreview')[1]
  const [worker, setWorker] = useState(null)
  const [loadingDice, setLoadingDice] = useGlobalState('loadingDice')
  const [loadingFaces, setLoadingFaces] = useGlobalState('loadingFaces')
  const preview = (): void => {
    // if (close) setDiePreview(null)
    // else {
    //   setLoadingFaces({current: 1, max: 10})
    //   setLoadingDice({current: 1, max: 1})
    //   setTimeout(() => subtractSolid().then(mesh => setDiePreview(mesh)), 2000)
    //
    // }

    // else subtractSolid().then(mesh => setDiePreview(mesh))
    if (worker) {
      worker.postMessage('Hello')
      worker.addEventListener('message', event => {
        console.log(event.data)
      })
    }
    console.log('Done')
  }

  useEffect(() => {
    if (!worker) setWorker(new WebWorker(subtractionWorker))
  })

  return <Button onClick={preview}>Solid Preview</Button>
}

export default PreviewButton
