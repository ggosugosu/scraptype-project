import styled from 'styled-components';

export const GridStyle = styled.div<{ template?: string, gap?: string, padding?: string }>`
position: relative;
display: grid;
grid-template-columns: ${({ template }) => (template ? template : `1fr 1fr`)};
grid-gap: ${({ gap }) => (gap ? gap : 0)};

padding: ${({padding}) => padding ? padding : `0`};
`;

export const GridLayout = styled.div<{ row?: string; column?: string }>`
  grid-row: ${({ row }) => (row ? row : `span 1`)};
  grid-column: ${({ column }) => (column ? column : `span 1`)};
`;
