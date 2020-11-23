import React, { useEffect, useState } from 'react'
import { useGlobalState } from '../../modules/global'

// Libraries
import { Geometry } from 'three'

// Models
import { SVGType } from '../../models/svg'

// Utils
import { createSVGGeometry } from '../../utils/createSVGGeometry'

type Props = {
  svg: SVGType
  dieSize: number
}

/**
 * This component renders an SVG geometry based on a passed in svg object. The svg is processed by our custom extrusion
 * function given all the relevant size properties from the global state. That extruded svg three.js geometry is set in
 * the local state and rendered with a <primitive> element.
 * @param svg
 * @param dieSize
 * @constructor
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
