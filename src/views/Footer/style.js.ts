import styled from 'styled-components'

export const FootContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 500px) {
    left: 0;
    width: 50px;
    height: 100%;
    justify-content: flex-end;
    align-items: flex-start;
    flex-direction: column;
  }
`
