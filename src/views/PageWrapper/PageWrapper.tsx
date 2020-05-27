import React from 'react'

// Style
import { PageBody } from './style'

type Props = {
  children?: React.ReactNode
}

const PageWrapper: React.FC<Props> = ({ children }: Props) => {
  return <PageBody>{children}</PageBody>
}

export default PageWrapper
