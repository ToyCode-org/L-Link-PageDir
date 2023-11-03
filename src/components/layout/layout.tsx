import React from "react";
import styled from "styled-components";
import { Meta } from "./meta";
import { Header } from "./header";
import { useLoadingCheck } from "@/hooks/useLoadingCheck";
import { LoadingSpinner } from "@/util/loadingSpinner";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const nowLoading = useLoadingCheck();

  return (
    <BaseStyle>
      <Meta />
      <Header />
      <Content>{children}</Content>
      {nowLoading ? <LoadingSpinner /> : null}
    </BaseStyle>
  );
}

const BaseStyle = styled.div`
  color: white;
  background-color: #0f0f0f;

  & ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  & a {
    text-decoration: none;
    &:link {
      color: white;
    }
    &:visited {
      color: white;
    }
  }
`;

const Content = styled.main`
  margin: 0 auto;
  margin-top: 120px;
  width: 1100px;
`;
