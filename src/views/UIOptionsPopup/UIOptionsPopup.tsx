import React from 'react'
import { useGlobalState } from '../../modules/global'
import { UIOptionsDialog } from './style'
import ValueSlider from '../Controls/ValueSlider'
import ValueCheckbox from '../Controls/ValueCheckbox'
import { Row, Col } from 'antd'
import { CloseSquareOutlined } from '@ant-design/icons'

type Props = {
  children?: React.ReactNode
}

const UIOptionsPopup: React.FC<Props> = ({ children }: Props) => {
  const [isVisible, setVisibility] = useGlobalState('isUIOptionsPopupVisible')

  const showPopup = () => setVisibility(true)
  const hidePopup = () => setVisibility(false)

  const optionsDialog = isVisible ? (
    <UIOptionsDialog>
      <CloseSquareOutlined
        style={{ float: 'right', zoom: 1.75, position: 'relative', right: '-1px' }}
        onClick={hidePopup}
      />
      <ValueSlider
        stateKey="orbitSpeed"
        min={0.1}
        max={1}
        step={0.1}
        sliderColumns={18}
        spinnerColumns={4}
        label={'Rotation Sensitivity'}></ValueSlider>
      <div style={{ margin: '2px 8px', height: '0.9em', top: '-0.6em', position: 'relative' }}>
        <ValueCheckbox stateKey={'showGrid'} label="Show Grid" />
      </div>
    </UIOptionsDialog>
  ) : (
    <></>
  )

  return (
    <div onContextMenu={showPopup} style={{ height: 'inherit', width: 'inherit}' }}>
      {optionsDialog}
      {children}
    </div>
  )
}

export default UIOptionsPopup
