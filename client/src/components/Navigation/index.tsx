import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { NavBar, NavButton, NavDesc, NavLogo } from "./style";
import { DashLineHorizontal } from "../globalStyle";
import Image from "next/image";
import iconTag from "../../assets/images/ic_tag_default.svg";
import iconName from "../../assets/images/ic_name_default.svg";
import iconSettings from "../../assets/images/ic_settings_default.svg";
import logoLg from "../../assets/images/logo_lg.svg";
import logoSm from "../../assets/images/logo_sm.svg";

const NavButtons = styled.ul`
  position: absolute;
  bottom: 100px;
  width: 100%;
  hr {
    margin: 0;
  }
  li {
    border-top: 2px dotted grey;
    &:last-child {
      border-top: 2px solid #000000;
    }
  }
`;

export default function Navigation() {
  return (
    <NavBar>
      <NavLogo>
        <Image src={logoLg} alt="Logo" width="318" height="82.44" />
      </NavLogo>

      <NavDesc>
        Before memorizing the names and
        <br />
        shapes of 10,000 fonts,
        <br />
        I&apos;m glad we were able to create this site.
      </NavDesc>

      <NavButtons>
        <li>
          <Link href="/admin/font-tag" passHref>
            <NavButton>
              <span>Settings</span>
              <Image src={iconSettings} alt="icon-settings" />
            </NavButton>
          </Link>
        </li>
        <li>
          <Link href="/search/tag/" passHref>
            <NavButton>
              <span>Tag Search</span>
              <Image src={iconTag} alt="icon-tag" />
            </NavButton>
          </Link>
        </li>
        <li>
          <Link href="/search/font/" passHref>
            <NavButton>
              <span>Name Search</span>
              <Image src={iconName} alt="icon-name" />
            </NavButton>
          </Link>
        </li>
        <li>bistro logo</li>
      </NavButtons>
    </NavBar>
  );
}
