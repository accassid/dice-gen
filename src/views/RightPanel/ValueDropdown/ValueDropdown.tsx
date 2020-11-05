import React from 'react'

import { Select } from 'antd'
import { GlobalStateKey, useGlobalState } from '../../../modules/global'

type Props = {
  options: Array<string>
  stateKey: GlobalStateKey
}

const ValueDropdown: React.FC<Props> = ({ options, stateKey }: Props) => {
  const [value, setValue] = useGlobalState(stateKey)

  const optionMap = options.map(option => ({
    value: option,
    label: option.charAt(0).toUpperCase() + option.slice(1),
  }))

  const handleChange = (value: string): void => setValue(value)

  if (typeof value !== 'string')
    throw new Error(`The value from the GlobalState must be of type string. ${stateKey} is of type ${typeof stateKey}`)

  return <Select value={value} options={optionMap} onChange={handleChange} />
}

export default ValueDropdown
