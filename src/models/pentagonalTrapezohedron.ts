import {Geometry, Vector3, Face3, PolyhedronBufferGeometry, Sphere } from "three";
import {Face} from "three/examples/jsm/math/ConvexHull";

const C0 = (Math.sqrt(5) - 1) / 4
const C1 = (1 + Math.sqrt(5)) / 4
const C2 = (3 + Math.sqrt(5)) / 4

// These multiplications in theory normalize the vertices. This is likely done by default in the Polyhedron geometry
// when it is done manually below or passed into the polyhedron, it creates the bend in the face, while a generic
// geometry using the original values has no issue.

// const C0 = 0.30901699 * 0.7639320250533952
// const C1 = 0.80901699 * 0.7639320250533952
// const C2 = 1.30901699 *  0.7639320250533952

const theta = Math.acos((C0-C2)/ Math.sqrt( Math.pow(C0-C2, 2) + 4 * Math.pow(C1, 2))) // This is the angle between one of the diagonal faces (the center vector) and the x axis. Computed by finding angle between two vectors

export const PT_VERTICES = [
  0.0,   C0,   C1, // 0
  0.0,   C0,  -C1, // 1
  0.0,  -C0,   C1, // 2
  0.0,  -C0,  -C1, // 3
  0.5,  0.5,  0.5, // 4
  0.5,  0.5, -0.5, // 5
  -0.5, -0.5,  0.5, // 6
  -0.5, -0.5, -0.5, // 7
  C2,  -C1,  0.0, // 8
  -C2,   C1,  0.0, // 9
  C0,   C1,  0.0, // 10
  -C0,  -C1,  0.0 // 11
]

// export const PT_VERTICES = [
//   new Vector3(0.0,   C0,   C1),
//   new Vector3(0.0,   C0,  -C1),
//   new Vector3(0.0,  -C0,   C1),
//   new Vector3(0.0,  -C0,  -C1),
//   new Vector3(0.5,  0.5,  0.5),
//   new Vector3(0.5,  0.5, -0.5),
//   new Vector3(-0.5, -0.5,  0.5),
//   new Vector3(-0.5, -0.5, -0.5),
//   new Vector3(C2,  -C1,  0.0),
//   new Vector3(-C2,   C1,  0.0),
//   new Vector3(C0,   C1,  0.0),
//   new Vector3(-C0,  -C1,  0.0)
// ]

export const PT_FACES = [
  8,  2,  6,
  8, 6, 11
  // // 11 ,  6,  2,  8,
  // 11, 6, 8,
  // 6, 2, 11,
  //
  // // 3 ,  7, 11,  8,
  // 3, 7, 8,
  // 7, 11, 8,
  //
  // // 5 ,  1,  3,  8,
  // 5, 1, 8,
  // 1, 3, 8,
  //
  // // 4 , 10,  5,  8,
  // 4, 10, 8,
  // 10, 5, 8,
  //
  // // 2 ,  0,  4,  8,
  // 2, 0, 8,
  // 0, 4, 8,
  // 10 ,  4,  0,  9,
  // 1 ,  5, 10,  9,
  // 7 ,  3,  1,  9,
  // 6 , 11,  7,  9,
  // 0 ,  2,  6,  9
]

export const TEST_VERTICES = [
  -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
  -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
]

export const TEST_FACES = [
  2,1,0,    0,3,2,
  0,4,7,    7,3,0,
  0,1,5,    5,4,0,
  1,2,6,    6,5,1,
  2,3,7,    7,6,2,
  4,5,6,    6,7,4
]

export class PentagonalTrapezohedron extends Geometry{
  constructor(radius: number) {
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
  //   for (let i = 0, b = 0; i < 10; ++i, b += Math.PI * 2 / 10) {
  //     this.vertices.push(new Vector3(Math.cos(b), Math.sin(b), 0.105 * (i % 2 ? 1 : -1)))
  //   }
  //   this.vertices.push(new Vector3(0, 0, -1))
  //   this.vertices.push(new Vector3(0, 0, 1))
  //
  //   this.faces = [
  //     new Face3(5,7,11),
  //     new Face3(7,11,0),
  //   ]
  //   this.computeVertexNormals()
  //   this.computeBoundingSphere()
    this.computeFaceNormals()
    // this.boundingSphere = new Sphere(new Vector3(), 20)
    this.rotateZ(theta)
    this.scale(20,12,20)
  }
}
