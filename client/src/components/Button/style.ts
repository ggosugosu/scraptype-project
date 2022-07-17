import { grey_100, grey_200 } from "common/colors";
import styled from "styled-components";

export const ButtonPositiveWrapper = styled.button`
  position: relative;
  width: 184px;
  height: 54px;
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 184px;
    height: 54px;
    line-height: 54px;
    font-weight: 500;
    font-size: 20px;
    color: white;
  }
`;

export const ButtonNegativeWrapper = styled.button<{ disabled: Boolean }>`
  width: auto;
  height: 54px;
  padding: 8px 24px;
  div {
    font-weight: 500;
    font-size: 20px;
    color: ${({ disabled }) => (disabled ? grey_100 : grey_200)};
  }
`;
