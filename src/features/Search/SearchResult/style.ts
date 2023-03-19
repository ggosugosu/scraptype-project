import styled from 'styled-components';

export const TagsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 8px;
  width: 100%;
  height: 90px;
  margin-top: 24px;
  padding: 6px 8px;
`;

export const ResultsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  width: 100%;
  height: auto;
  overflow: auto;
`;

export const TextWrapper = styled.div`
display: flex;
flex-flow: row wrap;
gap: 16px;
height: 54px;
line-height: 54px;
margin-top: 92px;
margin-bottom: 88px;
span {
  font-size: 20px;
}
`;