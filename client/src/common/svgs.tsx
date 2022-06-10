import React from "react";
import Image from "next/image";
import styled from "styled-components";
import ButtonSVG from "../assets/images/ic_button.svg";

const ButtonPositiveWrapper = styled.button`
  position: relative;
  width: 184px;
  height: 60px;
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 184px;
    height: 60px;
    line-height: 60px;
    font-family: "Gothic-M", sans-serif;
    font-size: 20px;
    color: white;
  }
`;

interface buttonProps {
  enabled: boolean;
  text: string;
}

export const ButtonPositive = (props: buttonProps) => {
  return (
    <ButtonPositiveWrapper disabled={!props.enabled}>
      <Image src={ButtonSVG} alt="buttonPositive" width="184" height="60" className={props.enabled ? `filter_black` : `filter_grey_300`} />
      <div>{props.text}</div>
    </ButtonPositiveWrapper>
  );
};
