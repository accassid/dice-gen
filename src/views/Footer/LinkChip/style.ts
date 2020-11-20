import styled from 'styled-components'

export const ChipContainer = styled.a`
  height: 35px;
  background-color: rgba(255, 255, 255, 0.2);
  border: #000 solid 1px;
  color: #fff;
  border-radius: 3px;
  font-size: 20px;
  padding: 5px;
  cursor: pointer;
  margin: 5px;
  transition: background-color ease-in-out 0.25s;
  display: flex;
  align-items: center;

  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.5);
  }
`

export const TextContainer = styled.div`
  padding-left: 5px;
  font-size: 15px;
  white-space: nowrap;
`
