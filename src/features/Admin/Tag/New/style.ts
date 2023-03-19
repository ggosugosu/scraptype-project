import styled from 'styled-components';
import { grey_100 } from 'common/colors';

export const CreateForm = styled.form`
  position: relative;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: center;

  width: 100%;
  height: 434px;
  padding: 100px 20px;
  background-color: ${grey_100};

  h1 {
    margin: 0 0 30px 0;

    font-size: 20px;
    font-weight: 500;
  }

  input {
    width: 100%;
    max-width: 400px;
    margin-bottom: 68px;
  }
`;