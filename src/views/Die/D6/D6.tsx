import React, { useState, useEffect } from 'react'
import { BoxGeometry, Mesh } from 'three'
import Internal from './Internal/Internal'
import SubtractedDie from '../SubtractedDie/SubtractedDie'
import Face from "../../Face/Face";
import {useGlobalState} from "../../../modules/global";

type Props = {
  size: number
}

const SIDES = [1,2,3,4,5,6]
const D6: React.FC<Props> = ({ size }: Props) => {
  const [mesh, setMesh] = useState<Mesh | null>(null)
  const diePreview = useGlobalState('diePreview')[0]
  // useEffect(() => {
  //   if (!mesh) {
  //     const bMesh = new Mesh(new BoxGeometry(size, size, size))
  //     bMesh.position.z = 0
  //     bMesh.position.y = 0
  //     bMesh.position.x = 0
  //     setMesh(bMesh)
  //   }
  // }, [mesh, size])

  return (
    <>
      {/*{mesh && <SubtractedDie baseMesh={mesh} faces={6} />}*/}
      {!diePreview && SIDES.map(side => (
        <Face key={side} dieNum={6} faceNum={side}/>
        ))}
      <Internal size={size} />
    </>
  )
}

export default D6
