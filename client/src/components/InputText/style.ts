import { black, main } from "common/colors";
import styled from "styled-components";

export const InputTextWrapper = styled.input.attrs((props) => ({
  type: "text",
}))`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-bottom: solid 2px ${black};
  flex: 1 1 auto;
  width: 0px;
  height: 54px;
  font-size: 20px;

  &:focus {
    outline: none;
    border-bottom: solid 2px ${main};
  }
`;

export const InputFixedTextWrapper = styled.div`
  display: inline-block;
  width: auto;
  height: 54px;
  border-bottom: solid 2px ${main};
  padding: 0 16px;
  color: ${main};
  font-size: 20px;
  line-height: 54px;
`;
