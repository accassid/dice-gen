import React from 'react'
import { useGlobalState } from '../../../../modules/global'

// Models
import { SVGType } from '../../../../models/svg'
import { SVG_FACE_OPTIONS } from '../../../../models/dice'

// Style
import { Select, Row, Col, InputNumber } from 'antd'
import { DeleteOutlined } from '@ant-design/icons/lib'
import { SVGCard, CornerDiv } from './style'

// Components
import SVGDropzone from '../SVGDropzone/SVGDropzone'

const { Option } = Select

type Props = {
  svg: SVGType
  name: string
}

/**
 * This component is used in the SVGMenu accordion. It renders for any of the faces in the globalSVG state that aren't
 * null. The component contains a select dropdown to change the face of the svg, inputs to change the scale and rotation
 * of the svg (also stored in the globalSVG state), a dropzone to load in an SVG file and finally a delete button in
 * the corner.
 * @param svg
 * @param name
 * @constructor
 */
const SVGEntry: React.FC<Props> = ({ svg, name }: Props) => {
  const [globalSVG, setGlobalSVG] = useGlobalState('globalSVG')

  const handleChange = (value: string): void => {
    const newGlobalState = { ...globalSVG }
    newGlobalState[value] = svg
    delete newGlobalState[name]
    setGlobalSVG(newGlobalState)
  }

  const handleDelete = (): void => {
    const newGlobalState = { ...globalSVG }
    delete newGlobalState[name]
    setGlobalSVG(newGlobalState)
  }

  const handleNumberChange = (value: number, key: 'rotation' | 'scale'): void => {
    setGlobalSVG({
      ...globalSVG,
      [name]: {
        ...globalSVG[name],
        [key]: value,
      },
    })
  }

  return (
    <SVGCard>
      <Row>
        <Col>
          <Select style={{ width: 70 }} value={name} onChange={handleChange}>
            {SVG_FACE_OPTIONS.filter(key => !globalSVG[key]).map(key => (
              <Option key={key} value={key}>
                {key}
              </Option>
            ))}
          </Select>
        </Col>
        <Col>
          <SVGDropzone name={name} />
        </Col>
      </Row>
      <Row>
        <Col span={11}>Scale:</Col>
        <Col span={11}>Rotation:</Col>
      </Row>
      <Row>
        <Col span={11}>
          <InputNumber
            min={0.05}
            max={2}
            step={0.05}
            style={{}}
            value={globalSVG[name].scale}
            onChange={(value: number): void => handleNumberChange(value, 'scale')}
          />
        </Col>
        <Col span={11}>
          <InputNumber
            min={0}
            max={360}
            step={1}
            style={{}}
            value={globalSVG[name].rotation}
            onChange={(value: number): void => handleNumberChange(value, 'rotation')}
          />
        </Col>
      </Row>
      <CornerDiv onClick={handleDelete}>
        <DeleteOutlined />
      </CornerDiv>
    </SVGCard>
  )
}

export default SVGEntry
