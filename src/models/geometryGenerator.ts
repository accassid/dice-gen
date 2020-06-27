import { BufferGeometry, Face3, Geometry, Matrix4, Mesh, Vector3 } from 'three'

export class GeometryGenerator extends Geometry {
  constructor(passableObject) {
    super()
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
