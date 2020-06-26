/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// https://github.com/webpack-contrib/worker-loader

import {Mesh, BoxGeometry} from "three";
import { ThreeBSP } from 'three-js-csg-es6'

// self.onmessage = ({data}) => {
//   self.postMessage(data);
// };

  self.addEventListener('message', (event) => {
    console.log(event.data)
    const shapeMesh = Object.assign(new Mesh, event.data.shapeMesh)
    console.log(shapeMesh)
  })
  // postMessage(1)
