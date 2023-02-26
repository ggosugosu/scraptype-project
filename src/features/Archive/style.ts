import { grey_200 } from 'common/colors';
import styled from "styled-components";

export const LogoWrapper = styled.div`
display: none;
width: 100%;
height: 188px;
border-bottom: 4px dotted ${grey_200};

@media (max-width: 480px) {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
`;