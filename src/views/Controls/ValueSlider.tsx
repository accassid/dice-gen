import React from 'react'
import { GlobalStateKey, useGlobalState } from '../../modules/global'

// Style
import { Slider, InputNumber, Row, Col } from 'antd'
import { SliderValue } from 'antd/es/slider'

type Props = {
  stateKey: GlobalStateKey
  label: string
  min: number
  max: number
  step: number
  scale?: number
  sliderColumns?: number
  spinnerColumns?: number
}

/**
 * This is a generic implementation of the slider component that takes in a stateKey from the global state and pulls
 * that value from the global state as well as sets it. It also shows the value in an InputNumber component. Props
 * for these components are passed in with the min, max, and step props. Scale is an option prop that allows the
 * components to display a scaled value in front of the actual backend value. This allows us to show face to face
 * sizes for dice while maintaining the size that three.js wants on the backend.
 * @param stateKey
 * @param label
 * @param min
 * @param max
 * @param step
 * @param scale
 * @constructor
 */
const ValueSlider: React.FC<Props> = ({
  stateKey,
  label,
  min,
  max,
  step,
  scale,
  sliderColumns,
  spinnerColumns,
}: Props) => {
  const [value, setValue] = useGlobalState(stateKey)

  if (typeof value !== 'number')
    throw new Error(`The value from the GlobalState must be of type number. ${stateKey} is of type ${typeof stateKey}`)

  sliderColumns = sliderColumns || 14
  spinnerColumns = spinnerColumns || 3
  const onChange = (currentValue: SliderValue | number | string | undefined): void => {
    currentValue = Number(currentValue)
    setValue(scale ? currentValue * scale : currentValue)
  }

  const scaledValue = scale ? value / scale : value

  return (
    <>
      <Row>
        <h4>{label}</h4>
      </Row>
      <Row>
        <Col span={sliderColumns}>
          <Slider min={min} max={max} step={step} onChange={onChange} value={scaledValue} />
        </Col>
        <Col span={spinnerColumns}>
          <InputNumber
            min={min}
            max={max}
            step={step}
            style={{ margin: '0 16px' }}
            value={scaledValue}
            onChange={onChange}
          />
        </Col>
      </Row>
    </>
  )
}

export default ValueSlider
