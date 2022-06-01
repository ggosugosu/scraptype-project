import styled from "styled-components";
import Navigation from "../Navigation/index";

const BodyWrapper = styled.div`
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

const Main = styled.main`
  position: relative;
  flex: 0 1 calc(100vw - 318px);
  width: auto;
  height: 100vh;
  overflow: auto;
  @media (max-width: 480px) {
    left: 0px;
    flex: 0 1 calc(100vh - 56px);
  }
`;

export default function Layout({ children }) {
  return (
    <BodyWrapper>
      <Navigation />
      <Main>{children}</Main>
    </BodyWrapper>
  );
}
