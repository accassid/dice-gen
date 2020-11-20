import React from 'react'

// Style
import { PageBody } from './style'

// Components
import TopToolbar from '../TopToolbar/TopToolbar'
import RightPanel from '../RightPanel/RightPanel'
import Loader from '../Loader/Loader'
import Footer from '../Footer/Footer'

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
      <Footer />
      <Loader />
    </>
  )
}

export default PageWrapper
