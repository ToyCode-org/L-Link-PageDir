import React from "react";
import styled from "styled-components";
import { Character } from "@/types";
import { commonStyles } from "../common/component-style";
import { getPublicImage } from "@/util/getPubliceImage";
import Image from "next/image";
import Link from "next/link";

interface Props {
  characters: Character[];
  initIndexNumber: () => void;
}

export const AllCharacters = ({ characters, initIndexNumber }: Props) => {
  type CharactersInfo = {
    [key: string]: Character[];
  };

  let characterNameByServer: CharactersInfo = {};
  characters.forEach(info => {
    if (!characterNameByServer[info.ServerName]) {
      characterNameByServer[info.ServerName] = [info];
    } else {
      characterNameByServer[info.ServerName] = [
        ...characterNameByServer[info.ServerName],
        info,
      ];
    }
  });

  const objectKeys = Object.keys(characterNameByServer);
  return (
    <Container>
      {objectKeys.map((server, index) => {
        return (
          <React.Fragment key={index}>
            <ServerNameTag>{server}</ServerNameTag>
            <GridBox>
              {characterNameByServer[server]
                .sort(
                  (a, b) =>
                    Number(b.ItemAvgLevel.replaceAll(",", "")) -
                    Number(a.ItemAvgLevel.replaceAll(",", "")),
                )
                .map((subCharacters, index) => {
                  const {
                    ServerName,
                    ItemAvgLevel,
                    CharacterName,
                    CharacterLevel,
                    CharacterClassName,
                  } = subCharacters;

                  return (
                    <CharacterCard
                      key={index}
                      style={commonStyles.innerContent}
                      onClick={initIndexNumber}
                      href={`/character/${CharacterName}`}
                    >
                      <CardInnerFlex>
                        <Image
                          src={getPublicImage(`class/${CharacterClassName}`)}
                          width={50}
                          height={50}
                          alt="직업이미지"
                          onError={(e: any) =>
                            (e.target.src = `${getPublicImage("로아RPG로고")}`)
                          }
                        />
                        <CardInfo>
                          <InfoBody>
                            <GuildName>{ServerName}</GuildName>
                            <span>{CharacterClassName}</span>
                          </InfoBody>
                          <InfoBody>
                            <CombatLvl>Lv.{CharacterLevel}</CombatLvl>
                            <span style={{ color: "orange" }}>
                              {ItemAvgLevel}
                            </span>
                          </InfoBody>
                        </CardInfo>
                      </CardInnerFlex>
                      <CardFooter>{CharacterName}</CardFooter>
                    </CharacterCard>
                  );
                })}
            </GridBox>
          </React.Fragment>
        );
      })}
    </Container>
  );
};

const Container = styled.div``;

const GridBox = styled.ul`
  display: grid;
  justify-content: space-between;
  grid-template-columns: 330px 330px;
  grid-row-gap: 30px;
`;

const ServerNameTag = styled.p`
  padding: 5px;
  border: 1px solid #7b7b7b;
  border-radius: 5px;
  background-color: black;
  font-weight: bold;
`;

const CharacterCard = styled(Link)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const CardInnerFlex = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;

  & img {
    border-radius: 25px;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

const InfoBody = styled.div`
  margin-left: 15px;

  & span {
    margin-right: 10px;
  }
`;

const GuildName = styled.span`
  color: skyblue;
`;

const CombatLvl = styled.span``;

const CardFooter = styled.span`
  padding-bottom: 10px;
  margin-left: 10px;
  font-weight: bold;
`;
