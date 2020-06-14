import { Font, TextGeometry, Mesh, Vector3 } from 'three'

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
  const dihedral = Math.acos(1/3)
  const yAxis = new Vector3(0, 1, 0)
  const xAxis = new Vector3(1,0,0)
  const zAxis = new Vector3(0,0,1)
  const sAxis = new Vector3(Math.sin(dihedral), Math.cos(dihedral), 0) // The vector from the origin to a side parallel with the z axis and 1 unit away
  // mesh.geometry.center()
  mesh.rotation.x = 0
  mesh.rotation.y = 0
  mesh.rotation.z = 0
  if (die === 'd4') {
    const offset = size/(3*Math.sqrt(2)) - depth / 2 +.01
    const radialOffset = size/(Math.PI*Math.sqrt(2)) - depth / 2 +.1 // TODO this offset is not fully functional
    switch (face) {
      case 1:
          mesh.rotation.y = Math.PI/6
          mesh.position.y -= offset
          break
      case 2:
        const rotationAxis2 = new Vector3(-Math.sqrt(3)/2,0,.5)
        const translationAxis2 = new Vector3(-.5,Math.cos(dihedral),-Math.sqrt(3)/2)
        mesh.translateOnAxis(translationAxis2,radialOffset)
        mesh.rotateOnWorldAxis(xAxis, Math.PI)
        mesh.rotateOnWorldAxis(yAxis, (Math.PI / 2))
        mesh.rotateOnWorldAxis(rotationAxis2, Math.acos(1 / 3))
        break
      case 3:
        const rotationAxis3 = new Vector3(Math.sqrt(3)/2,0,.5)
        const translationAxis3 = new Vector3(-.5,Math.cos(dihedral),Math.sqrt(3)/2)
        mesh.translateOnAxis(translationAxis3,radialOffset)
        mesh.rotateOnWorldAxis(xAxis, Math.PI)
        mesh.rotateOnWorldAxis(yAxis, (Math.PI / 2))
        mesh.rotateOnWorldAxis(rotationAxis3, Math.acos(1 / 3))
        break
      case 4:
        const translationAxis4 = new Vector3(Math.sin(dihedral), Math.cos(dihedral), 0) // The vector from the origin to a side parallel with the z axis and 1 unit away
        mesh.translateOnAxis(translationAxis4,offset)
        mesh.rotateOnWorldAxis(xAxis, Math.PI)
        mesh.rotateOnWorldAxis(yAxis, (Math.PI / 2))
        mesh.rotateOnWorldAxis(zAxis, -Math.acos(1 / 3))
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
}
