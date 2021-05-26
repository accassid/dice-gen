import { Mesh, Vector3, Line3 } from 'three'
import { PentagonalTrapezohedronGeometry } from '../models/pentagonalTrapezohedron'
import { D10_SPINDOWN_MAP, D20_SPINDOWN_MAP } from '../models/spindown'
import { AdjustableOctahedronGeometry } from '../models/adjustableOctahedron'

/**
 * This function does the main work of moving a face (text or svg) to the correct face of the die. It takes in the die
 * and face number to determine the movement. The function also takes in all the relevant size parameters to it knows
 * how far to translate the face. It takes in a mesh as the face that it is positioning. The mesh is mutable so it
 * modifies it directly. Each 3d shape has it's how angles and radius that are calculated on the fly.
 * @param die
 * @param mesh
 * @param face
 * @param scale
 * @param dieSize
 * @param depth
 * @param d10Height
 * @param d100FontVertical
 */
export const moveGeometryAndMesh = (
  die: string,
  mesh: Mesh,
  face: number,
  scale: number,
  dieSize: number,
  depth: number,
  d8Height: number,
  d4ShardBottomPointHeight: number,
  d10Height: number,
  d100FontVertical: number,
  spindown: number,
): void => {
  mesh.position.x = 0
  mesh.position.y = 0
  mesh.position.z = 0

  mesh.rotation.x = 0
  mesh.rotation.y = 0
  mesh.rotation.z = 0

  const extraOffset = 0.01

  const scaledSize = scale * dieSize

  if (die !== 'd4') mesh.geometry.center()

  if (die === 'd2') {
    const offset = scaledSize / 2 - depth / 2
    switch (face) {
      case 1:
        mesh.rotation.x = -Math.PI / 2
        mesh.rotation.z = Math.PI
        mesh.position.y += offset
        break
      case 2:
        mesh.rotation.x = Math.PI / 2
        mesh.position.y -= offset
        break
    }
  }

  if (die === 'd4') {
    // This is the x y or z offset for the points of intersection between the tetrahedron and an inscribed circle.
    // The value was found by the distance equation for a vector using r of the inscribed circle as a distance, adding
    // the depth/2 to the r.
    const sWithDepth = (2 * scaledSize - 3 * depth) / (6 * Math.sqrt(3))

    // This is a right angle minus the angle between the edge and face of a regular tetrahedron
    const edgeFaceAngle = Math.PI / 2 - Math.acos(1 / Math.sqrt(3))

    switch (face) {
      case 1:
        mesh.translateY(sWithDepth).translateX(-sWithDepth).translateZ(sWithDepth)
        mesh
          .rotateY(-Math.PI / 4)
          .rotateX(-edgeFaceAngle)
          .rotateZ(Math.PI)
        break
      case 2:
        mesh.translateY(sWithDepth).translateX(sWithDepth).translateZ(-sWithDepth)
        mesh
          .rotateY((3 * Math.PI) / 4)
          .rotateX(-edgeFaceAngle)
          .rotateZ(Math.PI)
        break
      case 3:
        mesh.translateY(-sWithDepth).translateX(-sWithDepth).translateZ(-sWithDepth)
        mesh.rotateY((-3 * Math.PI) / 4).rotateX(edgeFaceAngle)
        break
      case 4:
        mesh.translateY(-sWithDepth).translateX(sWithDepth).translateZ(sWithDepth)
        mesh.rotateY(Math.PI / 4).rotateX(edgeFaceAngle)
        break
    }
  }

  if (die === 'd4Crystal') {
    const offset = scaledSize / 2 - depth / 2

    switch (face) {
      case 1:
        mesh.position.z += offset
        break
      case 2:
        mesh.rotation.y = Math.PI / 2
        mesh.position.x += offset
        break
      case 3:
        mesh.rotation.y = -Math.PI / 2
        mesh.position.x -= offset
        break
      case 4:
        mesh.rotation.y = Math.PI
        mesh.position.z -= offset
        break
    }
  }

  if (die === 'd4Shard') {
    const adjOG = new AdjustableOctahedronGeometry(scaledSize, d4ShardBottomPointHeight, d4ShardBottomPointHeight)
    const faceAngle = adjOG.getFaceAngle()
    const { radius, midpoint } = adjOG.getMidpointRadius()
    const distance = radius - depth / 2
    switch (face) {
      case 1:
        mesh.rotateX(Math.PI)
        mesh.rotateY(Math.PI / 2)
        mesh.translateOnAxis(midpoint, distance)
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(faceAngle)
        mesh.rotateZ(Math.PI)
        break
      case 2:
        mesh.rotateX(Math.PI)
        mesh.translateOnAxis(midpoint, distance)
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(faceAngle)
        mesh.rotateZ(Math.PI)
        break
      case 3:
        mesh.rotateY(Math.PI)
        mesh.rotateX(Math.PI)
        mesh.translateOnAxis(midpoint, distance)
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(faceAngle)
        mesh.rotateZ(Math.PI)
        break
      case 4:
        mesh.rotateX(Math.PI)
        mesh.rotateY(-Math.PI / 2)
        mesh.translateOnAxis(midpoint, distance)
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(faceAngle)
        mesh.rotateZ(Math.PI)
    }
  }

  if (die === 'd6') {
    const offset = scaledSize / 2 - depth / 2 + extraOffset
    switch (face) {
      case 1:
        mesh.position.z += offset
        break
      case 2:
        mesh.rotation.x = 1.5708
        mesh.rotation.y = -1.5708
        mesh.position.x -= offset
        break
      case 3:
        mesh.rotation.x = -1.5708
        mesh.position.y += offset
        break
      case 4:
        mesh.rotation.x = 1.5708
        mesh.position.y -= offset
        break
      case 5:
        mesh.rotation.x = -1.5708
        mesh.rotation.y = 1.5708

        mesh.position.x += offset
        break
      case 6:
        mesh.rotation.y = Math.PI
        mesh.rotation.z = Math.PI
        mesh.position.z -= offset
        break
    }
  }

  if (die === 'd8') {
    const adjOG = new AdjustableOctahedronGeometry(scaledSize, d8Height)
    const faceAngle = adjOG.getFaceAngle()
    const { radius, midpoint } = adjOG.getMidpointRadius()
    const distance = radius - depth / 2
    switch (face) {
      case 1:
        mesh.translateOnAxis(midpoint, distance)
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(faceAngle)
        break
      case 2:
        mesh.rotateX(Math.PI)
        mesh.rotateY(Math.PI / 2)
        mesh.translateOnAxis(midpoint, distance)
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(faceAngle)
        break
      case 3:
        mesh.rotateY(Math.PI)
        mesh.rotateX(Math.PI)
        mesh.translateOnAxis(midpoint, distance)
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(faceAngle)
        break
      case 4:
        mesh.rotateY(-Math.PI / 2)
        mesh.translateOnAxis(midpoint, distance)
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(faceAngle)
        break
      case 5:
        mesh.rotateX(Math.PI)
        mesh.translateOnAxis(midpoint, distance)
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(faceAngle)
        break

      case 6:
        mesh.rotateY(Math.PI / 2)
        mesh.translateOnAxis(midpoint, distance)
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(faceAngle)
        break
      case 7:
        mesh.rotateY(Math.PI)
        mesh.translateOnAxis(midpoint, distance)
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(faceAngle)
        break
      case 8:
        mesh.rotateX(Math.PI)
        mesh.rotateY(-Math.PI / 2)
        mesh.translateOnAxis(midpoint, distance)
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(faceAngle)
    }
  }

  if (die === 'd10' || die === 'd100') {
    if (spindown) face = D10_SPINDOWN_MAP[`${face}`]
    const pt = new PentagonalTrapezohedronGeometry(scaledSize, d10Height)
    const top = pt.vertices[8]
    const bottom = pt.vertices[10]
    const left = pt.vertices[5]
    const right = pt.vertices[4]
    const adjustedTop = new Vector3()
    adjustedTop.subVectors(top, bottom)
    const faceAngle = adjustedTop.angleTo(new Vector3(-1, 0, 0)) // TODO Could possibly store all these operations in the new Geometry class?
    const horizontal = new Line3(left, right)
    const vertical = new Line3(bottom, top)
    const bottomMid = new Vector3()
    const topMid = new Vector3()
    const verticalMid = new Line3(horizontal.getCenter(bottomMid), vertical.getCenter(topMid))
    let midPoint = new Vector3()
    midPoint = verticalMid.getCenter(midPoint)
    const radius = new Line3(new Vector3(0, 0, 0), midPoint)
    const distance = radius.distance() - depth / 2
    midPoint.normalize()
    bottomMid.normalize()

    const pentaRotation = (2 * Math.PI) / 5
    const pentaOffset = pentaRotation / 2
    switch (face) {
      case 1:
        mesh.translateOnAxis(midPoint, distance)
        mesh.rotateZ(Math.PI / 2 - faceAngle)
        mesh.rotateY(-Math.PI / 2)
        break
      case 2:
        mesh.rotateY(pentaOffset + 3 * pentaRotation)
        mesh.rotateX(Math.PI)
        mesh.translateOnAxis(midPoint, distance)
        mesh.rotateZ(Math.PI / 2 - faceAngle)
        mesh.rotateY(-Math.PI / 2)
        break
      case 3:
        mesh.rotateY(2 * pentaRotation)
        mesh.translateOnAxis(midPoint, distance)
        mesh.rotateZ(Math.PI / 2 - faceAngle)
        mesh.rotateY(-Math.PI / 2)
        break
      case 4:
        mesh.rotateY(pentaOffset)
        mesh.rotateX(Math.PI)
        mesh.translateOnAxis(midPoint, distance)
        mesh.rotateZ(Math.PI / 2 - faceAngle)
        mesh.rotateY(-Math.PI / 2)
        break
      case 5:
        mesh.rotateY(3 * pentaRotation)
        mesh.translateOnAxis(midPoint, distance)
        mesh.rotateZ(Math.PI / 2 - faceAngle)
        mesh.rotateY(-Math.PI / 2)
        break
      case 6:
        mesh.rotateY(pentaOffset + 4 * pentaRotation)
        mesh.rotateX(Math.PI)
        mesh.translateOnAxis(midPoint, distance)
        mesh.rotateZ(Math.PI / 2 - faceAngle)
        mesh.rotateY(-Math.PI / 2)
        break
      case 7:
        mesh.rotateY(pentaRotation)
        mesh.translateOnAxis(midPoint, distance)
        mesh.rotateZ(Math.PI / 2 - faceAngle)
        mesh.rotateY(-Math.PI / 2)
        break
      case 8:
        mesh.rotateY(pentaOffset + 2 * pentaRotation)
        mesh.rotateX(Math.PI)
        mesh.translateOnAxis(midPoint, distance)
        mesh.rotateZ(Math.PI / 2 - faceAngle)
        mesh.rotateY(-Math.PI / 2)
        break
      case 9:
        mesh.rotateY(4 * pentaRotation)
        mesh.translateOnAxis(midPoint, distance)
        mesh.rotateZ(Math.PI / 2 - faceAngle)
        mesh.rotateY(-Math.PI / 2)
        break
      case 0:
        mesh.rotateY(pentaOffset + pentaRotation)
        mesh.rotateX(Math.PI)
        mesh.translateOnAxis(midPoint, distance)
        mesh.rotateZ(Math.PI / 2 - faceAngle)
        mesh.rotateY(-Math.PI / 2)
        break
    }
    if (die === 'd100' && d100FontVertical) mesh.rotateZ(Math.PI / 2)
  }

  if (die === 'd12') {
    const inRadius = scaledSize * (1.11351 / 1.40125) - depth / 2 + 0.01
    const rotationOffset = Math.PI / 6 // Some faces do not line up with the initial rotation of the geometry, this just rotates 30 degrees to reset
    const hexRotation = Math.PI / 3 // One sixth of a rotation around the dodecahedron which when rotating by the inradius lands you on faces
    const pentaOffset = Math.PI / 2 - (2 * Math.PI) / 5 // Some faces start offset in the pentagon, this just rotates by the exterior angle to reset
    const pentaRotation = (2 * Math.PI) / 5 // One fifth of the rotation around the inside of a face (a pentagon)
    const flip = Math.PI
    const correction = 0.03 // For some reason when rotating be the radius six times around the inscribed circle, the rotation gets off by this small amount
    switch (face) {
      case 1:
        mesh.rotateY(rotationOffset + 3 * hexRotation + correction)
        mesh.translateZ(inRadius)
        mesh.rotateZ(-pentaOffset)
        break
      case 2:
        mesh.rotateX(2 * hexRotation + correction)
        mesh.translateZ(inRadius)
        mesh.rotateZ(flip + 2 * pentaRotation)
        break
      case 3:
        mesh.rotateZ(rotationOffset + 3 * hexRotation + correction)
        mesh.translateX(inRadius)
        mesh.rotateX(pentaRotation)
        mesh.rotateY(Math.PI / 2)
        break
      case 4:
        mesh.rotateZ(rotationOffset + 2 * hexRotation - correction)
        mesh.translateX(inRadius)
        mesh.rotateX(flip - pentaRotation)
        mesh.rotateY(Math.PI / 2)
        break
      case 5:
        mesh.rotateX(4 * hexRotation - correction)
        mesh.translateZ(inRadius)
        mesh.rotateZ(3 * pentaRotation)
        break
      case 6:
        mesh.rotateY(rotationOffset + 2 * hexRotation - correction)
        mesh.translateZ(inRadius)
        mesh.rotateZ(pentaOffset + pentaRotation)
        break
      case 7:
        mesh.rotateY(rotationOffset + 5 * hexRotation - correction)
        mesh.translateZ(inRadius)
        mesh.rotateZ(pentaOffset + pentaRotation)
        break
      case 8:
        mesh.rotateX(hexRotation - correction)
        mesh.translateZ(inRadius)
        mesh.rotateZ(2 * pentaRotation)
        break
      case 9:
        mesh.rotateZ(rotationOffset - hexRotation - correction)
        mesh.translateX(inRadius)
        mesh.rotateX(flip + pentaRotation)
        mesh.rotateY(Math.PI / 2)
        break
      case 10:
        mesh.rotateZ(rotationOffset + correction)
        mesh.translateX(inRadius)
        mesh.rotateX(-pentaRotation)
        mesh.rotateY(Math.PI / 2)
        break
      case 11:
        mesh.rotateX(5 * hexRotation + correction)
        mesh.translateZ(inRadius)
        mesh.rotateZ(flip + 3 * pentaRotation)
        break
      case 12:
        mesh.rotateY(rotationOffset + correction)
        mesh.translateZ(inRadius)
        mesh.rotateZ(-pentaOffset)
        break
    }
  }

  if (die === 'd20') {
    if (spindown) face = D20_SPINDOWN_MAP[`${face}`]
    const inRadius = (0.75576 / 0.95105) * scaledSize - depth / 2 + 0.01
    const dihedral = Math.acos(-Math.sqrt(5) / 3)
    const dihedralOffset = Math.PI / 2 - dihedral / 2 // 90 degrees minus half of the dihedral for the vertical faces

    const triOffset = Math.PI / 6 // Used when rotating a number on a face to align it with the equilateral triangle
    const triRotation = (2 * Math.PI) / 3 // Rotate by 60 degrees for rotating a face in the triangle

    const flip = Math.PI

    const estimatedZOffset = dihedral / 2 - 0.025 // This Z rotation seems to align the face for all the faces that require both X and Y rotations
    const estimatedXRotation = Math.PI / 5.1 // This X rotation seems to align the face for all the faces that require both X and Y rotations

    switch (face) {
      case 1:
        mesh.rotateY(Math.PI / 2 - dihedral / 2 + Math.PI)
        mesh.translateZ(inRadius)
        mesh.rotateZ(triOffset + triRotation)
        break
      case 2:
        mesh.rotateY(-dihedralOffset)
        mesh.translateZ(inRadius)
        spindown ? mesh.rotateZ(-triOffset) : mesh.rotateZ(-triOffset + triRotation)
        break
      case 3:
        mesh.rotateY(-Math.PI / 4 + Math.PI)
        mesh.rotateX(estimatedXRotation)
        mesh.translateZ(inRadius)
        spindown
          ? mesh.rotateZ(-estimatedZOffset + Math.PI / 2 - triRotation)
          : mesh.rotateZ(-estimatedZOffset + Math.PI / 2 + triRotation)
        break
      case 4:
        mesh.rotateX(-Math.PI / 2 + dihedralOffset)
        mesh.translateZ(inRadius)
        spindown ? mesh.rotateZ(flip) : mesh.rotateZ(flip - triRotation)
        break
      case 5:
        mesh.rotateY(-Math.PI / 2)
        mesh.rotateX(-dihedralOffset)
        mesh.translateZ(inRadius)
        spindown ? mesh.rotateZ(triRotation) : mesh.rotateZ(-triRotation)
        break
      case 6:
        mesh.rotateY(Math.PI / 2)
        mesh.rotateX(-dihedralOffset)
        mesh.translateZ(inRadius)
        mesh.rotateZ(-triRotation)
        break
      case 7:
        mesh.rotateY(Math.PI / 4 + Math.PI)
        mesh.rotateX(estimatedXRotation)
        mesh.translateZ(inRadius)
        spindown
          ? mesh.rotateZ(estimatedZOffset - Math.PI / 2 + triRotation)
          : mesh.rotateZ(estimatedZOffset - Math.PI / 2 - triRotation)
        break
      case 8:
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(estimatedXRotation)
        mesh.translateZ(inRadius)
        mesh.rotateZ(estimatedZOffset - Math.PI / 2 - triRotation)
        break
      case 9:
        mesh.rotateY(-Math.PI / 4 + Math.PI)
        mesh.rotateX(-estimatedXRotation)
        mesh.translateZ(inRadius)
        mesh.rotateZ(estimatedZOffset + Math.PI / 2 - triRotation)
        break
      case 10:
        mesh.rotateX(Math.PI / 2 - dihedralOffset)
        mesh.translateZ(inRadius)
        !spindown && mesh.rotateZ(triRotation)
        break
      case 11:
        mesh.rotateX(-Math.PI / 2 - dihedralOffset)
        mesh.translateZ(inRadius)
        !spindown && mesh.rotateZ(-triRotation)
        break
      case 12:
        mesh.rotateY(-Math.PI / 4)
        mesh.rotateX(estimatedXRotation)
        mesh.translateZ(inRadius)
        mesh.rotateZ(-estimatedZOffset + Math.PI / 2 + triRotation)
        break
      case 13:
        mesh.rotateY(Math.PI / 4 + Math.PI)
        mesh.rotateX(-estimatedXRotation)
        mesh.translateZ(inRadius)
        mesh.rotateZ(-estimatedZOffset - Math.PI / 2 + triRotation)
        break
      case 14:
        mesh.rotateY(Math.PI / 4)
        mesh.rotateX(-estimatedXRotation)
        mesh.translateZ(inRadius)
        spindown
          ? mesh.rotateZ(-estimatedZOffset - Math.PI / 2 - triRotation)
          : mesh.rotateZ(-estimatedZOffset - Math.PI / 2 + triRotation)
        break
      case 15:
        mesh.rotateY(-Math.PI / 2)
        mesh.rotateX(dihedralOffset)
        mesh.translateZ(inRadius)
        mesh.rotateZ(flip + triRotation)
        break
      case 16:
        mesh.rotateY(Math.PI / 2)
        mesh.rotateX(dihedralOffset)
        mesh.translateZ(inRadius)
        spindown ? mesh.rotateZ(flip - triRotation) : mesh.rotateZ(flip + triRotation)
        break
      case 18:
        mesh.rotateY(-Math.PI / 4)
        mesh.rotateX(-estimatedXRotation)
        mesh.translateZ(inRadius)
        spindown
          ? mesh.rotateZ(estimatedZOffset + Math.PI / 2 + triRotation)
          : mesh.rotateZ(estimatedZOffset + Math.PI / 2 - triRotation)
        break
      case 17:
        mesh.rotateX(-Math.PI / 2 + dihedralOffset + Math.PI)
        mesh.translateZ(inRadius)
        spindown ? mesh.rotateZ(flip) : mesh.rotateZ(flip + triRotation)
        break
      case 19:
        mesh.rotateY(Math.PI / 2 + dihedral / 2)
        mesh.translateZ(inRadius)
        spindown ? mesh.rotateZ(flip + triOffset) : mesh.rotateZ(flip + triOffset - triRotation)
        break
      case 20:
        mesh.rotateY(dihedralOffset)
        mesh.translateZ(inRadius)
        mesh.rotateZ(triOffset)
        break
    }
  }
}
