import styled from "styled-components";
import Image from "next/image";
import { contentFilter } from "./Fn";

// type
import { CalenderContents } from "@/types";

// style
import { AlignCenterP } from "../common/components";

interface Props {
  content: CalenderContents[];
}

export type ContentList = {
  [key: string]: CalenderContents[];
};

export const MainContents = ({ content }: Props) => {
  const { adventure, island, fieldBoss, chaosGate } = contentFilter(content);

  type IslandContentList = [string, string, CalenderContents[]];
  const islandContentList: IslandContentList[] = [
    ["오늘의 모험 섬", "등장하는 모험 섬이 없습니다.", adventure],
    ["스케줄 섬", "등장하는 스케줄 섬이 없습니다.", island],
  ];

  const fieldContentList: CalenderContents[][] = [fieldBoss, chaosGate];

  return (
    <Container>
      {islandContentList.map((value, index) => {
        const [name, notToExistMsg, contentData] = value;
        return (
          <ContentWrap key={index}>
            <AlignCenterP>{name}</AlignCenterP>
            {!contentData.length ? (
              <p>{notToExistMsg}</p>
            ) : (
              <IslandContentWrap>
                {contentData.map((value1, index1) => {
                  const { ContentsIcon, ContentsName, StartTimes } = value1;
                  const start = StartTimes[0].split("T")[1];
                  return (
                    <li key={index1}>
                      <Image
                        src={ContentsIcon}
                        width={50}
                        height={50}
                        alt="content-icon"
                      />
                      <div>{ContentsName}</div>
                      <StartTimeColor>{start}</StartTimeColor>
                    </li>
                  );
                })}
              </IslandContentWrap>
            )}
          </ContentWrap>
        );
      })}
      {fieldContentList.map((fieldContent, index) => {
        const contentName = index === 0 ? "카오스게이트" : "필드보스";
        const startList = fieldContent.length;

        if (!startList) {
          return (
            <ContentWrap key={index}>
              <AlignCenterP>{contentName}</AlignCenterP>
              <span>등장하는 {contentName}가 없습니다.</span>
            </ContentWrap>
          );
        } else {
          const { ContentsIcon, StartTimes } = fieldContent[0];
          const startTime = StartTimes[0].split("T")[1];
          return (
            <ContentWrap key={index}>
              <AlignCenterP>{contentName}</AlignCenterP>
              <FieldContentBox>
                <Image
                  src={ContentsIcon}
                  width={50}
                  height={50}
                  alt={contentName}
                />
                <p>{contentName} 등장예정</p>
                <StartTimeColor>{startTime}</StartTimeColor>
              </FieldContentBox>
            </ContentWrap>
          );
        }
      })}
    </Container>
  );
};

const Container = styled.section`
  margin: 0 20px;
  width: 660px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrap = styled.div`
  padding-bottom: 25px;
  margin-bottom: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 600px;
  border: 1px solid #7b7b7b;
  border-radius: 10px;
  background-color: #15181d;

  font-weight: bold;
`;

const IslandContentWrap = styled.ul`
  display: grid;
  grid-template-columns: 150px 150px 150px;
  grid-gap: 15px;

  & li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const FieldContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StartTimeColor = styled.span`
  font-size: 16px;
  color: orange;
`;
