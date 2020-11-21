import { BufferGeometry, Face3, Geometry, Matrix4, Mesh, Vector3 } from 'three'

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
 * This function takes in a three.js mesh and converts it into our PassableObjectType so it can be passed into a web
 * worker.
 * @param mesh
 */
export const meshToPassableObject = (
  mesh: Mesh,
): { faces: Array<Face3>; vertices: Array<Vector3>; matrix: Matrix4 } => {
  if (mesh.geometry instanceof BufferGeometry) mesh.geometry = new Geometry().fromBufferGeometry(mesh.geometry)
  mesh.updateMatrix()
  const matrix = mesh.matrix.clone()
  return {
    vertices: mesh.geometry.vertices,
    faces: mesh.geometry.faces,
    matrix,
  }
}
