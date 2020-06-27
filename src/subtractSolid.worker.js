/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// https://github.com/webpack-contrib/worker-loader

import { Mesh, BoxGeometry, Geometry, Matrix4 } from 'three'
import { ThreeBSP } from 'three-js-csg-es6'
import { GeometryGenerator, meshToPassableObject } from './models/geometryGenerator'

// self.onmessage = ({data}) => {
//   self.postMessage(data);
// };

self.addEventListener('message', event => {
  console.log(event.data)
  // const geometry = Object.assign(new Geometry, event.data.geometry)
  // console.log(geometry)
  // const matrix = new Matrix4()
  // matrix.set(event.data.matrix)
  // const mesh = new Mesh(geometry)
  // // mesh.applyMatrix4(matrix)
  // const bsp = new ThreeBSP(geometry)
  // console.log(geometry)
  const { shape, faces } = event.data

  const geometry = new GeometryGenerator(shape)

  let bsp = new ThreeBSP(geometry)

  faces.forEach(face => {
    const faceBSP = new ThreeBSP(new GeometryGenerator(face))
    bsp = bsp.subtract(faceBSP)
  })
  const mesh = bsp.toMesh()

  // let bsp = new ThreeBSP(new BoxGeometry((10,10,10)))
  // // event.data.bsp.geometry = Object.assign(new Geometry, event.data.bsp.geometry)
  // bsp = Object.assign(bsp, event.data.bsp)
  self.postMessage(meshToPassableObject(mesh))
})
// postMessage(1)
