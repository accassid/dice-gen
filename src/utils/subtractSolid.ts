import {
  Mesh,
  BoxGeometry,
  TetrahedronGeometry,
  OctahedronGeometry,
  DodecahedronGeometry,
  IcosahedronGeometry,
  Geometry,
} from 'three'
import { getGlobalState, setGlobalState } from '../modules/global'
import { isFaceOption } from '../models/face'
import { ThreeBSP } from 'three-js-csg-es6'
import * as THREE from 'three'
import { PentagonalTrapezohedronGeometry } from '../models/pentagonalTrapezohedron'
import { isDiceOption } from '../models/dice'
import { meshToPassableObject } from '../models/geometryGenerator'

async function setProgress(bar: 'loadingDice' | 'loadingFaces', current: number, max: number) {
  console.log('yo')
  setGlobalState(bar, { current, max })
}

export function subtractSolid(worker: Worker, die?: string): void {
  let mesh = null

  const globalSize = getGlobalState('globalSize')
  if (!die) die = getGlobalState('die')
  const dieScaleKey = die + 'Scale'
  if (!isDiceOption(dieScaleKey)) throw new Error(die + ' does not have state keys for scale.')
  const dieScale = getGlobalState(dieScaleKey)
  const size = globalSize * dieScale

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
  } else if (die === 'd10' || die === 'd100') {
    dieNumber = 10
    mesh = new Mesh(new PentagonalTrapezohedronGeometry(size, getGlobalState('d10Height')))
  } else if (die === 'd12') {
    dieNumber = 12
    mesh = new Mesh(new DodecahedronGeometry(size))
  } else if (die === 'd20') {
    dieNumber = 20
    mesh = new Mesh(new IcosahedronGeometry(size))
  }

  if (!mesh) throw new Error(`D${die} has not been programmed into the subtractSolid function.`)

  mesh.position.x = 0
  mesh.position.y = 0
  mesh.position.z = 0

  // let meshBSP = new ThreeBSP(mesh)

  // const loadingDice = getGlobalState('loadingDice')
  // if (!loadingDice) await setProgress('loadingDice', 1, 1)
  // else await setProgress('loadingDice', loadingDice.current + 1, loadingDice.max)
  const faces = []
  for (let i = 1; i <= dieNumber; i++) {
    // await setProgress('loadingFaces', i, dieNumber)
    let key = `${die}f${i}`
    if (key === 'd10f10') key = 'd10f0'
    if (key === 'd100f10') key = 'd100f0'
    if (!isFaceOption(key)) throw new Error(`Key "${key}" is not a valid die/face combination.`)
    const face = getGlobalState(key)
    const faceMesh = face.ref
    if (!faceMesh || (faceMesh.geometry instanceof Geometry && !faceMesh.geometry.faces.length)) continue
    // const faceBSP = new ThreeBSP(faceMesh)
    // meshBSP = meshBSP.subtract(faceBSP)
    faces.push(meshToPassableObject(face.ref))
  }
  const cloneClass = input => {
    const obj = {}
    for (const key in input) {
      if (typeof input[key] === 'function') continue
      else if (typeof input[key] !== 'object') obj[key] = input[key]
      else obj[key] = cloneClass(input[key])
      // obj[key] = input[key]
    }
    return obj
  }

  worker.postMessage({ shape: meshToPassableObject(mesh), faces })
  // mesh = meshBSP.toMesh()
  // mesh.material = new THREE.MeshStandardMaterial({ color: 0xacacac })
  // return mesh
}
