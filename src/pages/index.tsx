import styled from "styled-components";
import { useState, useEffect } from "react";
import { loaAPI } from "./api/loa/loaAPI";
import { MainContents } from "@/components/home/mainContents";
import { Challenges } from "@/components/home/challenges";
import { SideBanner } from "@/components/home/sideBanner";

// type
import { MainCalenderContents } from "@/types";

export default function Home() {
  const [
    { challengeAbyss, challengeGuardian, content, events, notices },
    setContents,
  ] = useState<MainCalenderContents>({
    challengeAbyss: [],
    challengeGuardian: [],
    content: [],
    events: [],
    notices: [],
  });

  const getMainContents = async () => {
    const gameContents = loaAPI.getCalenderByGameContents();
    const challengeAbyssDungeons =
      loaAPI.getChallengeAbyssDungeonsByGameContents();
    const challengeGuardianRaid =
      loaAPI.getChallengeGuardianRaidsByGameContents();
    const events = loaAPI.getEvents();
    const notices = loaAPI.getNotices();
    const data = await Promise.all([
      gameContents,
      challengeAbyssDungeons,
      challengeGuardianRaid,
      events,
      notices,
    ]);

    const mainContent = {
      content: data[0].data,
      challengeAbyss: data[1].data,
      challengeGuardian: data[2].data.Raids,
      events: data[3].data,
      notices: data[4].data,
    };
    setContents(mainContent);
  };

  useEffect(() => {
    getMainContents();
  }, []);

  return (
    <>
      <Container>
        <Challenges
          challengeAbyss={challengeAbyss}
          challengeGuardian={challengeGuardian}
        />
        <MainContents content={content} />
        <SideBanner events={events} notices={notices} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
`;
