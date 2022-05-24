import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family:'Elice-R' ,'Gothic-R', 'sans-serif';
  }

  body {
    margin: 0;
    padding-top: 72px;
    padding-left: 60px;
    padding-right: 60px;
  }
`;

export const DashLineHorizontal = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  border-top: 2px dotted $dashed_grey;
`;

export const dashed_grey = "#CFD2D7";
