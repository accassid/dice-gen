import React, {useEffect, useState} from 'react'
import {Font, TextGeometry, TextGeometryParameters} from "three";
import {useGlobalState} from "../../../../modules/global";

type Props = {
  font: Font | null
  faceNum: number
}

const FACE_MAP: Record<string, [string, string, string]> = {
  "1": ["1", "2", "3"],
  "2": ["3", "2", "4"],
  "3": ["3", "4", "1"],
  "4": ["4", "2", "1"],
}

const D4TextGeometry: React.FC<Props> = ({font, faceNum}: Props) => {
  const [geometry, setGeometry] = useState<TextGeometry | null>(null)
  const [globalSize] = useGlobalState('globalSize')
  const [globalFontScale] = useGlobalState('globalFontScale')
  const [globalDepth] = useGlobalState('globalDepth')

  let config: null | TextGeometryParameters = null
  if (font)
    config = {
      font,
      size: globalSize / 4 * globalFontScale,
      height: globalDepth + 0.02,
      curveSegments: 6,
      bevelEnabled: false,
      bevelThickness: 0.01,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 8,
    }


  useEffect(() => {
    console.log('updating')
    const numbers = FACE_MAP[`${faceNum}`]
    if (config) {
      const radius = globalSize/3
      let rotation = 0
      let geometry: TextGeometry | null = null
      for (let i = 0; i<numbers.length; i++) {
        const text = numbers[i]
        const currentGeometry = new TextGeometry(text, config)
        currentGeometry.center()
        currentGeometry.rotateX(Math.PI/2)
        currentGeometry.translate(0, 0, radius)
        currentGeometry.rotateY(rotation)
        if (!geometry) geometry = currentGeometry
        else geometry.merge(currentGeometry)
        rotation += Math.PI * 2 / 3
      }
      if (!geometry) throw new Error("There must be at least one number for the D4 face generator.")
      setGeometry(geometry)
    }
  },[font, globalSize, globalFontScale, globalDepth])

  if (!geometry) return <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
  return (
    <primitive object={geometry} attach="geometry" />
  )
}

export default D4TextGeometry
