import { Geometry, ExtrudeGeometry, TextGeometryParameters } from 'three'

import { generateShapes } from './generateShapes'

/**
 * This class is essentially a clone of the TextGeometry class from three.js however it allows us to call a custom
 * shape generation function as well as store all the extrusion from every generated shape in an array before merging
 * so that that can be combined with ThreeBSP upon processing. The orientationIndicator geometry can also be stored in
 * this class for the same purpose.
 */
export class CombinedTextGeometry extends Geometry {
  parameters: {
    text: string
    parameters: TextGeometryParameters
  }

  extrusions: Array<Geometry>
  orientationIndicator?: Geometry

  constructor(text: string, parameters: TextGeometryParameters) {
    super()
    this.type = 'CombinedTextGeometry'

    this.extrusions = []

    const font = parameters.font
    if (!font) {
      console.error('THREE.TextGeometry: font parameter is not an instance of THREE.Font.')
    }

    const shapes = generateShapes(font.data, text, parameters.size)

    this.parameters = {
      text: text,
      parameters: parameters,
    }

    const newParameters = { ...parameters, depth: 0 }

    newParameters.depth = parameters.height !== undefined ? parameters.height : 50

    // defaults

    if (newParameters.bevelThickness === undefined) newParameters.bevelThickness = 10
    if (newParameters.bevelSize === undefined) newParameters.bevelSize = 8
    if (newParameters.bevelEnabled === undefined) newParameters.bevelEnabled = false

    // let sum = null

    shapes.forEach(shape => {
      const extrusion = new ExtrudeGeometry([shape], newParameters)
      this.merge(extrusion)
      this.extrusions.push(extrusion)
    })

    this.mergeVertices()
  }

  /**
   * Since we are maintaining a list of the extrusions for every shape before they are merged into the final Geometry,
   * we need to apply the translate operation to the originals so they're in the same position as the class geometry.
   * @param x
   * @param y
   * @param z
   */
  translate(x: number, y: number, z: number): Geometry {
    this.extrusions.forEach(extrusion => {
      extrusion.translate(x, y, z)
    })
    return super.translate(x, y, z)
  }
}
