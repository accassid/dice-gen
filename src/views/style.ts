import styled, { createGlobalStyle } from 'styled-components'
import { Upload } from 'antd'
const { Dragger } = Upload

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

export const Spacer = styled.div<{ height?: number }>`
  height: ${(props): number => (props.height ? props.height : 15)}px;
`
export const StyledDragger = styled(Dragger)<{ width: string }>`
  width: ${props => props.width} !important;
  margin-left: 4px;
  overflow: hidden;

  .ant-upload-btn {
    p {
      width: ${props => props.width};
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    padding: 5px 0 !important;
  }
`
