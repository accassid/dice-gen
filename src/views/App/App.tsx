import React from 'react'
import PageWrapper from '../PageWrapper/PageWrapper'
import MainCanvas from '../MainCanvas/MainCanvas'
import 'antd/dist/antd.css'

import { GlobalStyle } from '../style'

type Props = {}

const App: React.FC<Props> = () => {
  return (
    <PageWrapper>
      <GlobalStyle />
      <MainCanvas />
    </PageWrapper>
  )
}

export default App
