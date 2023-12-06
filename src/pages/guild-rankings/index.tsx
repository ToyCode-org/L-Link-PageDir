import styled from "styled-components";
import { loaAPI } from "../api/loa/loaAPI";
import { useState } from "react";

// type
import { GuildRanking } from "@/types";

export default function GuildRankings() {
  const [guildList, setGuildList] = useState<GuildRanking[]>([]);

  const getServerRankings = async (name: string) => {
    const data = await loaAPI.getGuildRankings(name);
    setGuildList(data.data);
  };

  const serverList = [
    "니나브",
    "루페온",
    "실리안",
    "아만",
    "아브렐슈드",
    "카단",
    "카마인",
    "카제로스",
  ];

  // TODO : Card UI 수정 필요
  return (
    <Container>
      <NameTagP>길드 랭킹</NameTagP>
      <BtnWrap>
        {serverList.map((serverName, index) => {
          return (
            <SelectBtn
              key={index}
              onClick={() => getServerRankings(serverName)}
            >
              {serverName}
            </SelectBtn>
          );
        })}
      </BtnWrap>
      <RankListWrap>
        {guildList.map((guild, index) => {
          const {
            Rank,
            Rating,
            GuildName,
            GuildMessage,
            MemberCount,
            MaxMemberCount,
            MasterName,
          } = guild;
          return (
            <RankList key={index}>
              <RankNumber>{Rank}</RankNumber>
              <RankListBody>
                <p>
                  길드명 : {GuildName}
                  <span>({Rating} RP)</span>
                </p>
                <GuildMaster>길마 : {MasterName}</GuildMaster>
                <GuildMsg>{GuildMessage}</GuildMsg>
                <MemberCnt>{`${MemberCount} / ${MaxMemberCount}`}</MemberCnt>
              </RankListBody>
            </RankList>
          );
        })}
      </RankListWrap>
    </Container>
  );
}

const Container = styled.div``;

const NameTagP = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 24px;
`;

const BtnWrap = styled.div`
  margin-bottom: 50px;
  display: flex;
  justify-content: space-evenly;
`;

const SelectBtn = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border: 2px solid #7b7b7b;
  border-radius: 10px;
  background-color: #15181d;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    background-color: #4b4b4b;
  }
`;

const RankListWrap = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`;

const RankList = styled.li`
  display: flex;
  align-items: center;

  width: 550px;
  height: 180px;
  border: 2px solid #7b7b7b;
  border-radius: 10px;
  background-color: #15181d;
`;

const RankNumber = styled.div`
  margin-right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 160px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  border-right: 2px solid #7b7b7b;
`;

const RankListBody = styled.div`
  width: 400px;

  & p {
    font-size: 18px;
    font-weight: bold;
    & span {
      margin: 0 10px;
      font-size: 12px;
      font-weight: bold;
    }
  }
`;

const GuildMaster = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 18px;
`;

const GuildMsg = styled.div`
  margin-bottom: 10px;
`;

const MemberCnt = styled.div`
  font-size: 12px;
  font-weight: bold;
  text-align: right;
`;
