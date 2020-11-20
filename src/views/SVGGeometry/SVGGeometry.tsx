import React, { useEffect, useState } from 'react'
import { Geometry } from 'three'

// Models
import { SVGType } from '../../models/svg'
import { useGlobalState } from '../../modules/global'
import { createSVGGeometry } from '../../utils/createSVGGeometry'

type Props = {
  svg: SVGType
  dieSize: number
}
/**
 * https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry
 * https://muffinman.io/three-js-extrude-svg-path/
 */
const SVGGeometry: React.FC<Props> = ({ svg, dieSize }: Props) => {
  const [svgGeometry, setGeometry] = useState<Geometry | null>(null)
  const [globalScale] = useGlobalState('globalScale')
  const [globalDepth] = useGlobalState('globalDepth')
  const [die] = useGlobalState('die')

  // const svgData = useLoader(SVGLoader, '/star.svg')

  useEffect(() => {
    if (svg.primitiveMesh) {
      const geometry = createSVGGeometry(svg, globalDepth, globalScale, die, dieSize)
      if (geometry) setGeometry(geometry)
    }
  }, [globalScale, globalDepth, svg, die, dieSize])

  if (!svgGeometry) return <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />

  return <primitive object={svgGeometry} attach="geometry" />
}

export default SVGGeometry
