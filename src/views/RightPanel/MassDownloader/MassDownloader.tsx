import React, { useState, useEffect } from 'react'
import { Checkbox, Modal, Row } from 'antd'
import { dispatch, getGlobalState, useGlobalState } from '../../../modules/global'

import Worker from 'worker-loader!../../../subtractSolid.worker' // eslint-disable-line import/no-webpack-loader-syntax

import { GeometryGenerator } from '../../../models/geometryGenerator'
import { download, generateSTL } from '../../../utils/downloader'
import { subtractSolid } from '../../../utils/subtractSolid'
import { DiceType } from '../../../models/dice'
import { resetFaceRefs } from '../../../modules/actions'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { ActionButton } from '../style'

type Props = {}

const DIE_LIST: Array<DiceType> = ['d4', 'd6', 'd8', 'd10', 'd100', 'd12', 'd20']

const MassDownloader: React.FC<Props> = () => {
  const [dieList, setDieList] = useState<Array<DiceType>>(DIE_LIST)
  const [open, setOpen] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [downloadStrings, setDownloadStrings] = useState<Record<string, string>>({})
  const [die, setDie] = useGlobalState('die')
  const [loadingDice, setLoadingDice] = useGlobalState('loadingDice')
  const setLoadingFaces = useGlobalState('loadingFaces')[1]

  const processDie = (): void => {
    const newWorker = new Worker()

    newWorker.addEventListener('message', event => {
      const { current, max, passableGeometry } = event.data

      if (typeof current === 'number' && typeof max === 'number') {
        setLoadingFaces({ current, max })
      }

      if (passableGeometry) {
        const geometry = new GeometryGenerator(passableGeometry)
        newWorker.terminate()
        const newDownloadStrings = { ...downloadStrings, [die]: generateSTL(geometry) }
        if (dieList.indexOf(die) === dieList.length - 1) {
          download(newDownloadStrings, () => {
            setLoadingDice(null)
            setLoadingFaces(null)
            setDownloading(false)
          })
        } else {
          setDownloadStrings(newDownloadStrings)
          setLoadingDice({ current: loadingDice ? loadingDice.current + 1 : 1, max: dieList.length })
          setLoadingFaces({ current: 0, max: 1 })
          dispatch(resetFaceRefs())
          setDie(dieList[dieList.indexOf(die) + 1])
        }
      }
    })

    subtractSolid(newWorker)
  }
  const handleOk = (): void => {
    setOpen(false)
    setDownloading(true)
    setLoadingDice({ current: 1, max: dieList.length })
    if (die === dieList[0]) processDie()
    else setDie(dieList[0])
  }

  const handleEffect = (): void => {
    if (downloading) {
      const key = `${die}f${die === 'd100' || die === 'd10' ? '0' : die.replace('d', '')}`
      const maxFace = getGlobalState()[key]
      if (maxFace && maxFace.ref && maxFace.ref.name === 'rendered') {
        processDie()
      } else {
        setTimeout(handleEffect, 1000)
      }
    }
  }

  useEffect(handleEffect, [die])

  const handleChange = (die: DiceType, e: CheckboxChangeEvent): void => {
    const newDieList = dieList.slice()
    if (!e.target.checked) newDieList.splice(newDieList.indexOf(die), 1)
    else newDieList.push(die)
    setDieList(newDieList)
  }

  return (
    <>
      <Modal title="Download Set" visible={open} onCancel={(): void => setOpen(false)} onOk={handleOk}>
        {DIE_LIST.map(die => (
          <Row key={die}>
            <Checkbox checked={dieList.includes(die)} onChange={(e: CheckboxChangeEvent): void => handleChange(die, e)}>
              {die.toUpperCase()}
            </Checkbox>
          </Row>
        ))}
      </Modal>
      <ActionButton color={'#146273'} onClick={(): void => setOpen(true)}>
        Download Set
      </ActionButton>
    </>
  )
}

export default MassDownloader
