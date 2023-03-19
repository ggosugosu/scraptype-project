import styled from 'styled-components';

export const PageTitleStyle = styled.header`
  display: grid;
  grid-template-columns: 48px 1fr auto;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  height: 48px;

  span {
    font-weight: 500;
    font-size: 32px;
  }

  img {
    cursor: pointer;
  }
`;
