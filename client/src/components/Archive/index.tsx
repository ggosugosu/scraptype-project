import React from "react";
import styled from "styled-components";
import ArchiveItem from "../../features/ArchiveItem";

const sampleList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ArchiveWrapper = styled.div`
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  gap: 12px;
  width: auto;
  height: auto;
  padding-bottom: 100px;
`;

export default function Archive() {
  return (
    <ArchiveWrapper>
      {sampleList.map((item, index) => (
        <ArchiveItem key={index} />
      ))}
    </ArchiveWrapper>
  );
}
