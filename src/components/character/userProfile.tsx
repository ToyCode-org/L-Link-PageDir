import styled from "styled-components";
import Image from "next/image";
import { commonStyles } from "../common/component-style";
import { getPublicImage } from "@/util/getPubliceImage";
import { CharacterArmories } from "@/types";

interface Props {
  characterArmories: CharacterArmories;
}

export const UserProfile = ({ characterArmories }: Props) => {
  const {
    ServerName,
    GuildName,
    CharacterClassName,
    Title,
    CharacterLevel,
    ItemAvgLevel,
    ExpeditionLevel,
    PvpGradeName,
    TownLevel,
    TownName,
    CharacterImage,
    Stats,
    Tendencies,
  } = characterArmories.ArmoryProfile;
  const profileInfo = [
    ["서버", ServerName],
    ["길드", GuildName || " - "],
    ["클래스", CharacterClassName],
    ["칭호", Title || " - "],
    ["전투", CharacterLevel],
    ["아이템", ItemAvgLevel],
    ["원정대", ExpeditionLevel],
    ["PVP", PvpGradeName || " - "],
    ["영지", TownLevel ? `Lv.${TownLevel}${TownName}` : "-미개설-"],
  ];

  const collectibleItems = characterArmories.Collectibles;

  return (
    <UserProfileWrap>
      <UserData>
        <CharacterInfo>
          {profileInfo.map((list, index) => {
            return (
              <li key={index}>
                <span>{list[0]}</span>
                <span>{list[1]}</span>
              </li>
            );
          })}
        </CharacterInfo>
        <Image
          width={200}
          height={235}
          src={CharacterImage}
          alt="character-image"
          priority
        />
      </UserData>
      <UserCollections style={commonStyles.container}>
        <InfoName>수집형 포인트</InfoName>
        <CollectionList>
          {collectibleItems.map((collection, index) => {
            const { Point, Type } = collection;
            return (
              <li key={index}>
                <Image
                  src={getPublicImage(Type)}
                  width={25}
                  height={25}
                  alt={Type}
                />
                <span>{Point}</span>
              </li>
            );
          })}
        </CollectionList>
      </UserCollections>
      <UserStats style={commonStyles.container}>
        <InfoName>스탯 / 성향</InfoName>
        <StatList>
          {Stats.map((stat, index) => {
            const { Type, Value } = stat;
            return <li key={index}>{`${Type}: ${Value}`}</li>;
          })}
        </StatList>
        <StatHr />
        <StatList>
          {Tendencies.map((Tendencie, index) => {
            const { Type, Point } = Tendencie;
            return <li key={index}>{`${Type}: ${Point}`}</li>;
          })}
        </StatList>
      </UserStats>
    </UserProfileWrap>
  );
};

const UserProfileWrap = styled.div``;

const UserData = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #15181d; // res image 배경색
  border: 1px solid #7b7b7b;
  border-radius: 10px;

  & img {
    border-radius: 10px;
  }
`;

const CharacterInfo = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 140px;
  height: 260px;
  font-size: 13px;
  & li {
    padding-left: 10px;
    width: max-content;
    & span:first-child {
      margin-right: 10px;
      padding: 5px;
      background-color: black;
      border-radius: 5px;
    }
  }
`;

const UserCollections = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;
const InfoName = styled.p`
  margin: 0;
  padding: 5px;
  background-color: #15181d;
  border-radius: 10px 10px 0 0;
  text-align: center;
`;

const CollectionList = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;

  & li {
    margin: 0 5px 0 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & img {
      border-radius: 5px;
    }
  }
`;

const UserStats = styled.div`
  margin-bottom: 20px;
`;

const StatList = styled.div`
  padding: 15px;
`;

const StatHr = styled.hr`
  width: 80%;
`;
