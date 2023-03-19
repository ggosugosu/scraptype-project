import styled from 'styled-components';

import { grey_300, black } from 'common/colors';

export const NavBarStyle = styled.header`
  position: relative;
  display: inline-flex;
  flex-flow: column;
  top: 0;
  left: 0;
  width: 318px;
  height: 100vh;
  margin-right: 128px;

  .logo-large,
  .logo-small {
    margin-bottom: 24px;
  }

  .logo {
    cursor: pointer;
  }


  @media (max-width: 480px) {
    width: 100%;
    height: 56px;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 4px 16px;
    border-bottom: 1px dashed ${black};
    hr {
      display: none;
    }

    ul {
      display: inline-flex;
      flex-flow: row-reverse wrap;
      gap: 12px;
    }

    ul li {
      display: inline-flex;
      flex-flow: column;
      align-items: center;

      span {
        font-weight: 500;
        font-size: 9px;
        white-space: nowrap;
      }
    }

    .logo {
      width: 48px !important;
      height: 48px !important;
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
    font-size: 24px;
  }

  @media (max-width: 480px) {
    position: relative;
    width: 48px;
    height: 48px;
    justify-content: flex-start;
    flex-flow: column-reverse nowrap;
    gap: 7px;
  }
`;

export const NavButtons = styled.ul`
  position: absolute;
  bottom: 100px;
  width: 100%;

  padding: 0;

  .nav-button {
    list-style: none;
    border-top: 2px dotted ${grey_300};

    &:last-child {
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 2px solid ${black};
      height: 126px;
    }
  }

  @media (max-width: 480px) {
    position: relative;
    top: 0;
    margin: 0;

    .nav-button {
      border-top: none;

      &:last-child {
        display: none;
      }
    }
  }
`;

export const DropSettingsWrapperStyle = styled.div`
  position: absolute;
  top: 42px;
  left: 318px;

  width: 206px;
  height: 110px;

  z-index: 99;

  .bg-settings-drop {
    position: absolute;
    top: 0;
    left: 0;

    width: 206px;
    height: 110px;
  }
`;


export const DropSettingsStyle = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr;

  width: 206px;
  height: 110px;
  padding: 0 6px 0 16px;
`;

export const DropSettingItemWrapperStyle = styled.li`
  list-style: none;
  padding: 0;
  border-bottom: 1px dashed white;

  &:last-child {
    border-bottom: none;
  }
`;

export const DropSettingItemStyle = styled.button`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 32px 1fr;
  align-items: center;

  width: 100%;
  height: 56px;

  color: white;

  .icon-wrapper {
    width: 32px;
    padding: 6px 4px 4px 4px;
  }

  span {
    font-size: 20px;
    font-weight: 500;
    text-align: start;
    color: white;
  }
`;
