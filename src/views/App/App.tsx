import React from 'react'
import PageWrapper from '../PageWrapper/PageWrapper'
import MainCanvas from "../MainCanvas/MainCanvas";

type Props = {}

const App: React.FC<Props> = () => {
  return (
    <PageWrapper>
      <MainCanvas/>
    </PageWrapper>
  )
}

export default App
