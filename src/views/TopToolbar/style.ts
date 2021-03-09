import styled from 'styled-components'

export const Toolbar = styled.div`
  width: 100%;
  height: 40px;
  background-color: #292929;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  color: #fff;
`

export const BarSegment = styled.div`
  display: flex;
  align-items: center;
`

export const ProjectNameWrapper = styled.div`
  display: flex;
  padding-right: 0.5em;
  overflow: hidden;
  text-align: right;
  color: '#rgba(28,28,28,0.9)';

  @media (max-width: 500px) {
    padding-right: 0.2em;
    font-size: x-small;
    max-width: 20em;
    max-height: 2.75em;
  }
`
