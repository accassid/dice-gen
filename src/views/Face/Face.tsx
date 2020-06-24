import React from 'react'
import { useGlobalState } from '../../modules/global'
import { isFaceOption } from '../../models/face'
import { DoubleSide, Mesh } from 'three'
import { moveGeometryAndMesh } from '../../utils/numbers'
import SVGGeometry from '../SVGGeometry/SVGGeometry'
import TextGeometry from '../TextGeometry/TextGeometry'
import { useUpdate } from 'react-three-fiber'
import D4FaceGeometry from './D4FaceGeometry/D4FaceGeometry'
import {isDiceOption} from "../../models/dice";

type Props = {
  faceNum: number
  dieScale: number
}

const Face: React.FC<Props> = ({ faceNum, dieScale }: Props) => {
  const [die] = useGlobalState('die')
  const key = `${die}f${faceNum}`
  const [face, setFace] = useGlobalState(isFaceOption(key) ? key : 'd6f1')
  const [font] = useGlobalState('globalFont')
  const [globalSVG] = useGlobalState('globalSVG')
  const [globalSize] = useGlobalState('globalSize')
  const [globalDepth] = useGlobalState('globalDepth')
  const [d10Height] = useGlobalState('d10Height')
  const fontScaleKey = die+'FontScale'
  if (!isDiceOption(fontScaleKey)) throw new Error(`${die}FontScale was not fount as a dice option key for the global state`)
  const [dieFontScale] = useGlobalState(fontScaleKey)

  const meshRef = useUpdate<Mesh>(
    self => {
      setFace({ ...face, ref: self })
      moveGeometryAndMesh(die, self, faceNum, globalSize, dieScale, globalDepth, d10Height)
    },
    [font, globalSVG, globalSize, globalDepth, d10Height, dieFontScale, die, dieScale],
  )

  let svg = null
  if (face.svg) svg = face.svg
  else if (globalSVG.max && (die === `d${faceNum}` || faceNum === 0)) svg = globalSVG.max
  else if (globalSVG.min && faceNum === 1) svg = globalSVG.min
  else if (globalSVG[`${faceNum}`]) svg = globalSVG[`${faceNum}`]

  return (
    <mesh ref={meshRef}>
      {die === 'd4' ? (
        <D4FaceGeometry font={font} faceNum={faceNum} dieFontScale={dieFontScale} dieScale={dieScale}/>
      ) : svg ? (
        <SVGGeometry svg={svg} dieScale={dieScale}/>
      ) : (
        <TextGeometry font={font} face={face} dieFontScale={dieFontScale} dieScale={dieScale}/>
      )}
      <meshStandardMaterial side={DoubleSide} attach="material" color={'#898989'} />
    </mesh>
  )
}

export default Face
