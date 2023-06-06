import { stitchStyled } from 'common/globalStyle';

export const PageTitleStyle = stitchStyled('header', {
  position: 'sticky',
  top: 0,
  display: 'grid',
  gridTemplateColumns: '48px 1fr auto',
  flexFlow: 'row wrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '8px',
  height: '48px',
  zIndex: '3',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',

  span: {
    fontWeight: 500,
    fontSize: '32px',
  },

  img: {
    cursor: 'pointer'
  }
});
