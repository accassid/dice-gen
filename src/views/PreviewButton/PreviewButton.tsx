import React from 'react'
import { Button } from 'antd'
import { subtractSolid } from '../../utils/subtractSolid'
import { useGlobalState } from '../../modules/global'

type Props = {
  close?: boolean
}

const PreviewButton: React.FC<Props> = ({ close }: Props) => {
  const setDiePreview = useGlobalState('diePreview')[1]
  const preview = (): void => {
    if (close) setDiePreview(null)
    else setDiePreview(subtractSolid())
  }

  return <Button onClick={preview}>Solid Preview</Button>
}

export default PreviewButton
