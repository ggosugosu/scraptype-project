import { black, main } from "common/colors";
import styled from "styled-components";

export const FlexWrapper = styled.div`
  position: absolute;
  bottom: 426px;
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
  width: 100%;
`;

export const SelectorWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: auto;
  height: auto;
  .arrow_wrapper {
    position: absolute;
    right: 16px;
    display: flex;
    align-items: center;
    width: 32px;
    height: 54px;
  }
`;

export const Selector = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  width: 270px;
  height: 54px;
  border: none;
  border-bottom: solid 2px ${black};
  padding: 0 16px;
  background-color: transparent;
  font-size: 20px;

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  &:focus {
    outline: none;
    border-bottom: solid 2px ${main};
  }

  option {
    border: 1px solid ${main};
    padding: 16px;
    font-size: 20px;
  }
`;

export const Text = styled.input.attrs((props) => ({
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
