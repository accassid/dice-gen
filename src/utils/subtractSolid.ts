import {
  Mesh,
  BoxGeometry,
  TetrahedronGeometry,
  OctahedronGeometry,
  DodecahedronGeometry,
  IcosahedronGeometry, Geometry
} from 'three'
import { getGlobalState, setGlobalState } from '../modules/global'
import { isFaceOption } from '../models/face'
import { ThreeBSP } from 'three-js-csg-es6'
import * as THREE from 'three'
import {PentagonalTrapezohedronGeometry} from "../models/pentagonalTrapezohedron";
import {isDiceOption} from "../models/dice";
import { job, start, stop } from 'microjob'

async function setProgress(bar: 'loadingDice' | 'loadingFaces', current: number, max: number) {
  console.log('yo')
  setGlobalState(bar,{current, max})
}

export async function subtractSolid(die?: string): Promise<Mesh> {
  let mesh = null

  const globalSize = getGlobalState('globalSize')
  if (!die) die = getGlobalState('die')
  const dieScaleKey = die+'Scale'
  if (!isDiceOption(dieScaleKey)) throw new Error(die + " does not have state keys for scale.")
  const dieScale = getGlobalState(dieScaleKey)
  const size = globalSize*dieScale

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
  }else if (die === 'd10' || die === 'd100') {
    dieNumber = 10
    mesh = new Mesh(new PentagonalTrapezohedronGeometry(size, getGlobalState('d10Height')))
  }else if (die === 'd12') {
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

  let meshBSP = new ThreeBSP(mesh)

  const loadingDice = getGlobalState('loadingDice')
  if (!loadingDice) await setProgress('loadingDice', 1, 1)
  else await setProgress("loadingDice", loadingDice.current+1,  loadingDice.max)

  for (let i = 1; i <= dieNumber; i++) {
    await setProgress('loadingFaces', i, dieNumber)
    let key = `${die}f${i}`
    if (key === 'd10f10') key = 'd10f0'
    if (key === 'd100f10') key = 'd100f0'
    if (!isFaceOption(key)) throw new Error(`Key "${key}" is not a valid die/face combination.`)
    const face = getGlobalState(key)
    const faceMesh = face.ref
    if (!faceMesh || (faceMesh.geometry instanceof Geometry && !faceMesh.geometry.faces.length)) continue
    const faceBSP = new ThreeBSP(faceMesh)
    meshBSP = meshBSP.subtract(faceBSP)
  }
  mesh = meshBSP.toMesh()
  mesh.material = new THREE.MeshStandardMaterial({ color: 0xacacac })
  return mesh
}

export async function test(): Promise<number> {
  try {
    await start()

    const res = await job(() => {
      let i = 0;
      for (i = 0; i < 1000000; i++) {
        console.log(i)
      }
      return i;
    })

    console.log(res)

    }catch (err) {
      console.error(err);
    } finally {
      // shutdown worker pool
      await stop();
    }
    return 1
}