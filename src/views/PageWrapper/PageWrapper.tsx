import React from 'react'

// Style
import { PageBody } from './style'

// Components
import TopToolbar from '../TopToolbar/TopToolbar'
import RightPanel from '../RightPanel/RightPanel'

type Props = {
  children?: React.ReactNode
}

const PageWrapper: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <TopToolbar />
      <PageBody>
        <RightPanel />
        {children}
      </PageBody>
    </>
  )
}

export default PageWrapper
