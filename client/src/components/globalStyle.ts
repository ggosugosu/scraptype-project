import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const dashed_grey = `#CFD2D7`;

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family:'Elice-R' ,'Gothic-R', 'sans-serif';
  }

  body {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding-top: 72px;
    padding-left: 60px;
    padding-right: 60px;
    overflow: hidden;
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
  border-top: 2px dotted ${dashed_grey} ;
`;


