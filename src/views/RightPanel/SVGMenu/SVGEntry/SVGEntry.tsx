import React from 'react'
import {SVGType} from "../../../../models/svg";
import {useGlobalState} from "../../../../modules/global";
import { Card, Select, Row, Col } from "antd";
import {SVG_FACE_OPTIONS} from "../../../../models/dice";
import SVGDropzone from "../../../SVGDropzone/SVGDropzone";

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
  return (
    <Card>
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
    </Card>
  )
}

export default SVGEntry
