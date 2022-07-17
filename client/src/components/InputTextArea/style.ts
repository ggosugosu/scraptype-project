import { black, main } from 'common/colors';
import styled from 'styled-components';

export const InputTextAreaWrapper = styled.textarea`
  flex: 1 1 auto;

  width: 100%;
  height: calc(100% - 24px);
  appearance: none;
  padding-top: 14px;
  border: none;
  border-bottom: solid 2px ${black};

  font-size: 16px;
  vertical-align: top;

  &:focus {
    outline: none;
    border-bottom: solid 2px ${main};
  }
`;
