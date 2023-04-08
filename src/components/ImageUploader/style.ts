import { black, grey_150, white } from 'common/colors';
import styled from 'styled-components';

const IMAGE_CONTAINER_HEIGHT = 188;
export const InputFileContainer = styled.input`
  width: 0;
  height: 0;
  margin-bottom: 8px;
`;
export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: ${IMAGE_CONTAINER_HEIGHT}px;
  border-radius: 10px;

  img {
    object-fit: contain;
  }
`;


export const ImageUploaderWrapper = styled.div<{ isAdd: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: ${IMAGE_CONTAINER_HEIGHT}px;
  border-bottom: 2px solid ${black};
  background-color: ${({isAdd}) => (isAdd ? white : grey_150)};
  cursor: pointer;
`;