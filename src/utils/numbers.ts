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

export const moveGeometryAndMesh = (mesh: Mesh, face: number, size: number, depth: number): void => {
  const geometry = mesh.geometry
  geometry.center()
  mesh.position.x = 0
  mesh.position.y = 0
  mesh.position.z = 0
  const offset = size / 2 - depth / 2
  switch (face) {
    case 1:
      mesh.position.z += offset
      break
    case 2:
      mesh.rotation.x = 1.5708
      mesh.rotation.y = -1.5708
      // geometry.rotateY(-1.5708)
      // geometry.rotateX(1.5708)
      mesh.position.x -= offset
      break
    case 3:
      mesh.rotation.x = -1.5708
      // geometry.rotateX(-1.5708)
      mesh.position.y += offset
      break
    case 4:
      mesh.rotation.x = 1.5708

      // geometry.rotateX(1.5708)
      mesh.position.y -= offset
      break
    case 5:
      mesh.rotation.x = -1.5708
      mesh.rotation.y = 1.5708
      // geometry.rotateY(1.5708)
      // geometry.rotateX(-1.5708)
      mesh.position.x += offset
      break
    case 6:
      mesh.rotation.z = 3.14159
      mesh.position.z -= offset
      // geometry.rotateZ(3.14159)
      break
  }
}
