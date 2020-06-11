import React from 'react'
import { useGlobalState } from '../../modules/global'
import { isFaceOption } from '../../models/face'
import { Mesh } from 'three'
import { moveGeometryAndMesh } from '../../utils/numbers'
import SVGGeometry from '../SVGGeometry/SVGGeometry'
import TextGeometry from '../TextGeometry/TextGeometry'
import { useUpdate } from 'react-three-fiber'

type Props = {
  dieNum: number
  faceNum: number
}

const Face: React.FC<Props> = ({ dieNum, faceNum }: Props) => {
  const key = `d${dieNum}f${faceNum}`
  const [face, setFace] = useGlobalState(isFaceOption(key) ? key : 'd6f1')
  const [font] = useGlobalState('globalFont')
  const [globalSVG] = useGlobalState('globalSVG')
  const [globalSize] = useGlobalState('globalSize')
  const [globalDepth] = useGlobalState('globalDepth')
  const [die] = useGlobalState('die')

  const meshRef = useUpdate<Mesh>(
    self => {
      setFace({ ...face, ref: self })
      moveGeometryAndMesh(die, meshRef.current, faceNum, globalSize, globalDepth)
    },
    [font, globalSVG, globalSize, globalDepth],
  )

  let svg = null
  if (face.svg) svg = face.svg
  else if (globalSVG.max && dieNum === faceNum) svg = globalSVG.max
  else if (globalSVG.min && faceNum === 1) svg = globalSVG.min
  else if (globalSVG[`${faceNum}`]) svg = globalSVG[`${faceNum}`]

  return (
    <mesh ref={meshRef}>
      {svg ? <SVGGeometry svg={svg} /> : <TextGeometry font={font} face={face} />}
      <meshStandardMaterial attach="material" color={'#898989'} />
    </mesh>
  )
}

export default Face
