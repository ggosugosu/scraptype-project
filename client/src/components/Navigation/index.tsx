import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { NavBar } from "./style";
import { DashLineHorizontal } from "../globalStyle";

export default function Navigation() {
  return (
    <NavBar>
      <h1>TagType</h1>
      <div>Before memorizing the names and shapes of 10,000 fonts, I'm glad we were able to create this site.</div>
      <DashLineHorizontal />
      <Link href="/" passHref>
        <button>Home</button>
      </Link>
      <DashLineHorizontal />
      <Link href="/search/tag/" passHref>
        <button>TagSearch</button>
      </Link>
      <DashLineHorizontal />
      <Link href="/search/font/" passHref>
        <button>FontSearch</button>
      </Link>
      <DashLineHorizontal />
      <Link href="/admin/font-tag" passHref>
        <button>관리자 페이지</button>
      </Link>
      <DashLineHorizontal />
      bistro logo
    </NavBar>
  );
}
