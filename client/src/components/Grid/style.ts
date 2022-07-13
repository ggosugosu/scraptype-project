import styled from 'styled-components';

export const GridStyle = styled.div<{ template?: string, gap?: string }>`
position: relative;
display: grid;
grid-template-columns: ${({ template }) => (template ? template : `1fr 1fr`)};
grid-gap: ${({ gap }) => (gap ? gap : 0)};
`;
