import React from 'react'

// Style
import { Spacer } from '../../style'
import { Collapse } from 'antd'

// Components
import ValueCheckbox from '../../Controls/ValueCheckbox'
import ValueSlider from '../../Controls/ValueSlider'
import ValueDropdown from '../ValueDropdown/ValueDropdown'

// Models
import { ORIENTATION_INDICATOR_OPTIONS } from '../../../models/orientationIndicator'

const { Panel } = Collapse

type Props = {}

/**
 * This accordion menu exists in the right panel's global settings. It allows the user to modify global state settings
 * for the orientation indicators on 6s and 9s including their type, size, spacing and if they should be included on
 * D6s and D8s.
 * @constructor
 */
const OrientationIndicatorMenu: React.FC<Props> = () => {
  return (
    <Collapse>
      <Panel key={1} header="Orientation Indicators">
        <ValueDropdown options={ORIENTATION_INDICATOR_OPTIONS} stateKey="orientationIndicator" />
        <Spacer />
        <ValueSlider stateKey="orientationIndicatorSize" label="Size" min={0.1} max={2} step={0.1} />
        <ValueSlider stateKey="orientationIndicatorSpace" label="Space" min={0.1} max={3} step={0.1} />
        <Spacer />
        <ValueCheckbox stateKey="orientationIndicatorOnD6D8" label="Include on D6/D8" />
      </Panel>
    </Collapse>
  )
}

export default OrientationIndicatorMenu
