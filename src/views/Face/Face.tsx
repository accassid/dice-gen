import React, { useEffect } from 'react'
import { useGlobalState, getGlobalState } from '../../modules/global'
import { isFaceOption } from '../../models/face'
import { DoubleSide, Mesh } from 'three'
import { moveGeometryAndMesh } from '../../utils/numbers'
import SVGGeometry from '../SVGGeometry/SVGGeometry'
import TextGeometry from '../TextGeometry/TextGeometry'
import { useUpdate } from 'react-three-fiber'
import D4FaceGeometry from './D4FaceGeometry/D4FaceGeometry'
import { isDiceOption } from '../../models/dice'

type Props = {
  faceNum: number
  dieScale: number
  die: string
}

const Face: React.FC<Props> = ({ faceNum, dieScale, die }: Props) => {
  const key = `${die}f${faceNum}`
  if (!isFaceOption(key)) throw new Error(`${key} is not a valid face key in the global state.`)
  const [face, setFace] = useGlobalState(key)
  const [font] = useGlobalState('globalFont')
  const [globalSVG] = useGlobalState('globalSVG')
  const [globalSize] = useGlobalState('globalSize')
  const [globalDepth] = useGlobalState('globalDepth')
  const [d10Height] = useGlobalState('d10Height')
  const [d100FontVertical] = useGlobalState('d100FontVertical')
  const fontScaleKey = die + 'FontScale'
  if (!isDiceOption(fontScaleKey))
    throw new Error(`${die}FontScale was not fount as a dice option key for the global state`)
  const [dieFontScale] = useGlobalState(fontScaleKey)

  const meshRef = useUpdate<Mesh>(
    self => {
      setFace({ ...getGlobalState()[key], ref: self })
      self.name = ''
    },
    [key],
  )

  useEffect(() => {
    moveGeometryAndMesh(die, meshRef.current, faceNum, globalSize, dieScale, globalDepth, d10Height, d100FontVertical)
    meshRef.current.name = 'rendered'
  }, [font, globalSVG, globalSize, globalDepth, d10Height, die, dieScale, d100FontVertical, meshRef, faceNum])

  let svg = null
  if (face.svg) svg = face.svg
  else if (globalSVG.max && (die === `d${faceNum}` || faceNum === 0)) svg = globalSVG.max
  else if (globalSVG.min && faceNum === 1) svg = globalSVG.min
  else if (globalSVG[`${faceNum}`]) svg = globalSVG[`${faceNum}`]

  return (
    <mesh ref={meshRef}>
      {die === 'd4' ? (
        <D4FaceGeometry font={font} faceNum={faceNum} dieFontScale={dieFontScale} dieScale={dieScale} />
      ) : svg ? (
        <SVGGeometry svg={svg} dieScale={dieScale} />
      ) : (
        <TextGeometry font={font} face={face} dieFontScale={dieFontScale} dieScale={dieScale} />
      )}
      <meshStandardMaterial side={DoubleSide} attach="material" color={'#898989'} />
    </mesh>
  )
}

export default Face
