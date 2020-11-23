import React from 'react'
import { GlobalStateKey, useGlobalState } from '../../../modules/global'

// Style
import { Select } from 'antd'

type Props = {
  options: Array<string>
  stateKey: GlobalStateKey
}

/**
 * This is a generic implementation of the select component that takes in a stateKey from the global state and pulls
 * that value from the global state as well as sets it. It takes in options as a prop for the Select component.
 * @param options
 * @param stateKey
 * @constructor
 */
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
