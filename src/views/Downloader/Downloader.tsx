import React from 'react'

// Style
import { Button } from 'antd'
import { subtractSolid } from '../../utils/subtractSolid'
import {GeometryGenerator} from "../../models/geometryGenerator";
import {useGlobalState} from "../../modules/global";
import {download, generateSTL} from "../../utils/downloader";

// eslint-disable-next-line
// @ts-ignore
import Worker from "../../subtractSolid.worker";

type Props = {}

/**
 * https://dev.to/terrierscript/printing-3d-model-jsx-with-react-three-renderer-gd7
 * @constructor
 */
const Downloader: React.FC<Props> = () => {
  const setLoadingDice = useGlobalState('loadingDice')[1]
  const setLoadingFaces = useGlobalState('loadingFaces')[1]

  const handleDownload = (): void => {
    setLoadingDice({current: 1, max: 1})

    const newWorker = new Worker()

    newWorker.addEventListener('message', event => {
      const {current, max, passableGeometry} = event.data

      if (typeof current === 'number' && typeof max === 'number') {
        setLoadingFaces({current, max})
      }

      if (passableGeometry) {
        const geometry = new GeometryGenerator(passableGeometry)
        newWorker.terminate()
        download([generateSTL(geometry)])
        setLoadingFaces(null)
        setLoadingDice(null)
      }
    })

    subtractSolid(newWorker)
  }

  return <Button onClick={handleDownload}>Download</Button>
}

export default Downloader
