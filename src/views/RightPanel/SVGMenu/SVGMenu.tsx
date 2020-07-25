import React from 'react'
import { Collapse } from 'antd'
import AddSVGButton from './AddSVGButton/AddSVGButton'
import { useGlobalState } from '../../../modules/global'
import SVGEntry from './SVGEntry/SVGEntry'
import { Spacer } from '../../style'

const { Panel } = Collapse

type Props = {}

const SVGMenu: React.FC<Props> = () => {
  const [globalSVG] = useGlobalState('globalSVG')

  return (
    <Collapse>
      <Panel key={1} header="SVGs">
        {Object.keys(globalSVG)
          .sort()
          .map(key => (
            <SVGEntry svg={globalSVG[key]} name={key} key={key} />
          ))}
        <Spacer />
        <AddSVGButton />
      </Panel>
    </Collapse>
  )
}

export default SVGMenu
