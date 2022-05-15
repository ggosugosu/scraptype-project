import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { NavBar } from "./style";
import { DashLineHorizontal } from "../globalStyle";

export default function Navigation() {
  return (
    <NavBar>
      <Link href="/" passHref>
        <button>TagType</button>
      </Link>
      <div>Before memorizing the names and shapes of 10,000 fonts, I'm glad we were able to create this site.</div>
      <DashLineHorizontal />
      <div>Home</div>
      <DashLineHorizontal />
      <div>TagType</div>
      <DashLineHorizontal />
      <div>TagSearch</div>
      <DashLineHorizontal />
      <Link href="/admin-font-tag" passHref>
        <button>관리자 페이지</button>
      </Link>
      <DashLineHorizontal />
      bistro logo
    </NavBar>
  );
}
