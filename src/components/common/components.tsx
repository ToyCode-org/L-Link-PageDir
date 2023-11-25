import React from "react";
import styled from "styled-components";

interface ChildrenProps {
  children: React.ReactNode;
}
export const ComponentLabel = ({ children }: ChildrenProps) => {
  return <BoxLabel>{children}</BoxLabel>;
};

const BoxLabel = styled.p`
  font-weight: bold;
  font-size: 18px;
`;

export const AlignCenterP = ({ children }: ChildrenProps) => {
  return <AlignCenterLabel>{children}</AlignCenterLabel>;
};

const AlignCenterLabel = styled.p`
  margin: 10px 0 30px 0;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  border-bottom: "1px solid #7b7b7b";
`;
