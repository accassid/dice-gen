import {Geometry, Vector3, Face3} from "three";

const C0 = (Math.sqrt(5) - 1) / 4
const C1 = (1 + Math.sqrt(5)) / 4
const C2 = (3 + Math.sqrt(5)) / 4

const theta = Math.acos((C0-C2)/ Math.sqrt( Math.pow(C0-C2, 2) + 4 * Math.pow(C1, 2))) // This is the angle between one of the diagonal faces (the center vector) and the x axis. Computed by finding angle between two vectors

export class PentagonalTrapezohedronGeometry extends Geometry{
  constructor(radius: number, heightScale: number) {
    super();
    this.vertices = [
      new Vector3(0.0,   C0,   C1), // 0
      new Vector3(0.0,   C0,  -C1), // 1
      new Vector3(0.0,  -C0,   C1), // 2
      new Vector3(0.0,  -C0,  -C1), // 3
      new Vector3(0.5,  0.5,  0.5), // 4
      new Vector3(0.5,  0.5, -0.5), // 5
      new Vector3(-0.5, -0.5,  0.5), // 6
      new Vector3(-0.5, -0.5, -0.5), // 7
      new Vector3(C2,  -C1,  0.0), // 8
      new Vector3(-C2,   C1,  0.0), // 9
      new Vector3(C0,   C1,  0.0), // 10
      new Vector3(-C0,  -C1,  0.0) // 11
    ]
    this.faces = [
      new Face3(8,6,11),
      new Face3(8,2,6),
      new Face3(8, 7,3),
      new Face3(8,11,7),
      new Face3(8,1,5),
      new Face3(8,3,1),
      new Face3(8,10,4), // angle face
      new Face3(8,5,10),
      new Face3(8,0,2),
      new Face3(8,4,0),

      new Face3(9, 4,10),
      new Face3(9,0,4),
      new Face3(9,5,1),
      new Face3(9,10,5),
      new Face3(9,3,7),
      new Face3(9,1,3),
      new Face3(9,11,6),
      new Face3(9,7,11),
      new Face3(9,2,0),
      new Face3(9,6,2),
    ]

    this.computeFaceNormals()
    this.computeBoundingSphere()
    let scale = 1
    if (this.boundingSphere) scale = radius / this.boundingSphere.radius

    this.rotateZ(theta)
    this.scale(scale,scale*heightScale,scale)
  }
}
