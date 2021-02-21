import React from 'react'
import { useGlobalState } from '../../modules/global'
import { UIOptionsDialog, ActionButton } from './style'
import ValueSlider from '../Controls/ValueSlider'
import { Row, Col } from 'antd'

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
        <Row>
          <Col span={20}>
            <ValueSlider
              stateKey="orbitSpeed"
              min={0.01}
              max={0.9}
              step={0.05}
              label={'Rotation Sensitivity'}></ValueSlider>
          </Col>
          <Col span={4}>
            <ActionButton rgbColor={'200,200,200'} rgbFontColor={'20,20,120'} onClick={hidePopup} width={'5em'}>
              OK
            </ActionButton>
          </Col>
        </Row>
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
