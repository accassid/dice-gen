import React, { useEffect } from 'react'
import { useGlobalState, getGlobalState } from '../../modules/global'

// Models
import { isFaceOption } from '../../models/face'
import { isDiceOption } from '../../models/dice'

// Libraries
import { DoubleSide, Mesh } from 'three'
import { useUpdate } from 'react-three-fiber'

// Utils
import { moveGeometryAndMesh } from '../../utils/numbers'

// Components
import SVGGeometry from '../SVGGeometry/SVGGeometry'
import TextGeometry from '../TextGeometry/TextGeometry'
import D4FaceGeometry from './D4FaceGeometry/D4FaceGeometry'

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

  let svg = null
  if (face.svg) svg = face.svg
  else if (globalSVG.max && (die === `d${faceNum}` || faceNum === 0 || die === `d${faceNum}Crystal`))
    svg = globalSVG.max
  else if (globalSVG.min && faceNum === 1) svg = globalSVG.min
  else if (globalSVG[`${faceNum}`]) svg = globalSVG[`${faceNum}`]

  return (
    <mesh ref={meshRef}>
      {die === 'd4' ? (
        <D4FaceGeometry font={font} faceNum={faceNum} dieFontScale={dieFontScale} dieSize={dieSize} />
      ) : svg ? (
        <SVGGeometry svg={svg} dieSize={dieSize} />
      ) : (
        <TextGeometry font={font} face={face} dieFontScale={dieFontScale} dieSize={dieSize} />
      )}
      <meshStandardMaterial side={DoubleSide} attach="material" color={'#898989'} />
    </mesh>
  )
}

export default Face
