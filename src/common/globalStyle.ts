import { createStitches } from '@stitches/react';
import styled, { createGlobalStyle } from 'styled-components';
import { black, grey_400 } from 'common/colors';

export const {styled: stitchStyled} = createStitches({
  media: {
    mobile: '(max-width: 480px)',
    desktop: '(max-width: 1200px)',
  },
  theme: {
    colors: {
      black: '#313338',
      grey_400: '#6A6B6E',
      grey_300: '#C5C6C8',
      grey_200: '#D5D6D8',
      grey_150: '#E9E9E9',
      grey_100: '#F1F1F1',
      white: '#FFFFFF',
      main_light: '#6FFFCB',
      main: '#19D29A',
      texas_rose: '#FFB15B',
      hot_pink: '#FF5CC4',
      torea_bay: '#0836A6',
      cerulean: '#009CCF',
      java: '#1AE4A7',
      turbo: '#FFEA00',
    },
  }
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

