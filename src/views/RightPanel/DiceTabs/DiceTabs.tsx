import React from 'react'
import { useGlobalState } from '../../../modules/global'

// Style
import { Tabs } from 'antd'
import { isDiceType } from '../../../models/dice'

const { TabPane } = Tabs

type Props = {}

const DiceTabs: React.FC<Props> = () => {
  const [die, setDie] = useGlobalState('die')
  const callback = (key: string): void => {
    if (isDiceType(key)) setDie(key)
  }
  return (
    <Tabs activeKey={die} onChange={callback}>
      <TabPane tab="D4" key="d4">
        D4
      </TabPane>
      <TabPane tab="D6" key="d6">
        D6
      </TabPane>
      <TabPane tab="D8" key="d8">
        D8
      </TabPane>
      <TabPane tab="D10" key="d10">
        D10
      </TabPane>
      <TabPane tab="D100" key="d100">
        D100
      </TabPane>
      <TabPane tab="D12" key="d12">
        D12
      </TabPane>
      <TabPane tab="D20" key="d20">
        D20
      </TabPane>
    </Tabs>
  )
}

export default DiceTabs
