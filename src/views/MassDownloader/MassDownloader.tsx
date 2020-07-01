import React, {useState, useEffect} from 'react'
import {Button, Modal} from "antd";
import {dispatch, getGlobalState, useGlobalState} from "../../modules/global";

// eslint-disable-next-line
// @ts-ignore
import Worker from "../../subtractSolid.worker";
import {GeometryGenerator} from "../../models/geometryGenerator";
import {download, generateSTL} from "../../utils/downloader";
import {subtractSolid} from "../../utils/subtractSolid";
import {DiceType} from "../../models/dice";
import {resetFaceRefs} from "../../modules/actions";

type Props = {}

const DIE_LIST: Array<DiceType> = ['d4','d6','d10','d100', 'd12', 'd20']

const MassDownloader: React.FC<Props> = ({}: Props) => {
  const [dieList, setDieList] = useState<Array<DiceType>>(DIE_LIST)
  const [open, setOpen] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [downloadStrings, setDownloadStrings] = useState<Array<string>>([])
  const [die, setDie] = useGlobalState('die')
  const [loadingDice, setLoadingDice] = useGlobalState('loadingDice')
  const setLoadingFaces = useGlobalState('loadingFaces')[1]

  const processDie = (): void => {
    const newWorker = new Worker()

    newWorker.addEventListener('message', event => {
      const {current, max, passableGeometry} = event.data

      if (typeof current === 'number' && typeof max === 'number') {
        setLoadingFaces({current, max})
      }

      if (passableGeometry) {
        const geometry = new GeometryGenerator(passableGeometry)
        newWorker.terminate()
        const newDownloadStrings = [...downloadStrings, generateSTL(geometry)]
        if (dieList.indexOf(die) === dieList.length-1) {
          console.log('done')
          download(newDownloadStrings)
          setLoadingDice(null)
          setLoadingFaces(null)
        } else {
          setDownloadStrings(newDownloadStrings)
          setLoadingDice({current: loadingDice  ? loadingDice.current+1 : 1, max: dieList.length})
          setLoadingFaces({current: 0, max: 1})
          dispatch(resetFaceRefs())
          setDie(dieList[dieList.indexOf(die)+1])
        }
      }
    })

    subtractSolid(newWorker)
  }
  const handleOk = (): void => {
    setOpen(false)
    setDownloading(true)
    setLoadingDice({current: 1, max: dieList.length})
    if (die === dieList[0]) processDie()
    else setDie(dieList[0])
  }

  const handleEffect = () => {
    if (downloading){
      const key = `${die}f${(die === 'd100' || die === 'd10') ? '0' : die.replace('d', '')}`
      const maxFace = getGlobalState()[key]
      if (maxFace && maxFace.ref) {
        processDie()
      }
      else {
        setTimeout(handleEffect, 1000)
      }
    }
  }

  useEffect(() => {
    handleEffect()
  }, [die])


  return (
    <>
      <Modal
        title="Download Set"
        visible={open}
        onCancel={() => setOpen(false)}
        onOk={handleOk}
        >

      </Modal>
      <Button onClick={() => setOpen(true)}>Download Set</Button>
    </>
  )
}

export default MassDownloader
