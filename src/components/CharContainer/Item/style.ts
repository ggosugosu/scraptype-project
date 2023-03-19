import { grey_300 } from 'common/colors';
import styled from 'styled-components';
import { ItemColor } from 'components/CharContainer/Item/models';

export const CharBox = styled.button<{ selectedColor?: ItemColor; fontFamily?: string }>`
  position: relative;
  width: 168px;
  height: 168px;

  .char-text {
    position: relative;
    top: 5px;
    left: 0;
    font-family: ${({fontFamily}) => (fontFamily ? fontFamily : 'inherit')}, sans-serif;
    font-size: 96px;
    line-height: 90px;
    color: ${({selectedColor}) => (selectedColor ? selectedColor.text : `${grey_300}`)};
  }

  .barcode-wrapper {
    position: absolute;
    left: 16px;
    bottom: 16px;
    width: 36px;
    height: 36px;
  }

  .char-name {
    position: absolute;
    bottom: 10%;

    width: 100%;

    color: ${grey_300};
  }

  @media (max-width: 480px) {
    flex: 0 1 calc(50vw - 20px);
    height: calc(50vw - 20px);

    span {
      top: 0;
    }
  }
`;
