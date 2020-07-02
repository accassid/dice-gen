import React from 'react'
import { Collapse } from 'antd'

const { Panel } = Collapse

type Props = {}

const SVGMenu: React.FC<Props> = ({}: Props) => {
  return (
    <Collapse>
      <Panel key={1} header="SVGs">
        Stuff
      </Panel>
    </Collapse>
  )
}

export default SVGMenu
