import React, { useEffect, useState } from 'react'

// Models
import { FontType } from '../../models/font'

// Style
import { Select } from 'antd'
import { useGlobalState } from '../../modules/global'
import { FontStyle } from './style'

const { Option } = Select

type Props = {}

const FontDropdown: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false)
  const [fonts, setFonts] = useState<Array<React.ReactNode>>([])
  const [fontMap, setFontMap] = useState<Record<string, string>>({})
  const setFontUrl = useGlobalState('fontUrl')[1]

  useEffect(() => {
    if (!loading && !fonts.length) {
      setLoading(true)
      fetch('/google_fonts.json')
        .then(response => response.json())
        .then(data => {
          const fontMap: Record<string, string> = {}
          const fontList: Array<React.ReactNode> = []
          data.items.forEach((font: FontType): void => {
            fontMap[font.family] = font.files.regular
            fontList.push(
              <Option key={font.family} value={font.family}>
                <FontStyle url={font.files.regular} family={font.family}>
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
    setFontUrl(fontMap[value])
  }

  return (
    <Select showSearch style={{ width: '100%' }} placeholder="Select a font" loading={loading} onChange={handleChange}>
      {fonts}
    </Select>
  )
}

export default FontDropdown
