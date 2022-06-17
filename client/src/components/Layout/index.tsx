import Navigation from "../Navigation/index";
import { BodyWrapper, Main } from "./style";

export default function Layout({ children }) {
  return (
    <BodyWrapper>
      <Navigation />
      <Main>{children}</Main>
    </BodyWrapper>
  );
}
