import styled from 'styled-components'
import {Upload} from "antd";
const { Dragger } = Upload

export const StyledDragger = styled(Dragger)`
  width: 140px !important;
  margin-left: 4px;
  .ant-upload-btn {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 5px 0 !important;
  }
`
