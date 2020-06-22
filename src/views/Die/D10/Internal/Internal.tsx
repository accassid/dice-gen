import React from 'react'
import { useGlobalState } from '../../../../modules/global'
import {PT_FACES, PT_VERTICES} from "../../../../models/pentagonalTrapezohedron";
import {DoubleSide} from "three";
import {extend} from "react-three-fiber"
import { PentagonalTrapezohedron } from "../../../../models/pentagonalTrapezohedron";

extend({ PentagonalTrapezohedron })

type Props = {}

const Internal: React.FC<Props> = () => {
  const [diePreview] = useGlobalState('diePreview')
  const [globalSize] = useGlobalState('globalSize')
  return (
    <>
      <mesh position={[0, 0, 0]} scale={[0.999, 0.999, 0.999]}>
        {/*<polyhedronBufferGeometry attach="geometry" args={[PT_VERTICES, PT_FACES, 1]} />*/}
        <pentagonalTrapezohedron attach="geometry"/>
        <meshStandardMaterial transparent attach="material" opacity={diePreview ? 0.6 : 0.95} color={'#515151'} />
      </mesh>
      {/*<mesh position={[0, 0, 0]} scale={[globalSize+.1, globalSize+.1, globalSize+.1]}>*/}
      {/*  <sphereGeometry args={[0.55, 50, 50]} attach="geometry"/>*/}
      {/*  <meshStandardMaterial side={DoubleSide} transparent attach="material" opacity={diePreview ? 0.6 : 0.95} color={'#ff0000'} />*/}
      {/*</mesh>*/}
      </>
  )
}
// 0.688190960
export default Internal
