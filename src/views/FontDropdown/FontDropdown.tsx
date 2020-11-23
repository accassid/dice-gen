import React, { useEffect, useState } from 'react'
import { useGlobalState } from '../../modules/global'

// Models
import { FontType } from '../../models/font'

// Style
import { Select } from 'antd'
import { FontStyle } from './style'

// Libraries
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader'
import * as THREE from 'three'

const { Option } = Select

type Props = {}

/**
 * This dropdown allows the selection of a google font for the die numbers. The font list is lazy loaded in after the
 * page loads. The json is stored in this repository as google provides no public endpoint of a list of all the fonts.
 * Once the fonts are loaded each is added as an <Option> to the <Select> element. The name of the item is wrapped in a
 * styled component that takes in the font name and uses that font for the option name. When a font is selected it uses
 * the three.js ttf loader to load in the font and then stores it in the globalFont key of the global state.
 * @constructor
 */
const FontDropdown: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false)
  const [fonts, setFonts] = useState<Array<React.ReactNode>>([])
  const [fontMap, setFontMap] = useState<Record<string, string>>({})
  const setGlobalFont = useGlobalState('globalFont')[1]
  const [globalFontName, setGlobalFontName] = useGlobalState('globalFontName')

  useEffect(() => {
    if (!loading && !fonts.length) {
      setLoading(true)
      fetch('/google_fonts.json')
        .then(response => response.json())
        .then(data => {
          const fontMap: Record<string, string> = {}
          const fontList: Array<React.ReactNode> = []
          data.items.forEach((font: FontType): void => {
            const url = font.files.regular ? font.files.regular.replace('http', 'https') : ''
            fontMap[font.family] = url
            fontList.push(
              <Option key={font.family} value={font.family}>
                <FontStyle url={url} family={font.family}>
                  {font.family} (0123456789)
                </FontStyle>
              </Option>,
            )
          })
          setFonts(fontList)
          setFontMap(fontMap)
          setLoading(false)
        })
        .catch(reason => {
          setLoading(false)
          console.error(reason)
        })
    }
  }, [loading, fonts.length])

  const handleChange = (value: string): void => {
    const ttfLoader = new TTFLoader()
    const fontLoader = new THREE.FontLoader()
    ttfLoader.load(fontMap[value], fnt => setGlobalFont(fontLoader.parse(fnt)))
    setGlobalFontName(value)
  }

  return (
    <Select
      showSearch
      value={globalFontName}
      style={{ width: '100%' }}
      placeholder="Select a font"
      loading={loading}
      onChange={handleChange}>
      {fonts}
    </Select>
  )
}

export default FontDropdown
