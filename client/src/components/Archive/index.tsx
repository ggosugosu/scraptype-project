import React from "react";
import styled from "styled-components";
import ArchiveItem from "../../features/ArchiveItem";

const sampleList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ArchiveWrapper = styled.div`
  display: flow-root;
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
