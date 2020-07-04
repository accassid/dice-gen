import styled from 'styled-components'

export const RightPanelContainer = styled.div<{ active: boolean; mobileActive: boolean }>`
  margin: 50px 10px 10px 10px;
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
  ::-webkit-scrollbar{
    -webkit-appearance:none;
    width:10px;
    height:10px
  }
  ::-webkit-scrollbar-track{
    background:rgba(255,255,255,0.1);
    border-radius:0
  }
  ::-webkit-scrollbar-thumb{
    cursor:pointer;
    border-radius:5px;
    background:rgba(255,255,255,0.25);
    -webkit-transition:color .2s ease;
    transition:color .2s ease
  }
  ::-webkit-scrollbar-thumb:window-inactive{
    background:rgba(255,255,255,0.15)
  }
  ::-webkit-scrollbar-thumb:hover{
    background:rgba(128,135,139,.8)
  }
`

export const SectionContainer = styled.div`
  padding: 10px;
  width: 100%;
`

export const ButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
`
