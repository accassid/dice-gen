/* eslint-disable */
import { ShapePath } from 'three'
import { toShapes } from './toShapes'

/**
 * This file is almost entirely copied from three.js from the Font class. The Font class has a generate shapes method
 * that we would like to override to have it use a different toShapes method on ShapePath. Unfortunately the rewrite of
 * the method uses several function in the Font.js file that are not exported meaning that overriding the method with
 * inheritance would require copying the function anyway. Thus, this file creates a generateShapes function that is the
 * same as the method on Font but takes in relevant instance variables as parameters. It calls our custom toShapes
 * function.
 * https://github.com/mrdoob/three.js/blob/master/src/extras/core/Font.js
 */

// No change from three.js
function createPath(char, scale, offsetX, offsetY, data) {
  const glyph = data.glyphs[char] || data.glyphs['?']

  if (!glyph) {
    console.error('THREE.Font: character "' + char + '" does not exists in font family ' + data.familyName + '.')

    return
  }

  const path = new ShapePath()

  let x, y, cpx, cpy, cpx1, cpy1, cpx2, cpy2

  if (glyph.o) {
    const outline = glyph._cachedOutline || (glyph._cachedOutline = glyph.o.split(' '))

    for (let i = 0, l = outline.length; i < l; ) {
      const action = outline[i++]

      switch (action) {
        case 'm': // moveTo
          x = outline[i++] * scale + offsetX
          y = outline[i++] * scale + offsetY

          path.moveTo(x, y)

          break

        case 'l': // lineTo
          x = outline[i++] * scale + offsetX
          y = outline[i++] * scale + offsetY

          path.lineTo(x, y)

          break

        case 'q': // quadraticCurveTo
          cpx = outline[i++] * scale + offsetX
          cpy = outline[i++] * scale + offsetY
          cpx1 = outline[i++] * scale + offsetX
          cpy1 = outline[i++] * scale + offsetY

          path.quadraticCurveTo(cpx1, cpy1, cpx, cpy)

          break

        case 'b': // bezierCurveTo
          cpx = outline[i++] * scale + offsetX
          cpy = outline[i++] * scale + offsetY
          cpx1 = outline[i++] * scale + offsetX
          cpy1 = outline[i++] * scale + offsetY
          cpx2 = outline[i++] * scale + offsetX
          cpy2 = outline[i++] * scale + offsetY

          path.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, cpx, cpy)

          break
      }
    }
  }

  return { offsetX: glyph.ha * scale, path: path }
}

// No change from three.js
function createPaths(text, size, data) {
  const chars = Array.from ? Array.from(text) : String(text).split('') // workaround for IE11, see #13988
  const scale = size / data.resolution
  const lineHeight = (data.boundingBox.yMax - data.boundingBox.yMin + data.underlineThickness) * scale

  const paths = []

  let offsetX = 0,
    offsetY = 0

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i]

    if (char === '\n') {
      offsetX = 0
      offsetY -= lineHeight
    } else {
      const ret = createPath(char, scale, offsetX, offsetY, data)
      offsetX += ret.offsetX
      paths.push(ret.path)
    }
  }

  return paths
}

export function generateShapes(data, text, size = 100) {
  const shapes = []
  const paths = createPaths(text, size, data)

  for (let p = 0, pl = paths.length; p < pl; p++) {
    Array.prototype.push.apply(shapes, toShapes(paths[p].subPaths)) // DICEGEN - Using our custom toShapes function
  }

  return shapes
}
