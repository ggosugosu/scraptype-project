import styled from "styled-components";
import { black } from "common/colors";

export const Item = styled.button`
  position: relative;
  display: flex;
  flex-flow: column wrap;
  width: 316px;
  height: 186px;
  .item-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 316px;
    height: 186px;
    padding: 20px 0px;
  }
`;

export const ItemTitle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px dotted ${black};
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 8px;
  h1 {
    margin: 0;
    font-size: 20px;
    font-family: "Elice-R", "Gothic-R", sans-serif;
  }
  span {
    font-family: "Elice-R", "Gothic-R", sans-serif;
    font-size: 12px;
    text-align: right;
  }
`;

export const ItemContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 88px;
  padding-left: 24px;
  padding-right: 24px;
  p {
    display: -webkit-box;
    margin: 0;
    padding: 20px 0 0 0;
    font-family: "Elice-R", "Gothic-R", sans-serif;
    font-size: 12px;
    text-align: left;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;