import { Line3, Vector3, OctahedronGeometry } from 'three'

export class AdjustableOctahedronGeometry extends OctahedronGeometry {
  constructor(radius = 1, topheight = 1, bottomheight = 1, detail = 0) {
    super(radius, detail)
    this.vertices[0].y = this.vertices[0].y * topheight
    this.vertices[3].y = this.vertices[3].y * bottomheight
  }

  getFaceAngle(): number {
    const left = this.vertices[2]
    const right = this.vertices[1]
    const top = this.vertices[0]
    const baseLine = new Line3(left, right)
    let baseMidpoint = new Vector3()
    baseMidpoint = baseLine.getCenter(baseMidpoint)
    let faceLine = new Vector3()
    faceLine = faceLine.subVectors(baseMidpoint, top)
    baseMidpoint.negate()
    const faceAngle = faceLine.angleTo(baseMidpoint)
    return Math.PI / 2 - faceAngle
  }

  getMidpointRadius(): { radius: number; midpoint: Vector3 } {
    const left = this.vertices[2]
    const right = this.vertices[1]
    const top = this.vertices[0]

    const xAverage = (left.x + right.x + top.x) / 3
    const yAverage = (left.y + right.y + top.y) / 3
    const zAverage = (left.z + right.z + top.z) / 3

    const centroid = new Vector3(xAverage, yAverage, zAverage)

    const radius = new Line3(new Vector3(0, 0, 0), centroid).distance()

    centroid.normalize()

    return {
      radius,
      midpoint: centroid,
    }
  }
}
