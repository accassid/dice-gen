import React, { useEffect, useMemo, useState } from 'react'
import { BoxGeometry, Mesh, TextGeometry } from 'three'
import * as THREE from 'three'
import { ThreeBSP } from 'three-js-csg-es6'
import { useLoader } from 'react-three-fiber'
import {generateNumberObjects} from "../../utils/numbers";
import {useGlobalState} from "../../modules/global";
import {TTFLoader} from "three/examples/jsm/loaders/TTFLoader";

/**
 * This takes a font geometry and subtracts it from a box geometry
 */
const Declarative = () => {
  const [myMesh, setMesh] = useState(null)
  const [fontUrl] = useGlobalState('fontUrl')
  const [font, setFont] = useState(null)

  useEffect(() => {
    if (fontUrl) {
      const ttfLoader = new TTFLoader()
      const fontLoader = new THREE.FontLoader()
      ttfLoader.load(fontUrl, fnt => setFont(fontLoader.parse(fnt)))
    }
  }, [fontUrl])

  useEffect(() => {
    if (!font) return
    const meshes = generateNumberObjects(6, font)

    const bMesh = new Mesh(new BoxGeometry(20, 20, 20))
    bMesh.position.z = 0
    bMesh.position.y = 0
    bMesh.position.x = 0
    let subBSP = new ThreeBSP(bMesh)


    meshes.forEach((numberMesh,i) => {
      console.log(i)
      const numberBSP = new ThreeBSP(numberMesh)
      subBSP = subBSP.subtract(numberBSP)
    })
    setMesh(subBSP.toMesh())

  }, [font])

  // TODO try using useref to get a reference to a react like mesh object and then subtract from that (box)

  if (!myMesh) return null
  return (
    <group>

      <primitive object={myMesh} >
        <meshStandardMaterial attach="material" color={'#acacac'} />
      </primitive>

    </group>
  )
}

export default Declarative
