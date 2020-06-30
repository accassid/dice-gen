/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

import { ThreeBSP } from 'three-js-csg-es6'
import { GeometryGenerator, meshToPassableObject } from './models/geometryGenerator'

self.addEventListener('message', event => {
  const { shape, faces } = event.data

  const geometry = new GeometryGenerator(shape)

  let bsp = new ThreeBSP(geometry)
  let currentFace = 0
  faces.forEach(face => {
    self.postMessage({current: currentFace, max: faces.length})
    const faceBSP = new ThreeBSP(new GeometryGenerator(face))
    bsp = bsp.subtract(faceBSP)
    currentFace++
  })
  self.postMessage({current: currentFace, max: faces.length})

  const mesh = bsp.toMesh()

  self.postMessage({passableGeometry: meshToPassableObject(mesh)})
})
