import React from 'react'
import { GlobalStateKey, useGlobalState } from '../../modules/global'
import { Row, Col, Input } from 'antd'
type Props = {
  stateKey: GlobalStateKey
  label: string
}

/**
 * This is a generic implementation of the input component that takes in a stateKey from the global state and pulls
 * that value from the global state as well as sets it.
 * @param stateKey
 * @param label
 */

const ValueInput: React.FC<Props> = ({ stateKey, label }: Props) => {
  const [value, setValue] = useGlobalState(stateKey)

  return (
    <>
      <Row>
        <Col span={6}>{label}</Col>
        <Col span={16}>
          <Input value={value} onChange={e => setValue(e.target.value)} />
        </Col>
      </Row>
    </>
  )
}

export default ValueInput
