import Navigation from "components/Navigation";
import { BodyWrapperStyle, MainStyle } from "components/Layout/style";

export default function Layout({children}) {
  return (
    <BodyWrapperStyle>
      <Navigation/>
      <div/>
      <MainStyle>{children}</MainStyle>
    </BodyWrapperStyle>
  );
}
