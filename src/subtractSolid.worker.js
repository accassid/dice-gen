/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

import { ThreeBSP } from 'three-js-csg-es6'
import { GeometryGenerator, meshToPassableObject } from './models/geometryGenerator'

self.addEventListener('message', event => {
  const { shape, faces } = event.data

  const geometry = new GeometryGenerator(shape)

  let bsp = new ThreeBSP(geometry)

  faces.forEach(face => {
    const faceBSP = new ThreeBSP(new GeometryGenerator(face))
    bsp = bsp.subtract(faceBSP)
  })
  const mesh = bsp.toMesh()

  self.postMessage(meshToPassableObject(mesh))
})
