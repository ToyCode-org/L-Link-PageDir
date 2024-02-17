import styled from "styled-components";
import { useIndexHandler } from "@/hooks/useIndexHandler";
import { UserProfile } from "@/components/character/userProfile";
import { BasicInfo } from "@/components/character/basicInfo";
import { GemSlot } from "@/components/character/basicInfo/gemSlot";
import { CardSlot } from "@/components/character/basicInfo/cardSlot";
import { Collections } from "@/components/character/collections";
import { AllCharacters } from "@/components/character/AllCharacters";
// import { Skills } from "@/components/character/skills"; // 스킬 탭 추가 예정

// style
import { commonStyles } from "@/components/common/component-style";

// type
import { Characters, CharacterArmories } from "@/types";

type getUserInfo =
  | {
      msg: string;
      characters: Characters;
      characterArmories: CharacterArmories | null;
      characterName: string | null;
    }
  | any;

export default function SearchCharacter({ data }: getUserInfo) {
  const { msg, characters, characterArmories, characterName } = data;

  const detailInfoNav = ["기본정보", "스킬", "수집", "보유 캐릭터"]; //스킬 탭 추가 예정
  const { indexNumber, indexHandler } = useIndexHandler();

  const initIndexNumber = () => {
    indexHandler(0);
  };

  if (msg !== "success") {
    return (
      <div
        style={{
          marginTop: "300px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
        }}
      >
        존재하지 않는 캐릭터입니다.
      </div>
    );
  }

  return (
    <ContentWrap>
      <NameBox style={commonStyles.container}>
        <p>{characterName}</p>
        <span></span>
        {/* TODO : 갱신버튼 등 추가 예정 */}
      </NameBox>
      <InterfaceBox>
        <UserProfile characterArmories={characterArmories} />
        <DetailInfo style={commonStyles.container}>
          <DetailInfoNav>
            {detailInfoNav.map((infos, index) => {
              if (index === 1) return;
              return (
                <li key={index} onClick={() => indexHandler(index)}>
                  {infos}
                </li>
              );
            })}
          </DetailInfoNav>
          {indexNumber === 0 ? (
            <>
              <BasicInfo characterArmories={characterArmories} />
              <GemSlot gemList={characterArmories.ArmoryGem} />
              <CardSlot cardList={characterArmories.ArmoryCard} />
            </>
          ) : null}
          {/* {indexNumber === 1 ? <Skills /> : null} */}
          {indexNumber === 2 ? (
            <Collections collectibles={characterArmories.Collectibles} />
          ) : null}
          {indexNumber === 3 ? (
            <AllCharacters
              characters={characters}
              initIndexNumber={initIndexNumber}
            />
          ) : null}
        </DetailInfo>
      </InterfaceBox>
    </ContentWrap>
  );
}

const ContentWrap = styled.div`
  padding: 15px;
`;

const NameBox = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & p {
    margin-left: 15px;
    padding: 0 10px 0 10px;
    font-size: 18px;
    font-weight: bold;
  }
`;

const InterfaceBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailInfo = styled.div`
  padding: 10px;
  width: 680px;
  border: 1px solid #7b7b7b;
  border-radius: 10px;
`;

const DetailInfoNav = styled.nav`
  display: flex;
  justify-content: center;

  & li {
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #15181d;
    font-weight: bold;
    cursor: pointer;

    &:first-child {
      border-radius: 10px 0 0 10px;
    }
    &:last-child {
      border-radius: 0 10px 10px 0;
    }

    &:hover {
      background-color: #080a0c;
    }
  }
`;

import { loaAPI } from "../api/loa/loaAPI";

export async function getServerSideProps(context: any) {
  const { query } = context;
  const characterName = query.slug;
  const getAllCharacters = loaAPI.getCharacters(characterName);
  const getCharacterArmories = loaAPI.getArmories(characterName);
  const getUserInfo = await Promise.all([
    getAllCharacters,
    getCharacterArmories,
  ]);

  let data: getUserInfo = {
    msg: "cannot found this user",
    characters: [],
    characterArmories: null,
    characterName: null,
  };

  if (getUserInfo[0].data) {
    (data.characters = getUserInfo[0]?.data),
      (data.characterArmories = getUserInfo[1]?.data);
    data.msg = "success";
    data.characterName = characterName;
  }

  return {
    props: {
      data,
    },
  };
}
