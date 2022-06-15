import styled from "styled-components";
import { main_light } from "common/colors";

export const Item = styled.button<{ selected: Boolean; fixed: Boolean }>`
  display: inline-flex;
  align-items: flex-end;
  height: 28px;
  margin: 6px 8px;
  font-size: 20px;
  box-shadow: ${({ selected }) => (selected ? `inset 0 -4px 0 ${main_light}` : ``)};
  cursor: ${({ fixed }) => (fixed ? "text" : "pointer")};
`;
