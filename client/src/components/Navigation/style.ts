import styled from "styled-components";
import { grey_300, grey_400, black } from "../colors";

export const NavBar = styled.header`
  position: relative;
  display: inline-flex;
  flex-flow: column;
  top: 0px;
  left: 0px;
  width: 318px;
  height: 100vh;
  margin-right: 128px;

  ul {
    list-style: none;
    padding-left: 0px;
  }

  .logo-large, .logo-small {
    margin-bottom: 24px;
  }

  .logo-large {
    display: inline-block !important;
  }

  .logo-small {
    display: none !important;
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
    .logo-large {
      display: none !important;
    }

    .logo-small {
      display: inline-block !important;
    }
  }
`;

// TODO: 삭제할 컴포넌트
export const NavLogo = styled.div`
  width: 100%;
  > div {
    position: unset !important;
  }

  img {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
  //content: url("http://drive.google.com/uc?export=view&id=1PnKUOUlXYTwNhzU2l6uI6FHnLg-WYAOD");
  @media (max-width: 480px) {
    display: inline-block;
    font-size: 14px;
    //content: url("http://drive.google.com/uc?export=view&id=1E3Cbxq2LsGkhirQGlXWsjsChkUfZNbK1");
  }
`;

export const NavDesc = styled.p`
  width: 100%;
  text-align: center;
  font-family: "Gothic-R", sans-serif;
  font-size: 16px;
  @media (max-width: 480px) {
    display: none;
  }
`;

export const NavButton = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 84px;
  border: none;
  background-color: white;
  span {
    font-size: 1.5rem;
  }
  @media (max-width: 480px) {
    span {
      display: none;
    }
  }
`;

export const NavButtons = styled.ul`
  position: absolute;
  bottom: 100px;
  width: 100%;
  hr {
    margin: 0;
  }
  li {
    border-top: 2px dotted ${grey_300};
    &:last-child {
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 2px solid ${black};
      height: 126px;
      @media (max-width: 480px) {
        display: none;
      }
    }
  }
`;
