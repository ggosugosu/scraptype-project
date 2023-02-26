import React from "react";
import Image from "next/image";
import ButtonSVG from "assets/images/ic_button.svg";
import { ButtonNegativeStyle, ButtonPositiveStyle } from "components/Button/style";

interface buttonProps {
  enabled: boolean | string;
  text: string;
  type?: "button" | "submit" | "reset"
  onClick?: () => void;
}

export const ButtonPositive = (props: buttonProps) => {
  return (
    <ButtonPositiveStyle disabled={!props.enabled} type={props.type ?? 'button'} onClick={props.onClick}>
      <Image src={ButtonSVG} alt="buttonPositive" width="184" height="54"
             className={props.enabled ? `filter_black` : `filter_grey_300`}/>
      <div>{props.text}</div>
    </ButtonPositiveStyle>
  );
};

export const ButtonNegative = (props: buttonProps) => {
  return (
    <ButtonNegativeStyle disabled={!props.enabled} onClick={props.onClick}>
      <div>{props.text}</div>
    </ButtonNegativeStyle>
  )
}
