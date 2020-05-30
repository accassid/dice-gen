import React, { useEffect, useState } from 'react'
import { useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import { Mesh } from 'three'
import { BoxGeometry } from 'three'
import { ThreeBSP } from 'three-js-csg-es6'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

/**
 * https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry
 * https://muffinman.io/three-js-extrude-svg-path/
 */
const SVGTest = () => {
  const [myMesh, setMesh] = useState(null)

  const svgData = useLoader(SVGLoader, '/star.svg')

  useEffect(() => {
    if (!myMesh) {
      const svgGroup = new THREE.Group()

      let sMesh = null

      const material = new THREE.MeshNormalMaterial()
      svgData.paths.forEach((path, i) => {
        const shapes = path.toShapes(true)

        // Each path has array of shapes
        shapes.forEach((shape, j) => {
          // Finally we can take each shape and extrude it
          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 100,
            bevelEnabled: false,
          })
          geometry.scale(0.02, 0.02, 0.02)
          geometry.center()
          geometry.translate(1, 1, 1)
          // Create a mesh and add it to the group
          const mesh = new THREE.Mesh(geometry, material)

          sMesh = mesh

          svgGroup.add(mesh)
        })
      })
      const bMesh = new Mesh(new BoxGeometry(6, 6, 2))
      bMesh.position.z = 1
      bMesh.position.y = 1
      bMesh.position.x = 1
      const bBSP = new ThreeBSP(bMesh)
      const sBSP = new ThreeBSP(sMesh)
      const subBSP = bBSP.subtract(sBSP)
      setMesh(subBSP.toMesh())
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

export default SVGTest
