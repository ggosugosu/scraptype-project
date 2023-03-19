import styled from 'styled-components';

export const BodyWrapperStyle = styled.div`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 318px 1fr 9fr;
  width: 100%;
  height: 100vh;
  
  @media (max-width: 480px) {
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    grid-template-rows: 56px 1fr;
    justify-content: flex-start;
  }
`;

export const MainStyle = styled.main`
  position: relative;
  flex: 0 1 calc(100vw - 318px);
  width: auto;
  height: calc(100vh - 72px);
  overflow: auto;
  @media (max-width: 480px) {
    left: 0;
    flex: 0 1 calc(100vh - 56px);
  }
`;