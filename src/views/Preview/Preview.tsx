import React from 'react'
import { useGlobalState } from '../../modules/global'

type Props = {}

/**
 * The die preview is a processed three.js geometry that gets stored in the global state once processed. If there is no
 * preview in the global state this component returns null. Else, the three.js geometry is passed into a primitive
 * object to be rendered.
 * @constructor
 */
const Preview: React.FC<Props> = () => {
  const diePreview = useGlobalState('diePreview')[0]

  if (!diePreview) return null

  return <primitive object={diePreview} />
}

export default Preview
