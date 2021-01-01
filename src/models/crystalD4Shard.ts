import { Geometry, Vector3, Face3 } from 'three'

const height = 1
const width = 0.5
const pointHeight = 0.5
/**
 * This is a custom geometry for a Pentagonal Trapezohedron (d10/d100). Vertices are manually generated from standard
 * constants. These standard constants yield a shape that is more elongated than the standard d10. Thus a height scale
 * is passed into the constructor to control the elongation. The variable that scales the entirety of the geometry is
 * the radius.
 */
export class CrystalD4ShardGeometry extends Geometry {
  constructor(width: number, height: number, pointHeight: number) {
    super()

    width = width / 2
    height = height / 2

    this.vertices = [
      new Vector3(-width, height, width), // 0
      new Vector3(-width, height, -width), // 1
      new Vector3(width, height, -width), // 2
      new Vector3(width, height, width), // 3
      new Vector3(width, -height, width), // 4
      new Vector3(-width, -height, width), // 5
      new Vector3(-width, -height, -width), // 6
      new Vector3(width, -height, -width), // 7
      new Vector3(0, -(height + pointHeight), 0), // 8
      new Vector3(0, height + pointHeight, 0), // 9
    ]

    this.faces = [
      new Face3(0, 5, 3),
      new Face3(3, 5, 4),

      new Face3(0, 1, 6),
      new Face3(6, 5, 0),

      new Face3(1, 2, 7),
      new Face3(7, 6, 1),

      new Face3(2, 3, 4),
      new Face3(4, 7, 2),

      new Face3(9, 1, 0),
      new Face3(9, 2, 1),
      new Face3(9, 3, 2),
      new Face3(9, 0, 3),

      new Face3(8, 4, 5),
      new Face3(8, 5, 6),
      new Face3(8, 6, 7),
      new Face3(8, 7, 4),
    ]

    this.computeFaceNormals()
    this.computeBoundingSphere()
  }
}
