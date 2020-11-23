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

/**
 * This is a simple styled wrapper that is rendered around each page. It contains the top toolbar, the right toolbar,
 * the footer and the loader component to appear when needed. Children are passed into this component to be rendered in
 * the page body.
 * @param children
 * @constructor
 */
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
