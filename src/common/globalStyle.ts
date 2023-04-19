import { createStitches } from '@stitches/react';
import styled, { createGlobalStyle } from 'styled-components';
import { black, grey_400 } from 'common/colors';

export const {styled: stitchStyled} = createStitches({
  media: {
    mobile: '(max-width: 480px)',
    desktop: '(max-width: 1200px)',
  },
});
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Elice', 'Gothic', 'sans-serif';
    font-weight: 400;
    color: ${black};
  }

  body {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding-top: 72px;
    padding-left: 60px;
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

  a {
    color: inherit;
    text-decoration: none;
  }

  .col-1 {
    grid-column: span 1;
  }

  .col-2 {
    grid-column: span 2;
  }

  .col-3 {
    grid-column: span 3;
  }

  .col-4 {
    grid-column: span 4;
  }

  .col-5 {
    grid-column: span 5;
  }

  .col-6 {
    grid-column: span 6;
  }

  .hidden {
    display: none;
  }
`;

export const DashLineHorizontal = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  border-top: 2px dotted ${grey_400};
`;

