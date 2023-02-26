import { black, grey_100, grey_300, main } from 'common/colors';
import styled from 'styled-components';

export const RadioStyle = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;

  height: 32px;

  input[type='radio'],
  input[type='radio']:checked {
    width: 16px;
    height: 16px;
    margin: 0 0 5px 0;
    appearance: none;
    border-radius: 100%;

    cursor: pointer;
  }

  input[type='radio'] {
    border: 2px solid ${grey_300};
    box-shadow: 0 0 0 4px ${grey_100} inset;
    background-color: ${grey_300};
  }

  input[type='radio']:checked {
    border: 2px solid ${main};
    box-shadow: 0 0 0 4px white inset;
    background-color: ${main};
  }

  label {
    width: auto;
    margin-left: 8px;
    margin-right: 16px;

    font-size: 16px;
    font-weight: 500;
    color: ${black};

    cursor: pointer;
  }
`;
