import { Font, TextGeometry, Mesh } from 'three'

export const generateNumberObjects = (sides: number, font: Font): Array<Mesh> => {
  const numbers: Array<Mesh> = []
  for (let i = 1; i < sides + 1; i++) {
    const config = {
      font,
      hAlign: 'center',
      size: 10,
      height: 2,
      curveSegments: 6,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 1,
      bevelSegments: 3,
    }
    const geometry = new TextGeometry(`${i}`, config)
    geometry.center()
    const mesh = new Mesh(geometry)
    switch (i) {
      case 1:
        mesh.position.z += 10
        break
      case 2:
        geometry.rotateY(-1.5708)
        geometry.rotateX(1.5708)
        mesh.position.x -= 10
        break
      case 3:
        geometry.rotateX(-1.5708)
        mesh.position.y += 10
        break
      case 4:
        geometry.rotateX(1.5708)
        mesh.position.y -= 10
        break
      case 5:
        geometry.rotateY(1.5708)
        geometry.rotateX(-1.5708)
        mesh.position.x += 10
        break
      case 6:
        mesh.position.z -= 10
        geometry.rotateZ(3.14159)
        break
    }
    numbers.push(mesh)
  }
  return numbers
}

export const moveGeometryAndMesh = (die: string, mesh: Mesh, face: number, size: number, depth: number): void => {
  mesh.position.x = 0
  mesh.position.y = 0
  mesh.position.z = 0

  mesh.rotation.x = 0
  mesh.rotation.y = 0
  mesh.rotation.z = 0

  if (die !== 'd4') mesh.geometry.center()

  if (die === 'd4') {
    // This is the x y or z offset for the points of intersection between the tetrahedron and an inscribed circle.
    // The value was found by the distance equation for a vector using r of the inscribed circle as a distance, adding
    // the depth/2 to the r.
    const sWithDepth = (2 * size - 3 * depth) / (6 * Math.sqrt(3))

    // This is a right angle minus the angle between the edge and face of a regular tetrahedron
    const edgeFaceAngle = Math.PI / 2 - Math.acos(1 / Math.sqrt(3))

    switch (face) {
      case 1:
        mesh.translateY(sWithDepth).translateX(-sWithDepth).translateZ(sWithDepth)
        mesh
          .rotateY(-Math.PI / 4)
          .rotateX(-edgeFaceAngle)
          .rotateZ(Math.PI)
        break
      case 2:
        mesh.translateY(sWithDepth).translateX(sWithDepth).translateZ(-sWithDepth)
        mesh
          .rotateY((3 * Math.PI) / 4)
          .rotateX(-edgeFaceAngle)
          .rotateZ(Math.PI)
        break
      case 3:
        mesh.translateY(-sWithDepth).translateX(-sWithDepth).translateZ(-sWithDepth)
        mesh.rotateY((-3 * Math.PI) / 4).rotateX(edgeFaceAngle)
        break
      case 4:
        mesh.translateY(-sWithDepth).translateX(sWithDepth).translateZ(sWithDepth)
        mesh.rotateY(Math.PI / 4).rotateX(edgeFaceAngle)
        break
    }
  }

  if (die === 'd6') {
    const offset = size / 2 - depth / 2
    switch (face) {
      case 1:
        mesh.position.z += offset
        break
      case 2:
        mesh.rotation.x = 1.5708
        mesh.rotation.y = -1.5708
        mesh.position.x -= offset
        break
      case 3:
        mesh.rotation.x = -1.5708
        mesh.position.y += offset
        break
      case 4:
        mesh.rotation.x = 1.5708
        mesh.position.y -= offset
        break
      case 5:
        mesh.rotation.x = -1.5708
        mesh.rotation.y = 1.5708

        mesh.position.x += offset
        break
      case 6:
        mesh.rotation.z = 3.14159
        mesh.position.z -= offset
        break
    }
  }

  if (die === 'd8') {
    const dihedral = Math.acos(-1 / 3)
    const facePlaneAngle = Math.PI / 2 - dihedral / 2
    const sWithDepth = (2 * Math.sqrt(3) * size - 3 * depth) / (6 * Math.sqrt(3))
    switch (face) {
      case 1:
        mesh.translateX(sWithDepth).translateY(sWithDepth).translateZ(sWithDepth)
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(-facePlaneAngle)
        break
      case 2:
        mesh.translateX(sWithDepth).translateY(-sWithDepth).translateZ(sWithDepth)
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(facePlaneAngle)
        mesh.rotateZ(Math.PI)
        break
      case 3:
        mesh.translateX(-sWithDepth).translateY(-sWithDepth).translateZ(sWithDepth)
        mesh.rotateY(-Math.PI / 4)
        mesh.rotateX(facePlaneAngle)
        mesh.rotateZ(Math.PI)
        break
      case 4:
        mesh.translateX(-sWithDepth).translateY(sWithDepth).translateZ(sWithDepth)
        mesh.rotateY(-Math.PI / 4)
        mesh.rotateX(-facePlaneAngle)
        break
      case 5:
        mesh.translateX(sWithDepth).translateY(-sWithDepth).translateZ(-sWithDepth)
        mesh.rotateY((3 * Math.PI) / 4)
        mesh.rotateX(facePlaneAngle)
        mesh.rotateZ(Math.PI)
        break
      case 6:
        mesh.translateX(sWithDepth).translateY(sWithDepth).translateZ(-sWithDepth)
        mesh.rotateY((3 * Math.PI) / 4)
        mesh.rotateX(-facePlaneAngle)
        break
      case 7:
        mesh.translateX(-sWithDepth).translateY(sWithDepth).translateZ(-sWithDepth)
        mesh.rotateY((-3 * Math.PI) / 4)
        mesh.rotateX(-facePlaneAngle)
        break
      case 8:
        mesh.translateX(-sWithDepth).translateY(-sWithDepth).translateZ(-sWithDepth)
        mesh.rotateY((-3 * Math.PI) / 4)
        mesh.rotateX(facePlaneAngle)
        mesh.rotateZ(Math.PI)
        break
    }
  }
}
