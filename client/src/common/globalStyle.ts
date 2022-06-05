import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { white, grey_400, black, grey_300, grey_200, grey_100 } from "./colors";
import { getSvgUrl } from "../features/utils";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family:'Elice-R' ,'Gothic-R', 'sans-serif';
    color: ${black};
  }

  body {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding-top: 72px;
    padding-left: 60px;
    padding-right: 60px;
    overflow: hidden;
    @media (max-width: 480px) {
    padding: 0;
  }
  }

  button {
    background: none;
	  color: inherit;
	  border: none;
	  padding: 0;
	  font: inherit;
	  cursor: pointer;
	  outline: inherit;
  }
`;

export const DashLineHorizontal = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  border-top: 2px dotted ${grey_400};
`;

/**
 * Button
 */

const ButtonPositiveSVG = (color: string) =>
  `%3Csvg width="184" height="60" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v60h184V26.618L159.644 0H0Z" fill='${color}'/%3E%3C/svg%3E`;

export const ButtonPositive = styled.button<{ enabled: Boolean }>`
  width: 184px;
  height: 60px;
  background-image: url("${({ enabled }) => getSvgUrl(ButtonPositiveSVG(enabled ? black : grey_300))}");
  font-family: "Gothic-M", sans-serif;
  font-size: 20px;
  color: ${white};
`;

export const ButtonNegative = styled.button<{ enabled: Boolean }>`
  width: auto;
  height: 60px;
  padding: 8px 24px;
  font-family: "Gothic-M", sans-serif;
  font-size: 20px;
  color: ${({enabled})=> enabled ? grey_200 : grey_100};
`;
