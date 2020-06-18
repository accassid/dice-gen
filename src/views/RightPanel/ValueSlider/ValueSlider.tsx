import React from 'react'
import { GlobalStateKey, useGlobalState } from '../../../modules/global'

// Style
import { Slider, InputNumber, Row, Col } from 'antd'
import { SliderValue } from 'antd/es/slider'
import { Label } from './style'

type Props = {
  stateKey: GlobalStateKey
  label: string
  min: number
  max: number
  step: number
}

const ValueSlider: React.FC<Props> = ({ stateKey, label, min, max, step }: Props) => {
  const [value, setValue] = useGlobalState(stateKey)

  if (typeof value !== 'number')
    throw new Error(`The value from the GlobalState must be of type number. ${stateKey} is of type ${typeof stateKey}`)

  const onChange = (currentValue: SliderValue | number | string | undefined): void => {
    currentValue = Number(currentValue)
    setValue(currentValue)
  }

  return (
    <>
      <Row>
        <Label>{label}</Label>
      </Row>
      <Row>
        <Col span={15}>
          <Slider min={min} max={max} step={step} onChange={onChange} value={value} />
        </Col>
        <Col span={3}>
          <InputNumber min={min} max={max} step={step} style={{ margin: '0 16px' }} value={value} onChange={onChange} />
        </Col>
      </Row>
    </>
  )
}

export default ValueSlider
