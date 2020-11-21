import React, { useEffect, useState } from 'react'
import { Font, TextGeometry, TextGeometryParameters, Geometry } from 'three'
import { useGlobalState } from '../../../modules/global'
import { createSVGGeometry } from '../../../utils/createSVGGeometry'

type Props = {
  font: Font | null
  faceNum: number
  dieFontScale: number
  dieSize: number
}

const FACE_MAP: Record<string, [string, string, string]> = {
  '1': ['3', '4', '2'],
  '2': ['1', '2', '4'],
  '3': ['2', '1', '3'],
  '4': ['4', '3', '1'],
}

/**
 * This component renders the geometry for a single face of a D4 meaning three separate extruded symbols. It uses a
 * primitive react-three-fiber element and then generates the three.js object in the useEffect function that will
 * be passed into the primitive.
 * @param font
 * @param faceNum
 * @param dieFontScale
 * @param dieSize
 * @constructor
 */
const D4FaceGeometry: React.FC<Props> = ({ font, faceNum, dieFontScale, dieSize }: Props) => {
  const [geometry, setGeometry] = useState<Geometry>(new Geometry())
  const [globalScale] = useGlobalState('globalScale')
  const [globalFontScale] = useGlobalState('globalFontScale')
  const [globalDepth] = useGlobalState('globalDepth')
  const [globalSVG] = useGlobalState('globalSVG')
  const [d4RadiusScale] = useGlobalState('d4RadiusScale')
  const [d4Size] = useGlobalState('d4Size')

  /**
   * This useEffect responds to the changing of any parameter in the state that would effect the rendering of a D4 face.
   * Depending which face it is, it uses the FACE_MAP const to know which three numbers to render on this particular
   * face. It then creates text geometries or svg geometries for each of those three numbers. Those geometries are then
   * rotated outward into their triangular positions and merged together into a single geometry for the face. That is
   * then set in the local state of this component and used when the primitive object is rendered.
   */
  useEffect(() => {
    let config: null | TextGeometryParameters = null

    if (font)
      config = {
        font,
        size: (globalScale / 2) * globalFontScale * dieSize * dieFontScale,
        height: globalDepth + 0.02,
        curveSegments: 6,
        bevelEnabled: false,
        bevelThickness: 0.01,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 8,
      }
    const numbers = FACE_MAP[`${faceNum}`]
    if (!numbers) return
    const radius = ((globalScale * d4Size) / 2) * d4RadiusScale
    let rotation = 0
    let geometry: Geometry = new Geometry()
    for (let i = 0; i < numbers.length; i++) {
      const text = numbers[i]
      let currentGeometry = new Geometry()

      let svg = globalSVG[text]
      if (text === '4') svg = globalSVG.max ? globalSVG.max : svg
      if (text === '1') svg = globalSVG.min ? globalSVG.min : svg

      if (svg) {
        if (svg.primitiveMesh) currentGeometry = createSVGGeometry(svg, globalDepth, globalScale, 'd4', dieSize)
      } else if (config) currentGeometry = new TextGeometry(text, config)

      currentGeometry.center()
      currentGeometry.translate(0, radius, 0)
      currentGeometry.rotateZ(rotation)

      if (!geometry) geometry = currentGeometry
      else geometry.merge(currentGeometry)

      rotation += (Math.PI * 2) / 3
    }
    if (!geometry) throw new Error('There must be at least one number for the D4 face generator.')

    setGeometry(geometry)
  }, [
    font,
    globalScale,
    globalFontScale,
    globalDepth,
    faceNum,
    globalSVG,
    d4RadiusScale,
    dieFontScale,
    dieSize,
    d4Size,
  ])

  return <primitive object={geometry} attach="geometry" />
}

export default D4FaceGeometry
