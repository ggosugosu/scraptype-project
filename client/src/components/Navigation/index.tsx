import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { NavBar, NavButton, NavDesc, NavLogo } from "./style";
import { DashLineHorizontal } from "../globalStyle";
import Image from "next/image";

export default function Navigation() {
  return (
    <NavBar>
      <NavLogo>
        <Image src="/" alt="Logo" width="288" height="100" />
      </NavLogo>
      
      <NavDesc>Before memorizing the names and shapes of 10,000 fonts, I'm glad we were able to create this site.</NavDesc>
      <DashLineHorizontal />
      <ul>
        <li>
          <Link href="/" passHref>
            <NavButton>
              H<span>ome</span>
            </NavButton>
          </Link>
          <DashLineHorizontal />
        </li>
        <li>
          <Link href="/search/tag/" passHref>
            <NavButton>
              Tag<span>Search</span>
            </NavButton>
          </Link>
          <DashLineHorizontal />
        </li>
        <li>
          <Link href="/search/font/" passHref>
            <NavButton>
              Font<span>Search</span>
            </NavButton>
          </Link>
          <DashLineHorizontal />
        </li>
        <li>
          <Link href="/admin/font-tag" passHref>
            <NavButton>
              관리자<span>페이지</span>
            </NavButton>
          </Link>
          <DashLineHorizontal />
        </li>
        <li>bistro logo</li>
      </ul>
    </NavBar>
  );
}
