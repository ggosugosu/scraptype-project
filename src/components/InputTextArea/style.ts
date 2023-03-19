import { black, main } from 'common/colors';
import styled from 'styled-components';

export const InputTextAreaStyle = styled.textarea<{ height?: string }>`
  flex: 1 1 auto;

  width: 100%;
  height: ${({height}) => (height ? height : 'calc(100% - 32px)')};
  padding: 14px 16px;
  resize: none;
  appearance: none;
  border: none;
  border-bottom: solid 2px ${black};
  background-color: white;

  font-size: 16px;
  vertical-align: top;

  &:focus {
    outline: none;
    border-bottom: solid 2px ${main};
  }
`;
