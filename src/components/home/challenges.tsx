import styled from "styled-components";

// tyoe
import { AbyssDungeon, GuardianRaid, Notices } from "@/types";

interface Props {
  notices: Notices[];
  challengeAbyss: AbyssDungeon[];
  challengeGuardian: GuardianRaid[];
}

export const Challenges = ({
  notices,
  challengeAbyss,
  challengeGuardian,
}: Props) => {
  const contentList = [challengeAbyss, challengeGuardian];
  return (
    <Container>
      <NoticeList>
        <p>로아 공지사항</p>
        <ul>
          {notices.map((notic, index) => {
            const { Link, Title } = notic;
            const isUpdate = Title.indexOf("업데이트 내역 안내");
            if (isUpdate !== -1 && index < 31) {
              const updateDay = new Date(notic.Date);
              const month = updateDay.getMonth() + 1;
              const date = updateDay.getDate();
              const monthFormat = month < 10 ? `0${month}` : month;
              const dateFormat = date < 10 ? `0${date}` : date;
              return (
                <li key={index}>
                  <a href={Link} target={"_blank"}>
                    {`${monthFormat}월 ${dateFormat}일(수) 업데이트 내역`}
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </NoticeList>
      {contentList.map((list, index) => {
        return (
          <ChallengeContent key={index}>
            <p>{index === 0 ? "도전 어비스 던전" : "도전 가디언 토벌"}</p>
            <ul>
              {list.map((value, idx) => {
                return (
                  <ChallengeList
                    key={idx}
                    style={{ backgroundImage: `url(${value.Image})` }}
                  >
                    <span>{value.Name}</span>
                  </ChallengeList>
                );
              })}
            </ul>
          </ChallengeContent>
        );
      })}
    </Container>
  );
};

const Container = styled.section`
  width: 250px;
`;

const NoticeList = styled.div`
  margin-bottom: 25px;
  padding: 7px;
  border: 1px solid #7b7b7b;
  border-radius: 10px;
  background-color: #15181d;

  & p {
    margin: 0;
    margin-bottom: 12px;
    padding: 5px;
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid #7b7b7b;
  }

  & li {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    font-size: 15px;
    font-weight: bold;
  }
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
