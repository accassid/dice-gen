import React, { useEffect, useState } from 'react'
import { useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import { Mesh } from 'three'
import { BoxGeometry } from 'three'
import { ThreeBSP } from 'three-js-csg-es6'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { useGlobalState } from '../../modules/global'

/**
 * https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry
 * https://muffinman.io/three-js-extrude-svg-path/
 */
const SVGTest = () => {
  const [myMesh, setMesh] = useState(null)
  const [svgData, setData] = useState(null)

  const [file, setFile] = useGlobalState('svgFile')

  useEffect(() => {
    if (file) {
      const loader = new SVGLoader()
      loader.load(URL.createObjectURL(file), data => setData(data))
    }
  }, [file])

  // const svgData = useLoader(SVGLoader, '/star.svg')

  useEffect(() => {
    if (svgData) {
      const svgGroup = new THREE.Group()

      let sMesh = null

      const material = new THREE.MeshNormalMaterial()
      svgData.paths.forEach((path, i) => {
        const shapes = path.toShapes(true)

        // Each path has array of shapes
        shapes.forEach((shape, j) => {
          // Finally we can take each shape and extrude it
          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 2,
            bevelEnabled: false,
          })
          geometry.center()
          const scale = 7 / geometry.boundingBox.max.y // TODO Check if x is outside of the bounds as well
          geometry.scale(scale, scale, 1)

          geometry.rotateZ(3.14159)

          // geometry.translate(1, 1, 1)
          // Create a mesh and add it to the group
          const mesh = new THREE.Mesh(geometry, material)

          mesh.position.z -= 10

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
      setMesh(sMesh)
    }
  }, [svgData])
  if (!myMesh) return null

  return (
    <group>
      <primitive object={myMesh}>
        <meshStandardMaterial attach="material" color={'#acacac'} />
      </primitive>
    </group>
  )
}

export default SVGTest
