import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { Geometry } from 'three'
import { SVGLoader, SVGResult } from 'three/examples/jsm/loaders/SVGLoader'

// Models
import { SVGType } from '../../models/svg'
import {useGlobalState} from "../../modules/global";

type Props = {
  svg: SVGType
}
/**
 * https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry
 * https://muffinman.io/three-js-extrude-svg-path/
 */
const SVGGeometry: React.FC<Props> = ({ svg }: Props) => {
  const [svgGeometry, setGeometry] = useState<Geometry | null>(null)
  const [svgData, setData] = useState<SVGResult | null>(null)
  const [globalSize] = useGlobalState('globalSize')
  const [globalDepth] = useGlobalState('globalDepth')

  useEffect(() => {
    if (svg) {
      const loader = new SVGLoader()
      loader.load(URL.createObjectURL(svg.file), data => setData(data))
    }
  }, [svg])

  // const svgData = useLoader(SVGLoader, '/star.svg')

  useEffect(() => {
    if (svgData) {
      let geometry: THREE.ExtrudeGeometry | null = null

      for (let i = 0; i < svgData.paths.length; i++) {
        const path = svgData.paths[i]
        const shapes = path.toShapes(true, false)
        for (let j = 0; j < shapes.length; j++) {
          const shape = shapes[j]
          const partialGeometry = new THREE.ExtrudeGeometry(shape, {
            depth: globalDepth,
            bevelEnabled: false,
          })
          if (!geometry) geometry = partialGeometry
          else geometry.merge(partialGeometry)
        }
      }

      if (geometry) {
        geometry.center()
        let scale = 1
        if (geometry.boundingBox) {
          const targetMax = globalSize*svg.scale/2
          if (geometry.boundingBox.max.x > geometry.boundingBox.max.y) scale = targetMax / geometry.boundingBox.max.x
          else scale = targetMax / geometry.boundingBox.max.y
        }
        geometry.scale(scale, scale, 1)

        setGeometry(geometry)
      }
    }
  }, [svgData, globalSize, globalDepth, svg.scale])

  if (!svgGeometry) return <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />

  return <primitive object={svgGeometry} attach="geometry" />
}

export default SVGGeometry
