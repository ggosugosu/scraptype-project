import styled from "styled-components";
import {black, grey_100, grey_300, main} from "common/colors";

export const TagWrapperStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 12px 14px;

  margin: 8px 0 0 0;
  padding: 0;
`;

export const TagItemStyle = styled.li`
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

export const NewTagItemStyle = styled.li`
  display: grid;
  justify-content: center;
  align-items: center;
  
  width: 100%;
  border: 1px dotted ${main};
  
  cursor: pointer;
`;

export const ButtonModifyStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 8px;
  color: ${black};
`;

export const ButtonDeleteStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 8px;
  color: ${grey_300};
`;