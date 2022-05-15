import styled from "styled-components";
import Navigation from "../Navigation/index";

const Main = styled.main`
    position: absolute;
    left: 280px;
`
export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <Main>{children}</Main>
    </>
  );
}
