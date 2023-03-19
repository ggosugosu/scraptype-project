import Navigation from 'components/Navigation';
import { BodyWrapperStyle, MainStyle } from 'components/Layout/style';

type LayoutProps = {
  children: React.ReactNode
}
export default function Layout({children}: LayoutProps) {
  return (
    <BodyWrapperStyle>
      <Navigation />
      <div />
      <MainStyle>{children}</MainStyle>
    </BodyWrapperStyle>
  );
}
