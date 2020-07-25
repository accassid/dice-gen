import { ThreeBSP } from 'three-js-csg-es6'
import { GeometryGenerator, meshToPassableObject } from './models/geometryGenerator'

// eslint-disable-next-line no-restricted-globals
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ctx: Worker = self as any

self.addEventListener('message', event => {
  const { shape, faces } = event.data
  if (!shape) throw new Error('Subtraction worker must be passed a shape to subtract from.')
  if (!faces) throw new Error('Subtraction worker must be passed faces to subtract from the shape.')
  const geometry = new GeometryGenerator(shape)

  let bsp = new ThreeBSP(geometry)
  let currentFace = 0
  faces.forEach(face => {
    ctx.postMessage({ current: currentFace, max: faces.length })
    const faceBSP = new ThreeBSP(new GeometryGenerator(face))
    bsp = bsp.subtract(faceBSP)
    currentFace++
  })
  ctx.postMessage({ current: currentFace, max: faces.length })

  const mesh = bsp.toMesh()

  ctx.postMessage({ passableGeometry: meshToPassableObject(mesh) })
})

export default ctx
