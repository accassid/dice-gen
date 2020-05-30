import React, { useEffect, useMemo, useState } from 'react'
import { BoxGeometry, Mesh, TextGeometry } from 'three'
import * as THREE from 'three'
import { ThreeBSP } from 'three-js-csg-es6'
import { useLoader } from 'react-three-fiber'

/**
 * This takes a font geometry and subtracts it from a box geometry
 */
const Declarative = () => {
  const [myMesh, setMesh] = useState(null)
  // useEffect(() => {
  //   if (!myMesh) {
  //     const bMesh = new Mesh(new BoxGeometry(5, 1, 1))
  //     const cMesh = new Mesh(new CylinderGeometry(0.5, 0.5, 3, 32))
  //     const cBSP = new ThreeBSP(cMesh)
  //     const bBSP = new ThreeBSP(bMesh)
  //     const subMesh = bBSP.subtract(cBSP)
  //     setMesh(subMesh.toMesh())
  //   }
  // });
  const font = useLoader(THREE.FontLoader, '/fonts/Strait_Regular.json')
  const config = useMemo(
    () => ({
      font,
      hAlign: 'center',
      size: 10,
      height: 10,
      curveSegments: 32,
      bevelEnabled: false,
      bevelThickness: 0.5,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font],
  )
  useEffect(() => {
    if (!myMesh) {
      const bMesh = new Mesh(new BoxGeometry(10, 10, 10))
      bMesh.position.z = 0.5
      bMesh.position.y = 0.5
      bMesh.position.x = 0.5
      const tMesh = new Mesh(new TextGeometry('1', config))
      const bBSP = new ThreeBSP(bMesh)
      const tBSP = new ThreeBSP(tMesh)
      const subMesh = bBSP.subtract(tBSP).toMesh()
      // subMesh.material = new THREE.MeshBasicMaterial({color: '#848484'})

      setMesh(subMesh)
    }
  })
  if (!myMesh) return null
  return (
    <group>
      <primitive object={myMesh} position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" color={'#acacac'} />
      </primitive>
    </group>
  )
}

export default Declarative
