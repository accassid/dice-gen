import styled from 'styled-components'

export const UIOptionsDialog = styled.div`
  bottom: 12em;
  left: 10em;
  width: 40em;
  z-index: 5000;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  background-opacity: 0.5;
  border: 2px solid white;
  padding: 1em;
  margin: 1em;
`

export const ActionButton = styled.div<{ rgbColor?: string; rgbFontColor?: string; width?: string }>`
  background-color: ${(props): string => (props.rgbColor ? `rgba(${props.rgbColor}, .85)` : `rgba(0,0,0,0.6)`)};
  color: ${(props): string => (props.rgbFontColor ? `rgba(${props.rgbFontColor})` : 'rgba(1,1,1,1)')};
  font-size: 110%;
  flex: 1 1 auto;
  height: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5px;
  cursor: pointer;
  transition: background-color ease-in-out 0.25s;
  width: ${(props): string => (props.width ? props.width : 'auto')};
  &:hover {
    background-color: ${(props): string => (props.rgbColor ? `rgba(${props.rgbColor}, 1)` : `rgba(0,0,0,1)`)};
  }
`
