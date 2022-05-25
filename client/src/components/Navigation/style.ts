import styled from "styled-components";

export const NavBar = styled.header`
  position: relative;
  display: inline-flex;
  flex-flow: column;
  top: 0px;
  left: 0px;
  width: 318px;
  height: 100vh;
  margin: 0;
  flex: 0 0 25%;

  ul {
    list-style: none;
    padding-left: 0px;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 70px;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    hr {
      display: none;
    }
    ul {
      display: inline-block;
    }
    ul li {
      display: inline-block;
    }
  }
`;

export const NavLogo = styled.p`
  font-size: 20px;
  content: url('http://drive.google.com/uc?export=view&id=1PnKUOUlXYTwNhzU2l6uI6FHnLg-WYAOD');
  @media (max-width: 480px) {
    display: inline-block;
    font-size: 14px;
    content: url('http://drive.google.com/uc?export=view&id=1E3Cbxq2LsGkhirQGlXWsjsChkUfZNbK1');
  }
`;

export const NavDesc = styled.p`
  font-size: 14px;
  @media (max-width: 480px) {
    display: none;
  }
`;

export const NavButton = styled.button`
  border: none;
  background-color: white;
  @media (max-width: 480px) {
    span {
      display: none;
    }
  }
`;
