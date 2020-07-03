import React from 'react'
import { Collapse } from 'antd'
import AddSVGButton from "./AddSVGButton/AddSVGButton";
import {useGlobalState} from "../../../modules/global";
import SVGEntry from "./SVGEntry/SVGEntry";

const { Panel } = Collapse

type Props = {}

const SVGMenu: React.FC<Props> = ({}: Props) => {

  const [globalSVG] = useGlobalState('globalSVG')

  console.log(globalSVG)

  return (
    <Collapse>
      <Panel key={1} header="SVGs">
        {Object.keys(globalSVG).map(key => (
          <SVGEntry svg={globalSVG[key]} name={key} key={key}/>
        ))}
        <AddSVGButton/>
      </Panel>
    </Collapse>
  )
}

export default SVGMenu
