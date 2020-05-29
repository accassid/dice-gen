import styled from 'styled-components'

export const RightPanelContainer = styled.div<{ active: boolean; mobileActive: boolean }>`
  margin: 50px 10px 10px 10px;
  height: auto;
  width: 300px;
  background-color: rgba(41, 41, 41, 0.9);
  position: absolute;
  right: ${(props): string => (props.active ? '0' : '-310px')};
  top: 0;
  bottom: 0;
  z-index: 1;
  transition: right 0.25s ease-in-out;
  @media (max-width: 500px) {
    right: ${(props): string => (props.mobileActive ? '0' : '-310px')};
  }
`
