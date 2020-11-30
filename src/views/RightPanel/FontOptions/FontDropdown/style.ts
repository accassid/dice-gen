import styled from 'styled-components'

export const FontStyle = styled.div<{ url: string; family: string }>`
  @font-face {
    font-family: '${(props): string => props.url}';
    src:  url('${(props): string => props.url}') format('truetype');
  }
  font-family: '${(props): string => props.url}';
  font-size: 125%;
`
