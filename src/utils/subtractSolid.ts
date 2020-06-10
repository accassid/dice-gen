import { Mesh, BoxGeometry } from 'three'
import { getGlobalState } from '../modules/global'
import { isFaceOption } from '../models/face'
import { ThreeBSP } from 'three-js-csg-es6'
import * as THREE from 'three'

// TODO these parameters could probably be fetched directly from the global state
export const subtractSolid = (die: number, size: number): Mesh => {
  let mesh = null

  if (die === 6) mesh = new Mesh(new BoxGeometry(size, size, size))

  if (!mesh) throw new Error(`D${die} has not been programmed into the subtractSolid function.`)

  mesh.position.x = 0
  mesh.position.y = 0
  mesh.position.z = 0

  let meshBSP = new ThreeBSP(mesh)

  for (let i = 1; i <= die; i++) {
    const key = `d${die}f${i}`
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
