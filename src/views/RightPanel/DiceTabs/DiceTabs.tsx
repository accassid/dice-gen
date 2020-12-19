import React from 'react'
import { useGlobalState } from '../../../modules/global'

// Style
import { Tabs } from 'antd'
import { SectionContainer } from '../style'

// Models
import { DICE_LIST, DIE_SIZE_SCALARS } from '../../../models/dice'
import { isDiceOption, isDiceType } from '../../../models/dice'

// Components
import ValueSlider from '../ValueSlider/ValueSlider'
import ValueCheckbox from '../ValueCheckbox/ValueCheckbox'

const { TabPane } = Tabs

type Props = {}

/**
 * This component renders a tab component that when the tab is changed it changes the currently rendered die in the
 * global state. Within the tab is rendered controls for all dice (size and font scale) and controls that only exist
 * for specific dice (d4RadiusScale, d10Height and d100FontVertical). These controls are handled by the value
 * components.
 * @constructor
 */
const DiceTabs: React.FC<Props> = () => {
  const [die, setDie] = useGlobalState('die')
  const callback = (key: string): void => {
    if (isDiceType(key)) setDie(key)
  }
  return (
    <Tabs activeKey={die} onChange={callback}>
      {DICE_LIST.map(die => {
        const sizeKey = die + 'Size'
        const scaleFontKey = die + 'FontScale'
        if (!isDiceOption(sizeKey) || !isDiceOption(scaleFontKey)) return null
        const d4RadiusKey = die === 'd4' ? 'd4RadiusScale' : null
        const d10HeightKey = die === 'd10' || die === 'd100' ? 'd10Height' : null
        const d100FontVerticalKey = die === 'd100' ? 'd100FontVertical' : null
        const spindownKey = die === 'd20' ? 'd20Spindown' : die === 'd10' ? 'd10Spindown' : null
        return (
          <TabPane tab={die.toUpperCase()} key={die}>
            <SectionContainer>
              <ValueSlider
                stateKey={sizeKey}
                label={`${die.toUpperCase()} Size (mm face to face)`}
                min={1}
                max={50}
                step={1}
                scale={DIE_SIZE_SCALARS[die]}
              />
              <ValueSlider
                stateKey={scaleFontKey}
                label={`${die.toUpperCase()} Font Scale`}
                min={0.25}
                max={2}
                step={0.05}
              />
              {d4RadiusKey && (
                <ValueSlider stateKey={d4RadiusKey} label="D4 Face Radius" min={0.25} max={1.5} step={0.05} />
              )}
              {d10HeightKey && (
                <ValueSlider stateKey={d10HeightKey} label="D10 Height" min={0.25} max={2} step={0.05} />
              )}
              {d100FontVerticalKey && <ValueCheckbox stateKey={d100FontVerticalKey} label="D100 Font Vertical" />}
              {spindownKey && <ValueCheckbox stateKey={spindownKey} label="Spindown" />}
            </SectionContainer>
          </TabPane>
        )
      })}
    </Tabs>
  )
}

export default DiceTabs
