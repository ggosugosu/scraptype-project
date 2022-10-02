import Navigation from "../Navigation/index";
import { BodyWrapperStyle, MainStyle } from "./style";

export default function Layout({children}) {
    return (
        <BodyWrapperStyle>
            <Navigation/>
            <div />
            <MainStyle>{children}</MainStyle>
        </BodyWrapperStyle>
    );
}
