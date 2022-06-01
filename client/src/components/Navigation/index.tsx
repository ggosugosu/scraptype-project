import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NavBar, NavButton, NavDesc, NavLogo, NavButtons } from "./style";
import Image from "next/image";
import iconTag from "../../assets/images/ic_tag_default.svg";
import iconName from "../../assets/images/ic_name_default.svg";
import iconSettings from "../../assets/images/ic_settings_default.svg";
import logoLg from "../../assets/images/logo_lg.svg";
import logoSm from "../../assets/images/logo_sm.svg";
import logoBistro from "../../assets/images/logo_bistro.svg";

// TODO: recoil로 올려서 사용하면 편리할 듯
const useWindowWide = (size) => {
  const [width, setWidth] = useState(0);
  
  useEffect(()=> {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize;
    
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  },[setWidth]);

  return width > size
}

export default function Navigation() {
  const [logoSize, setLogoSize] = useState("");

  return (
    <NavBar>
      <Image src={useWindowWide(400) ? logoLg : logoSm} alt="Logo" className="logo-large" />
      
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
        <li>
          <Image src={logoBistro} alt="logo-bistro" />
        </li>
      </NavButtons>
    </NavBar>
  );
}
