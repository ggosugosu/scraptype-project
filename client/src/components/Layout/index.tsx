import styled from "styled-components";
import Navigation from "../Navigation/index";

const BodyWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
`

const Main = styled.main`
  position: relative;
  width: auto;
  flex: 0 1 66.67%;
  @media (max-width: 480px) {
    top: 70px;
    left: 0px;
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
