import { grey_100, hot_pink } from 'common/colors';
import styled from 'styled-components';

export const FormStyle = styled.form<{ isGrey?: boolean }>`
  width: 100%;
  background-color: ${({ isGrey }) => (isGrey ? grey_100 : `white`)};
  label {
    display: inline-block;

    width: 100%;
    margin-bottom: 8px;

    font-size: 20px;
    font-weight: 600;

    span {
      color: ${hot_pink};
    }
  }
`;
