import styled from "styled-components";

// tyoe
import { AbyssDungeon, GuardianRaid } from "@/types";

interface Props {
  challengeAbyss: AbyssDungeon[];
  challengeGuardian: GuardianRaid[];
}

export const Challenges = ({ challengeAbyss, challengeGuardian }: Props) => {
  return (
    <Container>
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
    </Container>
  );
};

const Container = styled.section`
  width: 200px;
`;

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
  height: 80px;
  background-position: 100% 0%;

  & span {
    padding: 5px;
    color: #f7f3b2;
    font-weight: bold;
    font-size: 13px;
  }
`;
