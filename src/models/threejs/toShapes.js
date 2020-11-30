/* eslint-disable */
import { ShapeUtils, Shape } from 'three'

/**
 * This function is a customization of the toShapes method on the ShapePath class in three.js. Most of the code here is
 * copied from the original code of the method however a function is added to check if a set of points is in a polygon
 * as well as confirming that every point of a "hole" is in its supposed parent polygon. If it is not, the hole is then
 * treated as a full shape itself. This is to deal with several font where shapes are drawn counterclockwise despite not
 * being a hole.
 * https://github.com/mrdoob/three.js/blob/master/src/extras/core/ShapePath.js
 * @param subPaths
 * @param isCCW
 * @param noHoles
 * @returns {[]|Array}
 */
export function toShapes(subPaths, isCCW, noHoles) {
  function toShapesNoHoles(inSubpaths) {
    const shapes = []

    for (let i = 0, l = inSubpaths.length; i < l; i++) {
      const tmpPath = inSubpaths[i]

      const tmpShape = new Shape()
      tmpShape.curves = tmpPath.curves

      shapes.push(tmpShape)
    }

    return shapes
  }

  function isPointInsidePolygon(inPt, inPolygon) {
    const polyLen = inPolygon.length

    // inPt on polygon contour => immediate success    or
    // toggling of inside/outside at every single! intersection point of an edge
    //  with the horizontal line through inPt, left of inPt
    //  not counting lowerY endpoints of edges and whole edges on that line
    let inside = false
    for (let p = polyLen - 1, q = 0; q < polyLen; p = q++) {
      let edgeLowPt = inPolygon[p]
      let edgeHighPt = inPolygon[q]

      let edgeDx = edgeHighPt.x - edgeLowPt.x
      let edgeDy = edgeHighPt.y - edgeLowPt.y

      if (Math.abs(edgeDy) > Number.EPSILON) {
        // not parallel
        if (edgeDy < 0) {
          edgeLowPt = inPolygon[q]
          edgeDx = -edgeDx
          edgeHighPt = inPolygon[p]
          edgeDy = -edgeDy
        }

        if (inPt.y < edgeLowPt.y || inPt.y > edgeHighPt.y) continue

        if (inPt.y === edgeLowPt.y) {
          if (inPt.x === edgeLowPt.x) return true // inPt is on contour ?
          // continue;				// no intersection or edgeLowPt => doesn't count !!!
        } else {
          const perpEdge = edgeDy * (inPt.x - edgeLowPt.x) - edgeDx * (inPt.y - edgeLowPt.y)
          if (perpEdge === 0) return true // inPt is on contour ?
          if (perpEdge < 0) continue
          inside = !inside // true intersection left of inPt
        }
      } else {
        // parallel or collinear
        if (inPt.y !== edgeLowPt.y) continue // parallel
        // edge lies on the same horizontal line as inPt
        if ((edgeHighPt.x <= inPt.x && inPt.x <= edgeLowPt.x) || (edgeLowPt.x <= inPt.x && inPt.x <= edgeHighPt.x))
          return true // inPt: Point on contour !
        // continue;
      }
    }

    return inside
  }

  /**
   * DICEGEN - This function is simply an extension of isPointInsidePolygon. It instead takes in a list of points and
   * checks that all are inside of the given polygon. It calls the original function for each point in the array.
   * @param points
   * @param polygon
   * @returns {boolean}
   */
  function allPointsInPolygon(points, polygon) {
    for (let i = 0; i < points.length; i++) {
      const point = points[i]
      if (!isPointInsidePolygon(point, polygon)) return false
    }
    return true
  }

  const isClockWise = ShapeUtils.isClockWise

  if (subPaths.length === 0) return []

  if (noHoles === true) return toShapesNoHoles(subPaths)

  let solid, tmpPath, tmpShape
  const shapes = []

  if (subPaths.length === 1) {
    tmpPath = subPaths[0]
    tmpShape = new Shape()
    tmpShape.curves = tmpPath.curves
    shapes.push(tmpShape)
    return shapes
  }

  let holesFirst = !isClockWise(subPaths[0].getPoints())
  holesFirst = isCCW ? !holesFirst : holesFirst

  // console.log("Holes first", holesFirst);

  const betterShapeHoles = []
  const newShapes = []
  let newShapeHoles = []
  let mainIdx = 0
  let tmpPoints

  newShapes[mainIdx] = undefined
  newShapeHoles[mainIdx] = []

  for (let i = 0, l = subPaths.length; i < l; i++) {
    tmpPath = subPaths[i]
    tmpPoints = tmpPath.getPoints()
    solid = isClockWise(tmpPoints)
    solid = isCCW ? !solid : solid

    if (solid) {
      if (!holesFirst && newShapes[mainIdx]) mainIdx++

      newShapes[mainIdx] = { s: new Shape(), p: tmpPoints }
      newShapes[mainIdx].s.curves = tmpPath.curves

      if (holesFirst) mainIdx++
      newShapeHoles[mainIdx] = []

      //console.log('cw', i);
    } else {
      const potentialShape = new Shape() //DICEGEN
      potentialShape.curves = tmpPath.curves //DICEGEN
      newShapeHoles[mainIdx].push({
        h: tmpPath,
        p: tmpPoints[0],
        points: tmpPoints, // DICEGEN - Keep track of all of the hole's points to see if it's actually in a shape
        potentialShape: { s: potentialShape, p: tmpPoints }, //DICEGEN - Keep track of the shape in case it's not a hole
      })

      //console.log('ccw', i);
    }
  }

  // only Holes? -> probably all Shapes with wrong orientation
  if (!newShapes[0]) return toShapesNoHoles(subPaths)

  let ambiguous = false
  const toChange = []

  for (let sIdx = 0, sLen = newShapes.length; sIdx < sLen; sIdx++) {
    betterShapeHoles[sIdx] = []
  }

  for (let sIdx = 0, sLen = newShapes.length; sIdx < sLen; sIdx++) {
    const sho = newShapeHoles[sIdx]

    for (let hIdx = 0; hIdx < sho.length; hIdx++) {
      const ho = sho[hIdx]
      let holeUnassigned = true

      for (let s2Idx = 0; s2Idx < newShapes.length; s2Idx++) {
        // DICEGEN - Only assign a hole if all points are in the polygon
        if (allPointsInPolygon(ho.points, newShapes[s2Idx].p)) {
          if (sIdx !== s2Idx) toChange.push({ froms: sIdx, tos: s2Idx, hole: hIdx })
          if (holeUnassigned) {
            holeUnassigned = false
            betterShapeHoles[s2Idx].push(ho)
          } else {
            ambiguous = true
          }
        }
      }

      // DICEGEN - If the hole is not assigned to a polygon, add it as its own shape rather than a hole
      if (holeUnassigned) {
        toChange.push(ho)
        newShapes.push(ho.potentialShape)
        newShapeHoles.push([])
        betterShapeHoles.push([])
      }
    }
  }
  // console.log("ambiguous: ", ambiguous);
  if (toChange.length > 0) {
    // console.log("to change: ", toChange);
    if (!ambiguous) newShapeHoles = betterShapeHoles
  }

  let tmpHoles

  for (let i = 0, il = newShapes.length; i < il; i++) {
    tmpShape = newShapes[i].s
    shapes.push(tmpShape)
    tmpHoles = newShapeHoles[i]

    for (let j = 0, jl = tmpHoles.length; j < jl; j++) {
      tmpShape.holes.push(tmpHoles[j].h)
    }
  }

  //console.log("shape", shapes);

  return shapes
}
