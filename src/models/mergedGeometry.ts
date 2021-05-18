import { Geometry } from 'three'

/**
 * This class is essentially a clone of the TextGeometry class from three.js however it allows us to call a custom
 * shape generation function as well as store all the extrusion from every generated shape in an array before merging
 * so that that can be combined with ThreeBSP upon processing. The orientationIndicator geometry can also be stored in
 * this class for the same purpose.
 */
export class MergedGeometry extends Geometry {
  geometries: Array<Geometry>

  constructor(geometries: Array<Geometry>) {
    super()
    this.type = 'MergedGeometry'

    this.geometries = geometries

    geometries.forEach(geometry => {
      this.merge(geometry)
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
    this.geometries.forEach(geometry => {
      geometry.translate(x, y, z)
    })
    return super.translate(x, y, z)
  }
}
