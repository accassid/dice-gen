import React from 'react'
import { useGlobalState } from '../../../modules/global'

// Style
import { Tabs } from 'antd'
import { SectionContainer } from "../style";

// Models
import { DICE_LIST } from "../../../models/dice";
import {isDiceOption, isDiceType} from '../../../models/dice'

// Components
import ValueSlider from "../ValueSlider/ValueSlider";

const { TabPane } = Tabs

type Props = {}



const DiceTabs: React.FC<Props> = () => {
  const [die, setDie] = useGlobalState('die')
  const callback = (key: string): void => {
    if (isDiceType(key)) setDie(key)
  }
  return (
    <Tabs activeKey={die} onChange={callback}>
      {DICE_LIST.map(die => {
        const scaleKey = die+"Scale"
        const scaleFontKey = die+"FontScale"
        if (!isDiceOption(scaleKey) || !isDiceOption(scaleFontKey)) return null
        const d4RadiusKey = die === 'd4' ? 'd4RadiusScale' : null
        const d10HeightKey = (die === 'd10' || die === 'd100') ? 'd10Height' : null
        return (
          <TabPane tab={die.toUpperCase()} key={die}>
            <SectionContainer>
              <ValueSlider stateKey={scaleKey} label={`${die.toUpperCase()} Scale`} min={.25} max={2} step={.05}/>
              <ValueSlider stateKey={scaleFontKey} label={`${die.toUpperCase()} Font Scale`} min={.25} max={2} step={.05}/>
              {d4RadiusKey && <ValueSlider stateKey={d4RadiusKey} label="D4 Face Radius" min={.25} max={1.5} step={.05}/>}
              {d10HeightKey && <ValueSlider stateKey={d10HeightKey} label="D10 Height" min={.25} max={2} step={.05}/>}
            </SectionContainer>
          </TabPane>
      )})}
    </Tabs>
  )
}

export default DiceTabs
