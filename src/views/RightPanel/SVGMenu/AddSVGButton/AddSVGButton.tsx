import React from 'react'
import { Button } from "antd"
import {PlusOutlined} from "@ant-design/icons/lib";
import {useGlobalState} from "../../../../modules/global";
import {SVG_FACE_OPTIONS} from "../../../../models/dice";
import {DEFAULT_SVG} from "../../../../models/svg";

type Props = {}

const AddSVGButton: React.FC<Props> = ({}: Props) => {

  const [globalSVG, setGlobalSVG] = useGlobalState('globalSVG')

  const handleAdd = (): void => {
    let next = null
    for (let i = 0; i<SVG_FACE_OPTIONS.length; i++){
      if (!globalSVG[SVG_FACE_OPTIONS[i]]) {
        next = SVG_FACE_OPTIONS[i]
        break
      }
    }
    if (!next) return
    setGlobalSVG({...globalSVG, [next]: DEFAULT_SVG})
  }

  return (
    <Button
      onClick={handleAdd}
      disabled={Object.keys(globalSVG).length === SVG_FACE_OPTIONS.length}
      size="small"
      icon={<PlusOutlined/>}
    >
      Add SVG
    </Button>
  )
}

export default AddSVGButton
