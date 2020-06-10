import React from 'react'
import { useGlobalState } from '../../modules/global'

type Props = {}

const Preview: React.FC<Props> = () => {
  const diePreview = useGlobalState('diePreview')[0]

  if (!diePreview) return null

  return <primitive object={diePreview} />
}

export default Preview
