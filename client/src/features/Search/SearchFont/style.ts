import { black, main } from "common/colors";
import styled from "styled-components";

export const FlexWrapperStyle = styled.form`
  position: absolute;
  bottom: 426px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 270px 1fr 184px;
  grid-gap: 16px;
  align-items: center;

  width: 100%;
`;

export const SelectorWrapperStyle = styled.div`
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

export const SelectorStyle = styled.select`
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

export const InputWrapperStyle = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 184px;
  align-items: center;

  width: 100%;
`
