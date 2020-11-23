import React from 'react'
import { useGlobalState } from '../../../modules/global'

// Models
import { GeometryGenerator } from '../../../models/geometryGenerator'

// Utils
import { subtractSolid } from '../../../utils/subtractSolid'

// Libraries
import { Mesh, MeshStandardMaterial } from 'three'

// Web Worker
import Worker from 'worker-loader!../../../subtractSolid.worker' // eslint-disable-line import/no-webpack-loader-syntax

// Styles
import { ActionButton } from '../style'

type Props = {
  close?: boolean
}

/**
 * This component renders a button that when clicked process the currently viewed die and sets the diePreview in the
 * global state, rendering a preview of the subtracted die on the screen.
 * @param close
 * @constructor
 */
const PreviewButton: React.FC<Props> = ({ close }: Props) => {
  const [diePreview, setDiePreview] = useGlobalState('diePreview')
  const setLoadingDice = useGlobalState('loadingDice')[1]
  const setLoadingFaces = useGlobalState('loadingFaces')[1]

  /**
   * This function is called when the button is clicked. It uses web workers in the same way that handleDownload in
   * Downloader.tsx uses so refer to that function for more details on the communication with the web worker. This
   * function simple allows the web workers to create the passableGeometry, it then converts it to a three.js geometry
   * and then sets it to the global state allowing the <Preview> component to render it.
   */
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

  return (
    <ActionButton rgbColor={'170,157,45'} onClick={preview}>
      {diePreview ? 'Close Preview' : 'Solid Preview'}
    </ActionButton>
  )
}

export default PreviewButton
