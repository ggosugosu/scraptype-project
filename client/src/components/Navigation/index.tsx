import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NavBar, NavButton, NavDesc, NavLogo, NavButtons } from "./style";
import Image from "next/image";
import iconTag from "../../assets/images/ic_tag_default.svg";
import iconName from "../../assets/images/ic_name_default.svg";
import iconSettings from "../../assets/images/ic_settings_default.svg";
import iconTagMobile from "../../assets/images/ic_tag_mobile.svg";
import iconNameMobile from "../../assets/images/ic_name_mobile.svg";
import iconSettingsMobile from "../../assets/images/ic_settings_mobile.svg";
import logoLg from "../../assets/images/logo_lg.svg";
import logoSm from "../../assets/images/logo_sm.svg";
import logoBistro from "../../assets/images/logo_bistro.svg";
import { useRecoilState } from "recoil";
import { windowWideState } from "./atom";

export default function Navigation() {
  const [width, setWidth] = useState(0);
  const [isWide, setIsWide] = useRecoilState(windowWideState);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setIsWide(width > 480);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <NavBar>
      <Link href="/" passHref>
        <Image src={isWide ? logoLg : logoSm} alt="Logo" className="logo" />
      </Link>
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
              <Image src={isWide ? iconSettings : iconSettingsMobile} alt="icon-settings" />
            </NavButton>
          </Link>
        </li>
        <li>
          <Link href="/search/tag/" passHref>
            <NavButton>
              <span>Tag Search</span>
              <Image src={isWide ? iconTag : iconTagMobile} alt="icon-tag" />
            </NavButton>
          </Link>
        </li>
        <li>
          <Link href="/search/font/" passHref>
            <NavButton>
              <span>Name Search</span>
              <Image src={isWide ? iconName : iconNameMobile} alt="icon-name" className="nav-icon" />
            </NavButton>
          </Link>
        </li>
        <li>
          <Image src={logoBistro} alt="logo-bistro" />
        </li>
      </NavButtons>
    </NavBar>
  );
}
