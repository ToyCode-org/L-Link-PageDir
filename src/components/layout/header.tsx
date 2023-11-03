import styled from "styled-components";
import Link from "next/link";
import { goHome } from "@/router/router";
import { SearchCharacter } from "./searchCharacter";

export const Header = () => {
  return (
    <HeaderWrap>
      <HeaderTop>
        <Title onClick={goHome}>LoaLink</Title>
        <SearchCharacter />
      </HeaderTop>
      <HeaderNav>
        <Link href="/">홈</Link>
        <Link href="/guild-rankings">길드</Link>
        <Link href="/rankings">순위</Link>
        <Link href="/statistics">통계</Link>
        <Link href="/stone-shave">세공</Link>
      </HeaderNav>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #0f0f0f;
  z-index: 1;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0 10px 0;
`;

const Title = styled.h1`
  width: fit-content;
  margin: 0;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    filter: brightness(0.5);
  }
`;

const HeaderNav = styled.nav`
  display: flex;
  justify-content: center;
  border-top: 1px solid #7b7b7b;
  border-bottom: 1px solid #7b7b7b;
  background-color: #1b1b1b;
  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    width: 120px;
    height: 40px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #2e2e2e;
    }
  }
`;
