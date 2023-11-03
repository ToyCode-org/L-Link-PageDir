import styled from "styled-components";
import { useState, useEffect } from "react";
import { loaAPI } from "./api/loa/loaAPI";
import { MainContents } from "@/components/home/mainContents";

// type
import { MainCalenderContents } from "@/types";

export default function Home() {
  const [{ challengeAbyss, challengeGuardian, content }, setContents] =
    useState<MainCalenderContents>({
      challengeAbyss: [],
      challengeGuardian: [],
      content: [],
    });

  const getMainContents = async () => {
    const gameContents = loaAPI.getCalenderByGameContents();
    const challengeAbyssDungeons =
      loaAPI.getChallengeAbyssDungeonsByGameContents();
    const challengeGuardianRaid =
      loaAPI.getChallengeGuardianRaidsByGameContents();
    const data = await Promise.all([
      gameContents,
      challengeAbyssDungeons,
      challengeGuardianRaid,
    ]);

    const mainContent = {
      content: data[0].data,
      challengeAbyss: data[1].data,
      challengeGuardian: data[2].data.Raids,
    };
    setContents(mainContent);
  };

  useEffect(() => {
    getMainContents();
  }, []);

  return (
    <>
      <Container>
        <Challenges>
          <ChallengeContent>
            <p>도전 어비스 던전</p>
            <ul>
              {challengeAbyss.map((value, index) => {
                return (
                  <ChallengeList
                    key={index}
                    style={{ backgroundImage: `url(${value.Image})` }}
                  >
                    <span>{value.Name}</span>
                  </ChallengeList>
                );
              })}
            </ul>
          </ChallengeContent>
          <ChallengeContent>
            <p>도전 가디언 토벌</p>
            <ul>
              {challengeGuardian.map((value, index) => {
                return (
                  <ChallengeList
                    key={index}
                    style={{ backgroundImage: `url(${value.Image})` }}
                  >
                    <span>{value.Name}</span>
                  </ChallengeList>
                );
              })}
            </ul>
          </ChallengeContent>
        </Challenges>
        <MainContents content={content} />
        <SideContent>home</SideContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
`;
const Challenges = styled.section``;

const ChallengeContent = styled.div`
  margin-bottom: 25px;
  border: 1px solid #7b7b7b;
  border-radius: 10px;
  background-color: #15181d;

  & p {
    margin: 0;
    padding: 5px;
    text-align: center;
    font-weight: bold;
  }
`;

const ChallengeList = styled.li`
  display: flex;
  align-items: end;
  width: 200px;
  height: 80px;
  background-position: 100% 0%;

  & span {
    padding: 5px;
    color: #f7f3b2;
    font-weight: bold;
    font-size: 13px;
  }
`;

const SideContent = styled.aside``;
