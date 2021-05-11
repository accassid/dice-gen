import React, {useEffect, useState} from 'react'
import { useGlobalState, getGlobalState } from '../../modules/global'

// Models
import { isFaceOption } from '../../models/face'
import { isDiceOption } from '../../models/dice'

// Libraries
import {DoubleSide, Geometry, Mesh, TextGeometryParameters} from 'three'
import { useUpdate } from 'react-three-fiber'
import { ThreeBSP } from 'three-js-csg-es6'

// Utils
import { moveGeometryAndMesh } from '../../utils/numbers'

// Components
import SVGGeometry from '../SVGGeometry/SVGGeometry'
import TextGeometry from '../TextGeometry/TextGeometry'
import D4FaceGeometry from './D4FaceGeometry/D4FaceGeometry'
import {createSVGGeometry} from "../../utils/createSVGGeometry";
import {d4FaceGeometryGenerator} from "./D4FaceGeometry/D4FaceGeometryGenerator";
import {svgGeometryGenerator} from "../SVGGeometry/SVGGeometryGenerator";
import {textGeometryGenerator} from "../TextGeometry/TextGeometryGenerator";
import {MergedGeometry} from "../../models/mergedGeometry";

type Props = {
  faceNum: number
  dieSize: number
  die: string
}

/**
 * This component renders a single face of a die. This can be a mesh of either a TextGeometry, SVGGeometry or
 * D4FaceGeometry. It checks the global state to see if the current face has an SVG set for it. The useEffect function
 * moves and rotates the face into the proper position along the face of the 3d shape of the die.
 * @param faceNum
 * @param dieSize
 * @param die
 * @constructor
 */
const Face: React.FC<Props> = ({ faceNum, dieSize, die }: Props) => {
  const key = `${die}f${faceNum}`
  if (!isFaceOption(key)) throw new Error(`${key} is not a valid face key in the global state.`)
  const [face, setFace] = useGlobalState(key)
  const [font] = useGlobalState('globalFont')
  const [globalSVG] = useGlobalState('globalSVG')
  const [globalScale] = useGlobalState('globalScale')
  const [globalDepth] = useGlobalState('globalDepth')
  const [d8Height] = useGlobalState('d8Height')
  const [d10Height] = useGlobalState('d10Height')
  const [d100FontVertical] = useGlobalState('d100FontVertical')
  const [d4FontBottom] = useGlobalState('d4FontBottom')
  const fontScaleKey = die + 'FontScale'
  if (!isDiceOption(fontScaleKey))
    throw new Error(`${die}FontScale was not fount as a dice option key for the global state`)
  const [dieFontScale] = useGlobalState(fontScaleKey)
  const [d10Spindown] = useGlobalState('d10Spindown')
  const [d20Spindown] = useGlobalState('d20Spindown')
  const [geometry, setGeometry] = useState<Geometry>(new Geometry())
  const [globalFontScale] = useGlobalState('globalFontScale')
  const [d4RadiusScale] = useGlobalState('d4RadiusScale')
  const [d4Size] = useGlobalState('d4Size')
  const [d2Radius] = useGlobalState('d2Radius')
  const [orientationIndicator] = useGlobalState('orientationIndicator')
  const [orientationIndicatorSize] = useGlobalState('orientationIndicatorSize')
  const [orientationIndicatorSpace] = useGlobalState('orientationIndicatorSpace')
  const [orientationIndicatorOnD8D6] = useGlobalState('orientationIndicatorOnD6D8')


  const spindown = die === 'd10' ? d10Spindown : die === 'd20' ? d20Spindown : 0

  const meshRef = useUpdate<Mesh>(
    self => {
      setFace({ ...getGlobalState()[key], ref: self })
      self.name = ''
    },
    [key],
  )

  /**
   * This function triggers when any properties in state are changed that would change the position of a face. It calls
   * the moveGeometryAndMesh function with these properties and modifies the mesh object of this component (via a ref)
   * directly without needing a component rerender.
   */
  useEffect(() => {
    moveGeometryAndMesh(
      die,
      meshRef.current,
      faceNum,
      globalScale,
      dieSize,
      globalDepth,
      d8Height,
      d10Height,
      d100FontVertical,
      spindown,
    )
    meshRef.current.name = 'rendered'
  }, [
    font,
    globalSVG,
    globalScale,
    globalDepth,
    d8Height,
    d10Height,
    die,
    dieSize,
    d100FontVertical,
    meshRef,
    faceNum,
    spindown,
    d4FontBottom,
  ])


  useEffect(() => {
    let svg = null
    if (die === 'd4') {svg = globalSVG[`d4 face ${faceNum}`]; console.log('hello')}
    else if (face.svg) svg = face.svg
    else if (globalSVG.max && (die === `d${faceNum}` || faceNum === 0 || die === `d${faceNum}Crystal`))
      svg = globalSVG.max
    else if (globalSVG.min && faceNum === 1) svg = globalSVG.min
    else if (globalSVG[`${faceNum}`]) svg = globalSVG[`${faceNum}`]

    let dieSvg = null
    if (globalSVG[die]) dieSvg = globalSVG[die]



    let geometry = null

    if (svg) geometry = svgGeometryGenerator(globalScale,globalDepth,svg, die, dieSize, d2Radius)
    else if (dieSvg) geometry = svgGeometryGenerator(globalScale,globalDepth,dieSvg, die, dieSize, d2Radius)
    else if (die === 'd4') geometry = d4FaceGeometryGenerator(font, globalScale, globalFontScale, globalDepth, faceNum, globalSVG, d4RadiusScale, dieFontScale, dieSize, d4Size, d4FontBottom)
    else geometry = textGeometryGenerator(font,globalScale,globalFontScale, globalDepth, face, dieFontScale, dieSize, die, orientationIndicator, orientationIndicatorOnD8D6, orientationIndicatorSize, orientationIndicatorSpace, d2Radius)

    if ((svg && svg.showNumber) || (dieSvg && dieSvg.showNumber)) { // TODO check if there is a sub SVG in addition to the dieSVG
      console.log('sub')
      let textGeometry
      if (die === 'd4') textGeometry = d4FaceGeometryGenerator(font, globalScale, globalFontScale, globalDepth, faceNum, globalSVG, d4RadiusScale, dieFontScale, dieSize, d4Size, d4FontBottom)
      else textGeometry = textGeometryGenerator(font,globalScale,globalFontScale, globalDepth, face, dieFontScale, dieSize, die, orientationIndicator, orientationIndicatorOnD8D6, orientationIndicatorSize, orientationIndicatorSpace, d2Radius)
      if (geometry && textGeometry){
        geometry = new MergedGeometry([geometry, textGeometry])
      }
      else geometry = textGeometry
    }


    if (geometry) setGeometry(geometry)
  }, [
    font,
    globalScale,
    globalFontScale,
    globalDepth,
    faceNum,
    globalSVG,
    d4RadiusScale,
    dieFontScale,
    dieSize,
    d4Size,
    d4FontBottom,
    orientationIndicator,
    orientationIndicatorSize,
    orientationIndicatorOnD8D6,
    orientationIndicatorSpace,
    d2Radius
  ])


  return (
    <mesh ref={meshRef}>
      <primitive object={geometry} attach="geometry"/>
    </mesh>
  )
}

export default Face
