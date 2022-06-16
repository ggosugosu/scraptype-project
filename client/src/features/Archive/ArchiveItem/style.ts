import styled from "styled-components";
import { ItemColor } from "./models";

export const CharBox = styled.button<{ selectedColor: ItemColor; fontFamily: string }>`
position: relative;
width: 168px;
height: 168px;
span {
  position: relative;
  top: 5px;
  left: 0;
  font-family: ${({ fontFamily }) => fontFamily}, sans-serif;
  font-size: 100px;
  line-height: 90px;
  color: ${({ selectedColor }) => selectedColor.text || "gray"};
}

.barcode_wrapper {
  position: absolute;
  left: 16px;
  bottom: 16px;
}

@media (max-width: 480px) {
  flex: 0 1 calc(50vw - 20px);
  height: calc(50vw - 20px);
  background-size: contain;
  background-repeat: no-repeat;
}
`;