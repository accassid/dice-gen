import styled from "styled-components"

export const SVGCard = styled.div`
  padding: 10px;
  width: 100%;
  border: 1px solid rgba(255,255,255,0.2);
  position: relative;
  margin-bottom: 5px;
`

export const CornerDiv = styled.div`
  width: 35px;
  height: 35px;
  background-color: #343434;
  clip-path: polygon(100% 0, 0 0, 100% 100%);
  position: absolute;
  top: 0;
  right: 0;
  padding-left: 17px;
  cursor: pointer;
  &:hover {
    background-color: #444444;
  }
`