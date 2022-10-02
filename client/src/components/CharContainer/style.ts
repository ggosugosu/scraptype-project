import styled from 'styled-components';

export const CharContainerStyle = styled.div`
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  gap: 12px;
  width: auto;
  height: auto;
  padding-bottom: 16px;

  @media (max-width: 480px) {
    justify-content: center;
    gap: 8px;
    padding: 24px 0;
  }
`;
