import styled from "styled-components";

export const BodyWrapper = styled.div`
position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  @media (max-width: 480px) {
    flex-flow: column wrap;
    justify-content: flex-start;
  }
`;

export const Main = styled.main`
  position: relative;
  flex: 0 1 calc(100vw - 318px);
  width: auto;
  height: calc(100vh - 72px);
  overflow: auto;
  @media (max-width: 480px) {
    left: 0px;
    flex: 0 1 calc(100vh - 56px);
  }
`;