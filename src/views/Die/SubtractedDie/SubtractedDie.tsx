import React, { useEffect, useState } from 'react'
import { Mesh } from 'three'
import * as THREE from 'three'
import { ThreeBSP } from 'three-js-csg-es6'
import { generateNumberObjects } from '../../../utils/numbers'
import { useGlobalState } from '../../../modules/global'
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader'

type Props = {
  baseMesh: Mesh
  faces: number
}
/**
 * This takes a font geometry and subtracts it from a box geometry
 */
const SubtractedDie: React.FC<Props> = ({ baseMesh, faces }: Props) => {
  const [myMesh, setMesh] = useState(null)
  const [fontUrl] = useGlobalState('fontUrl')
  const [font, setFont] = useState<THREE.Font | null>(null)

  useEffect(() => {
    if (fontUrl) {
      const ttfLoader = new TTFLoader()
      const fontLoader = new THREE.FontLoader()
      ttfLoader.load(fontUrl, fnt => setFont(fontLoader.parse(fnt)))
    }
  }, [fontUrl])

  useEffect(() => {
    if (!font) return
    const meshes = generateNumberObjects(faces, font)

    baseMesh.position.z = 0
    baseMesh.position.y = 0
    baseMesh.position.x = 0

    let subBSP = new ThreeBSP(baseMesh)

    meshes.forEach((numberMesh: Mesh, i: number) => {
      console.log(i)
      const numberBSP = new ThreeBSP(numberMesh)
      subBSP = subBSP.subtract(numberBSP) // Geometry has a merge method which we could try on all the faces and then subtract once
    })
    const subMesh = subBSP.toMesh()
    subMesh.material = new THREE.MeshStandardMaterial({ color: 0xacacac })
    setMesh(subMesh)
  }, [font, baseMesh, faces])

  if (!myMesh) return null
  return (
    <group>
      <primitive object={myMesh}>{/*<meshStandardMaterial attach="material" color={'#acacac'} />*/}</primitive>
    </group>
  )
}

export default SubtractedDie
