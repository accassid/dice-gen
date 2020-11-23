import React from 'react'

// Components
import PageWrapper from '../PageWrapper/PageWrapper'
import MainCanvas from '../MainCanvas/MainCanvas'

import { GlobalStyle } from '../style'

type Props = {}

/**
 * The main entrypoint of the app. It renders a wrapper around the page with the canvas for three.js inside of it. The
 * GlobalStyle is also applied at this level.
 * @constructor
 */
const App: React.FC<Props> = () => {
  return (
    <PageWrapper>
      <GlobalStyle />
      <MainCanvas />
    </PageWrapper>
  )
}

export default App
