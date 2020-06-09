import React, { useRef, useEffect } from 'react'
import { useGlobalState } from '../../modules/global'
import { isFaceOption } from '../../models/face'
import { Mesh } from 'three'
import {moveGeometryAndMesh} from "../../utils/numbers";
import SVGGeometry from "../SVGGeometry/SVGGeometry";

type Props = {
  dieNum: number
  faceNum: number
}

const Face: React.FC<Props> = ({ dieNum, faceNum }: Props) => {

  const key = `d${dieNum}f${faceNum}`
  const [face, setFace] = useGlobalState(isFaceOption(key ) ? key : 'd6f1')
  const [font] = useGlobalState('globalFont')
  const [globalSVG] = useGlobalState('globalSVG')

  const meshRef = useRef<Mesh>(null)


  useEffect(() => {
    if (meshRef.current && meshRef.current !== face.ref) {
      setFace({ ...face, ref: meshRef.current })
    }
    if (meshRef.current) moveGeometryAndMesh(meshRef.current,faceNum, 20, 1)
  } )


  if (face.svg) return null  // TODO add check if dieNum === faceNum for max svg, 1 for min svg, and number for numbered svg (global)

  if (globalSVG.max && dieNum === faceNum) {
    return (
    <mesh ref={meshRef}>
      <SVGGeometry svg={globalSVG.max} />
      <meshStandardMaterial attach="material" color={'#bababa'}/>
    </mesh>
  )
  }

  if (!font) return null

  const config = {
    font,
    hAlign: 'center',
    size: 10,
    height: 1.02,
    curveSegments: 6,
    bevelEnabled: false,
    bevelThickness: 0.01,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 8,
  }


  return (
    <mesh ref={meshRef}>
      <textGeometry attach="geometry" args={[face.text, config]} />
      <meshStandardMaterial attach="material" color={'#bababa'}/>
    </mesh>
  )
}

export default Face
