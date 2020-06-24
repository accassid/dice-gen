/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactThreeFiber } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {PentagonalTrapezohedronGeometry} from "./pentagonalTrapezohedron";

/**
 * This type declaration is required to use orbitControls (and any others that we may add) as a intrinsic dom element
 * in jsx. no-unused-vars is disabled because lint doesn't recognize this declaration as using the imports.
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
      pentagonalTrapezohedronGeometry: ReactThreeFiber.Object3DNode<PentagonalTrapezohedronGeometry, typeof PentagonalTrapezohedronGeometry>
    }
  }
}
