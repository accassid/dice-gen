import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  #root {
    margin: 0;
    padding: 0;
    height: 100%;
    [data-reactroot] { height: 100% }
  }
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`
