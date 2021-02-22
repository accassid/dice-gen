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

  const includePopup = () =>
    isVisible ? (
      <UIOptionsDialog>
        <CloseSquareOutlined style={{ float: 'right', zoom: 2, position: 'relative' }} onClick={hidePopup} />
        <ValueSlider stateKey="orbitSpeed" min={0.01} max={1} step={0.05} label={'Rotation Sensitivity'}></ValueSlider>
        <ValueCheckbox stateKey={'showGrid'} label="Show Grid" />
      </UIOptionsDialog>
    ) : (
      <></>
    )

  return (
    <div onContextMenu={showPopup} style={{ height: 'inherit', width: 'inherit}' }}>
      {includePopup()}
      {children}
    </div>
  )
}

export default UIOptionsPopup
