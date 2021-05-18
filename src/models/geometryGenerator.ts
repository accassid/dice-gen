import { BoxGeometry, BufferGeometry, Face3, Geometry, Matrix4, Mesh, Vector3 } from 'three'
import { ThreeBSP } from 'three-js-csg-es6'
import { CombinedTextGeometry } from './combinedTextGeometry'
import { MergedGeometry } from './mergedGeometry'

/**
 * This is a custom object that contains necessary data to construct a Three.js geometry. It is passed between the
 * client and web workers as a full class cannot be transmitted.
 */
export type PassableObjectType = {
  vertices: Array<{ x: number; y: number; z: number }>
  faces: Array<{ a: number; b: number; c: number; normal: { x: number; y: number; z: number } }>
  matrix: { elements: Array<number> }
}

/**
 * This class is the base geometry class but with a constructor that takes in our PassableObjectType. It thus can
 * receive geometries back from the web workers and convert them back into a useable three.js Geometry.
 */
export class GeometryGenerator extends Geometry {
  constructor(passableObject: PassableObjectType) {
    super()
    if (!passableObject) return
    const { vertices, faces, matrix } = passableObject
    vertices.forEach(vertex => {
      const vector = new Vector3(vertex.x, vertex.y, vertex.z)
      this.vertices.push(vector)
    })
    faces.forEach(face => {
      this.faces.push(new Face3(face.a, face.b, face.c, new Vector3(face.normal.x, face.normal.y, face.normal.z)))
    })
    const matrixClass = new Matrix4()
    matrixClass.elements = matrix.elements
    this.applyMatrix4(matrixClass)
    this.computeFaceNormals()
    this.computeBoundingSphere()
  }
}

/**
 * This is a helper function to process CombinedTextGeometry. Each of the extrusions must be unioned together as well
 * as any orientation indicators that may exist.
 * @param geometry
 */
const processCombinedTextGeometry = (geometry: CombinedTextGeometry): Geometry => {
  let sum = null
  geometry.extrusions.forEach(extrusion => {
    if (!sum) sum = new ThreeBSP(extrusion)
    else sum = sum.union(new ThreeBSP(extrusion))
  })
  const final = sum.toGeometry()
  if (geometry.orientationIndicator && geometry.orientationIndicator instanceof BoxGeometry) {
    final.center()
    final.merge(geometry.orientationIndicator)
  }
  final.center()
  if (geometry.orientationIndicator && geometry.orientationIndicator instanceof CombinedTextGeometry) {
    sum = null
    geometry.orientationIndicator.extrusions.forEach(extrusion => {
      if (!sum) sum = new ThreeBSP(extrusion)
      else sum = sum.union(new ThreeBSP(extrusion))
    })
    final.merge(sum.toGeometry())
  }
  return final
}

/**
 * This is a helper function to process MergedGeometry. Each of the sub geometries must be unioned together. It is
 * possibly/likely that one of these sub geometries is itself a CombinedTextGeometry and must be processed itself by
 * the other helper function.
 * @param geometry
 */
const processMergedGeometry = (geometry: MergedGeometry): Geometry => {
  let sum = null
  geometry.geometries.forEach(subGeometry => {
    if (subGeometry instanceof CombinedTextGeometry) subGeometry = processCombinedTextGeometry(subGeometry)
    if (!sum) sum = new ThreeBSP(subGeometry)
    else sum = sum.union(new ThreeBSP(subGeometry))
  })
  let output = new Geometry()
  if (sum) output = sum.toGeometry()
  return output
}

/**
 * This function takes in a three.js mesh and converts it into our PassableObjectType so it can be passed into a web
 * worker. There is separate sub processing that needs to be done for CombinedTextGeometry and MergedGeometry so those
 * are passed off to helper functions.
 * @param mesh
 */
export const meshToPassableObject = (
  mesh: Mesh,
): { faces: Array<Face3>; vertices: Array<Vector3>; matrix: Matrix4 } => {
  if (mesh.geometry instanceof BufferGeometry) mesh.geometry = new Geometry().fromBufferGeometry(mesh.geometry)
  mesh.updateMatrix()
  const matrix = mesh.matrix.clone()

  let geometry = mesh.geometry
  if (geometry instanceof CombinedTextGeometry) {
    geometry = processCombinedTextGeometry(geometry)
  } else if (geometry instanceof MergedGeometry) {
    geometry = processMergedGeometry(geometry)
  }
  return {
    vertices: geometry.vertices,
    faces: geometry.faces,
    matrix,
  }
}
