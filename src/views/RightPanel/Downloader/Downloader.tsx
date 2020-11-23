import React from 'react'
import { useGlobalState } from '../../../modules/global'

// Style
import { ActionButton } from '../style'

// Models
import { GeometryGenerator } from '../../../models/geometryGenerator'

// Utils
import { subtractSolid } from '../../../utils/subtractSolid'
import { download, generateSTL } from '../../../utils/downloader'

// Web worker
import Worker from 'worker-loader!../../../subtractSolid.worker' // eslint-disable-line import/no-webpack-loader-syntax

type Props = {}

/**
 * This component renders a button that triggers the processing and download of the currently viewed die.
 * @constructor
 */
const Downloader: React.FC<Props> = () => {
  const setLoadingDice = useGlobalState('loadingDice')[1]
  const setLoadingFaces = useGlobalState('loadingFaces')[1]
  const [die] = useGlobalState('die')

  /**
   * When a download is triggered first the global state used for the loader is set for a single die. Then a new
   * subtraction web worker is created. We add a message listener to the worker that should trigger when a face has
   * been subtracted from the die. It passes in the current face that it completed as well as the max number of faces
   * so they can be set in the global state to update the loader. Once the last face is processed the message should
   * contain a passableGeometry object that is converted into a three.js geometry and then downloaded in STL form. The
   * loading states are then reset.
   */
  const handleDownload = (): void => {
    setLoadingDice({ current: 1, max: 1 })

    const newWorker = new Worker()

    newWorker.addEventListener('message', event => {
      const { current, max, passableGeometry } = event.data

      if (typeof current === 'number' && typeof max === 'number') {
        setLoadingFaces({ current, max })
      }

      if (passableGeometry) {
        const geometry = new GeometryGenerator(passableGeometry)
        newWorker.terminate()
        download({ [die]: generateSTL(geometry) })
        setLoadingFaces(null)
        setLoadingDice(null)
      }
    })

    subtractSolid(newWorker)
  }

  return (
    <ActionButton rgbColor={'62,119,84'} onClick={handleDownload}>
      Download
    </ActionButton>
  )
}

export default Downloader
