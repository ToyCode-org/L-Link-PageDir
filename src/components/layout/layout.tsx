import React from "react";
import styled from "styled-components";
import { Meta } from "./meta";
import { Header } from "./header";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Meta />
      <div>
        <Header />
        <Content>{children}</Content>
      </div>
    </>
  );
}

const Content = styled.main`
  margin: 0 auto;
  margin-top: 120px;
  width: 1100px;
`;
