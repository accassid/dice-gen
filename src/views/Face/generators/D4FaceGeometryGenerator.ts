import { Font, Geometry, TextGeometry, TextGeometryParameters } from 'three'
import { createSVGGeometry } from '../../../utils/createSVGGeometry'
import { SVGType } from '../../../models/svg'

const FACE_MAP: Record<string, [string, string, string]> = {
  '1': ['3', '4', '2'],
  '2': ['1', '2', '4'],
  '3': ['2', '1', '3'],
  '4': ['4', '3', '1'],
}

export const d4FaceGeometryGenerator = (
  font: Font,
  globalScale: number,
  globalFontScale: number,
  globalDepth: number,
  faceNum: number,
  globalSVG: Record<string, SVGType>,
  d4RadiusScale: number,
  dieFontScale: number,
  dieSize: number,
  d4Size: number,
  d4FontBottom: number,
): Geometry => {
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

  const radDivisor = d4FontBottom ? 4 : 2
  let rotation = d4FontBottom ? Math.PI : 0
  const radius = ((globalScale * d4Size) / radDivisor) * d4RadiusScale
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

    if (d4FontBottom) currentGeometry.rotateZ(Math.PI)
    currentGeometry.center()
    currentGeometry.translate(0, radius, 0)
    currentGeometry.rotateZ(rotation)

    if (!geometry) geometry = currentGeometry
    else geometry.merge(currentGeometry)

    rotation += (Math.PI * 2) / 3

    if (!geometry) throw new Error('There must be at least one number for the D4 face generator.')
  }
  return geometry
}
