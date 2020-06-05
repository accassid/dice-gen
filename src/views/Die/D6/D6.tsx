import React, { useState, useEffect } from 'react'
import {BoxGeometry, Mesh} from "three"
import Internal from "./Internal/Internal";
import SubtractedDie from "../SubtractedDie/SubtractedDie"

type Props = {
  size: number
}

const D6: React.FC<Props> = ({ size }: Props) => {

  const [mesh, setMesh] = useState<Mesh | null>(null)

  useEffect(() => {
    if (!mesh) {
      const bMesh = new Mesh(new BoxGeometry(size, size, size))
      bMesh.position.z = 0
      bMesh.position.y = 0
      bMesh.position.x = 0
      setMesh(bMesh)
    }
  },[mesh,size])

  return (
    <>
      {mesh && <SubtractedDie baseMesh={mesh} faces={6} />}
      <Internal size={size}/>
    </>
  )
}

export default D6
