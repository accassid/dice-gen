import React from 'react'
import { useGlobalState } from '../../../../modules/global'

// Style
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons/lib'

// Models
import { SVG_FACE_OPTIONS } from '../../../../models/dice'
import { DEFAULT_SVG } from '../../../../models/svg'

type Props = {}

/**
 * This button resides inside of the SVGMenu accordion. When clicked it goes through the current globalSVG state and
 * finds the next face that doesn't have an svg for it. Once it has found that face, it's sets that face to a blank
 * SVG. The menu will detect that it is no longer null and add it to the list.
 * @constructor
 */
const AddSVGButton: React.FC<Props> = () => {
  const [globalSVG, setGlobalSVG] = useGlobalState('globalSVG')

  const handleAdd = (): void => {
    let next = null
    for (let i = 0; i < SVG_FACE_OPTIONS.length; i++) {
      if (!globalSVG[SVG_FACE_OPTIONS[i]]) {
        next = SVG_FACE_OPTIONS[i]
        break
      }
    }
    if (!next) return
    setGlobalSVG({ ...globalSVG, [next]: DEFAULT_SVG })
  }

  return (
    <Button
      onClick={handleAdd}
      disabled={Object.keys(globalSVG).length === SVG_FACE_OPTIONS.length}
      size="small"
      icon={<PlusOutlined />}>
      Add SVG
    </Button>
  )
}

export default AddSVGButton
