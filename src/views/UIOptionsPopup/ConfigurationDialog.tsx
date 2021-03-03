import React, { useState } from 'react'
import { UIOptionsDialog } from './style'
import ValueSlider from '../Controls/ValueSlider'
import ValueCheckbox from '../Controls/ValueCheckbox'
import { SettingOutlined } from '@ant-design/icons'

type Props = {
  style?: Record<string, unknown>
}

const ConfigurationDialog: React.FC<Props> = ({ style }: Props) => {
  const [isVisible, setVisibility] = useState(false)

  const togglePopup = () => {
    setVisibility(!isVisible)
  }

  return (
    <>
      <SettingOutlined onClick={togglePopup} style={style}></SettingOutlined>
      {isVisible ? (
        <UIOptionsDialog>
          <h3 style={{ borderBottom: '1px solid #434343' }}>Settings</h3>
          <ValueSlider
            stateKey="orbitSpeed"
            min={0.1}
            max={1}
            step={0.1}
            sliderColumns={17}
            spinnerColumns={4}
            label={'Rotation Sensitivity'}></ValueSlider>
          <div style={{ margin: '2px 8px', height: '0.9em', top: '-0.6em', position: 'relative' }}>
            <ValueCheckbox stateKey={'showGrid'} label="Show Grid" />
          </div>
        </UIOptionsDialog>
      ) : (
        <></>
      )}
    </>
  )
}

export default ConfigurationDialog
