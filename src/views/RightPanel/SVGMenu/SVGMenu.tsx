import React from 'react'
import { useGlobalState } from '../../../modules/global'

// Style
import { Collapse } from 'antd'
import { Spacer } from '../../style'

// Components
import AddSVGButton from './AddSVGButton/AddSVGButton'
import SVGEntry from './SVGEntry/SVGEntry'

const { Panel } = Collapse

type Props = {}

/**
 * This component is an accordion menu that contains submenus for all SVG faces as well as a button to add more SVG
 * faces. It renders all faces from the globalSVG object that are not null.
 * @constructor
 */
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
