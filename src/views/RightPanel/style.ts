import styled from 'styled-components'

export const RightPanelContainer = styled.div<{ active: boolean; mobileActive: boolean }>`
  margin: 50px 10px 60px 10px;
  height: auto;
  width: 300px;
  background-color: rgba(28, 28, 28, 0.9);
  position: absolute;
  right: ${(props): string => (props.active ? '0' : '-310px')};
  top: 0;
  bottom: 0;
  z-index: 1;
  transition: right 0.25s ease-in-out;
  overflow-y: auto;
  @media (max-width: 500px) {
    right: ${(props): string => (props.mobileActive ? '0' : '-310px')};
  }
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0;
  }
  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.25);
    -webkit-transition: color 0.2s ease;
    transition: color 0.2s ease;
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255, 255, 255, 0.15);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(128, 135, 139, 0.8);
  }
`

export const SectionContainer = styled.div`
  padding: 10px;
  width: 100%;
`

export const ButtonContainer = styled.div`
  position: fixed;
  width: 300px;
  bottom: 0;
  display: flex;
  padding-bottom: 10px;
`

export const ActionButton = styled.div<{ rgbColor?: string }>`
  background-color: ${(props): string => (props.rgbColor ? `rgba(${props.rgbColor}, .85)` : `rgba(0,0,0,0.6)`)};
  font-size: 110%;
  flex: 1 1 auto;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5px;
  cursor: pointer;
  transition: background-color ease-in-out 0.25s;
  &:hover {
    background-color: ${(props): string => (props.rgbColor ? `rgba(${props.rgbColor}, 1)` : `rgba(0,0,0,1)`)};
  }
`
