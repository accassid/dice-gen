import React from 'react'
import {GlobalStateKey, useGlobalState} from "../../../modules/global";

// Style
import {Checkbox, Row} from "antd";

import { CheckboxChangeEvent } from "antd/es/checkbox";

type Props = {
  stateKey: GlobalStateKey
  label: string
}

const ValueCheckbox: React.FC<Props> = ({stateKey, label}: Props) => {
  const [value, setValue] = useGlobalState(stateKey)

  if (typeof value !== 'number')
    throw new Error(`The value from the GlobalState must be of type number. ${stateKey} is of type ${typeof stateKey}`)

  const handleChange = (e: CheckboxChangeEvent): void => {
    setValue(e.target.checked ? 1 : 0)
  }

  return (
    <Row>
      <Checkbox checked={!!value} onChange={handleChange}>
        {label}
      </Checkbox>
    </Row>
  )
}

export default ValueCheckbox
