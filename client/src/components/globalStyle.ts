import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { grey_400, black } from "./colors";


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
  border-top: 2px dotted ${grey_400} ;
`;


