import { ThreeBSP } from 'three-js-csg-es6'
import { GeometryGenerator, meshToPassableObject } from './models/geometryGenerator'

// eslint-disable-next-line no-restricted-globals, @typescript-eslint/no-explicit-any
export const ctx: Worker = self as any

/**
 * This web worker is used to subtract one geometry from another, specifically a face from a die. It receives a message
 * from the client in the form of a passableGeometry (since web worker messages can't pass classes) and then converts
 * it back into a three.js Geometry. It also receives faces to subtract (that also need to be converted back to a
 * Geometry). It subtracts each face from the die shape and sends a message back to the client about the face progress
 * each time. Finally it sends a message back to the client containing the fully subtracted geometry, converted back
 * into a passable geometry.
 */
// eslint-disable-next-line no-restricted-globals
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
