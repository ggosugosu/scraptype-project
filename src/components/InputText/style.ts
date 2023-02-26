import { black, main } from 'common/colors';
import styled from 'styled-components';

export const InputTextWrapper = styled.input.attrs((props) => ({
    type: props.type ? props.type : 'text',
}))<{ width?: string, height?: string, type?: string }>`
  flex: 1 1 auto;

  width: ${({width}) => (width ? width : `100%`)};
  height: ${({height}) => (height ? height : `54px`)};
  padding: 0 16px;
  appearance: none;
  border: none;
  border-bottom: solid 2px ${black};
  background-color: white;

  font-size: 16px;

  &:focus {
    outline: none;
    border-bottom: solid 2px ${main};
  }
`;

export const InputFixedTextWrapper = styled.div<{ width?: string, height?: string }>`
  display: inline-block;

  width: ${({width}) => (width ? width : `auto`)};
  height: ${({height}) => (height ? height : `54px`)};
  line-height: 54px;
  padding: 0 16px;
  border-bottom: solid 2px ${main};
  background-color: white;

  font-size: 16px;
  color: ${main};
`;
