import styled from "styled-components";
import {black, grey_100, grey_300, main} from "common/colors";

export const TagWrapperStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 12px 14px;

  margin: 8px 0 24px 0;
  padding: 0;
`;

export const TagItemWrapperStyle = styled.li`
    list-style: none;
`;

export const TagItemStyle = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto auto;

  height: 68px;
  padding: 16px;
  background-color: ${grey_100};

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding: 4px 8px;

    font-size: 20px;
  }
`;

export const NewTagItemStyle = styled.button`
  display: grid;
  justify-content: center;
  align-items: center;
  
  width: 100%;
  height: 68px;
  border: 1px dotted ${main};
  
  cursor: pointer;
`;

export const ButtonPositiveStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 8px;
  color: ${black};
`;

export const ButtonNegativeStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 8px;
  color: ${grey_300};
`;