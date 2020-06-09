import React from 'react'
import {Button} from "antd";
import {subtractSolid} from "../../utils/subtractSolid";
import {useGlobalState} from "../../modules/global";

type Props = {}

const PreviewButton: React.FC<Props> = () => {
  const setDiePreview = useGlobalState('diePreview')[1]
  const preview = (): void => {
    setDiePreview(subtractSolid(6,20))
  }

  return <Button onClick={preview}>Solid Preview</Button>
}

export default PreviewButton
