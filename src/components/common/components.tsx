import React from "react";
import styled from "styled-components";

interface LabelProps {
  children: React.ReactNode;
}
export const ComponentLabel = ({ children }: LabelProps) => {
  return <BoxLabel>{children}</BoxLabel>;
};

const BoxLabel = styled.p`
  font-weight: bold;
  font-size: 18px;
`;
