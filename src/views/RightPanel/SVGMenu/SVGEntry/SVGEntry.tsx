import React from 'react'
import {SVGType} from "../../../../models/svg";
import {useGlobalState} from "../../../../modules/global";
import { Select, Row, Col, InputNumber} from "antd";
import { DeleteOutlined } from "@ant-design/icons/lib";
import {SVG_FACE_OPTIONS} from "../../../../models/dice";
import SVGDropzone from "../SVGDropzone/SVGDropzone";
import { SVGCard, CornerDiv } from "./style";

const { Option } = Select

type Props = {
  svg: SVGType
  name: string
}

const SVGEntry: React.FC<Props> = ({svg, name}: Props) => {

  const [globalSVG, setGlobalSVG] = useGlobalState('globalSVG')

  const handleChange = (value: string): void => {
    const newGlobalState = {...globalSVG}
    newGlobalState[value] = svg
    delete newGlobalState[name]
    setGlobalSVG(newGlobalState)
  }

  const handleDelete = (): void => {
    const newGlobalState = {...globalSVG}
    delete newGlobalState[name]
    setGlobalSVG(newGlobalState)
  }

  const handleNumberChange = (value: number, key: 'rotation' | 'scale'): void => {
    setGlobalSVG({
      ...globalSVG,
      [name]: {
        ...globalSVG[name],
        [key]: value
      }
    })
  }

  return (
    <SVGCard>
      <Row>
        <Col>
        <Select style={{width: 70}} value={name} onChange={handleChange}>
          {SVG_FACE_OPTIONS.filter(key => !globalSVG[key]).map(key => (
            <Option key={key} value={key}>
              {key}
            </Option>
          ))}
        </Select>
        </Col>
        <Col>
          <SVGDropzone name={name}/>
        </Col>
      </Row>
      <Row>
        <Col span={11}>Scale:</Col>
        <Col span={11}>Rotation:</Col>
      </Row>
      <Row>
        <Col span={11}>
        <InputNumber
          min={.05}
          max={2}
          step={.05}
          style={{}}
          value={globalSVG[name].scale}
          onChange={(value: number) => handleNumberChange(value, 'scale')}
        />
        </Col>
        <Col span={11}>
        <InputNumber
          min={0}
          max={360}
          step={1}
          style={{}}
          value={globalSVG[name].rotation}
          onChange={(value: number) => handleNumberChange(value, 'rotation')}
        />
        </Col>
      </Row>
      <CornerDiv onClick={handleDelete}>
        <DeleteOutlined/>
      </CornerDiv>
    </SVGCard>
  )
}

export default SVGEntry
