import styled from "styled-components";
import Image from "next/image";
import { contentFilter } from "./Fn";

// type
import { CalenderContents } from "@/types";

// style
import { commonStyles } from "../common/component-style";
import { AlignCenterP } from "../common/components";

interface Props {
  content: CalenderContents[];
}

export type ContentList = {
  [key: string]: CalenderContents[];
};

export const MainContents = ({ content }: Props) => {
  const { adventure } = contentFilter(content);
  // , island, fieldBoss, chaosGate

  return (
    <Container>
      <div style={commonStyles.innerContent}>
        <AlignCenterP>오늘의 모험 섬</AlignCenterP>
        {!adventure.length ? (
          <p>등장하는 모험 섬이 없습니다.</p>
        ) : (
          <Adventure>
            {adventure.map((value, index) => {
              const { ContentsIcon, ContentsName, StartTimes } = value;
              const start = StartTimes[0].split("T")[1];
              return (
                <li key={index}>
                  <Image
                    src={ContentsIcon}
                    width={50}
                    height={50}
                    alt="content-icon"
                  />
                  <div>{ContentsName}</div>
                  <div>{start}</div>
                </li>
              );
            })}
          </Adventure>
        )}
      </div>
      <div style={commonStyles.innerContent}>
        <AlignCenterP>필드보스</AlignCenterP>
      </div>
    </Container>
  );
};

const Container = styled.section`
  margin: 0 20px;
`;

const Adventure = styled.ul`
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
