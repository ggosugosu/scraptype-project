import styled from 'styled-components';
import { black, grey_300 } from 'common/colors';

export const SearchTagWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: center;
  gap: 16px;
  height: 428px;
  border-bottom: 2px dotted ${black};
  padding: 4px;
  overflow: auto;
`;


export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: center;
  margin: 16px 4px;
  height: 228px;
  overflow: auto;

  span {
    font-weight: 300;
    font-size: 44px;
    line-height: 55px;
    color: ${grey_300};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;