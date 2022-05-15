import React from "react";
import styled from "styled-components";
import { NavBar } from "./style";
import { DashLineHorizontal } from "../globalStyle";

export default function Navigation() {
  return (
    <NavBar>
      <div>TagType</div>
      <div>Before memorizing the names and shapes of 10,000 fonts, I'm glad we were able to create this site.</div>
      <DashLineHorizontal />
      <div>Home</div>
      <DashLineHorizontal />
      <div>TagType</div>
      <DashLineHorizontal />
      <div>TagSearch</div>
      <DashLineHorizontal />
      bistro logo
    </NavBar>
  );
}
