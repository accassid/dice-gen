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
        <Row>
          <Col span={23}>
            <ValueSlider
              stateKey="orbitSpeed"
              min={0.01}
              max={1}
              step={0.05}
              label={'Rotation Sensitivity'}></ValueSlider>
          </Col>
          <Col span={1} style={{ verticalAlign: 'top' }}>
            <CloseSquareOutlined style={{ zoom: 2 }} onClick={hidePopup} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <ValueCheckbox stateKey={'showGrid'} label="Show Grid" />
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
