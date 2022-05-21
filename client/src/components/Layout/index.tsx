import styled from "styled-components";
import Navigation from "../Navigation/index";

const Main = styled.main`
  position: absolute;
  left: 280px;

  @media (max-width: 480px) {
    top: 70px;
    left: 0px;
  }
`;
export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <Main>{children}</Main>
    </>
  );
}
