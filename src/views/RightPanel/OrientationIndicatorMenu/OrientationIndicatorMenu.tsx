import React from 'react'
import { Collapse } from 'antd'

// Style
import { Spacer } from '../../style'

// Components
import ValueCheckbox from '../ValueCheckbox/ValueCheckbox'
import ValueSlider from '../ValueSlider/ValueSlider'
import ValueDropdown from '../ValueDropdown/ValueDropdown'

// Models
import { ORIENTATION_INDICATOR_OPTIONS } from '../../../models/orientationIndicator'

const { Panel } = Collapse

type Props = {}

const OrientationIndicatorMenu: React.FC<Props> = () => {
  return (
    <Collapse>
      <Panel key={1} header="Orientation Indicators">
        <ValueDropdown options={ORIENTATION_INDICATOR_OPTIONS} stateKey="orientationIndicator" />
        <Spacer />
        <ValueSlider stateKey="orientationIndicatorSize" label="Size" min={0.1} max={2} step={0.1} />
        <Spacer />
        <ValueCheckbox stateKey="orientationIndicatorOnD6D8" label="Include on D6/D8" />
      </Panel>
    </Collapse>
  )
}

export default OrientationIndicatorMenu
