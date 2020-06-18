import { Mesh, BoxGeometry, TetrahedronGeometry, OctahedronGeometry } from 'three'
import { getGlobalState } from '../modules/global'
import { isFaceOption } from '../models/face'
import { ThreeBSP } from 'three-js-csg-es6'
import * as THREE from 'three'

export const subtractSolid = (die?: string): Mesh => {
  let mesh = null

  const size = getGlobalState('globalSize')
  if (!die) die = getGlobalState('die')

  let dieNumber = 4

  if (die === 'd4') {
    dieNumber = 4
    mesh = new Mesh(new TetrahedronGeometry(size))
  } else if (die === 'd6') {
    dieNumber = 6
    mesh = new Mesh(new BoxGeometry(size, size, size))
  } else if (die === 'd8') {
    dieNumber = 8
    mesh = new Mesh(new OctahedronGeometry(size))
  }

  if (!mesh) throw new Error(`D${die} has not been programmed into the subtractSolid function.`)

  mesh.position.x = 0
  mesh.position.y = 0
  mesh.position.z = 0

  let meshBSP = new ThreeBSP(mesh)

  for (let i = 1; i <= dieNumber; i++) {
    const key = `d${dieNumber}f${i}`
    if (!isFaceOption(key)) throw new Error(`Key "${key}" is not a valid die/face combination.`)
    const face = getGlobalState(key)
    const faceMesh = face.ref
    if (!faceMesh) continue
    const faceBSP = new ThreeBSP(faceMesh)
    meshBSP = meshBSP.subtract(faceBSP)
  }
  mesh = meshBSP.toMesh()
  mesh.material = new THREE.MeshStandardMaterial({ color: 0xacacac })
  return mesh
}
