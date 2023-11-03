import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import {
  gradeBackground,
  gradeNumber,
  GradeLevel,
  GradeName,
} from "../itemInfo";
import { ComponentLabel } from "@/components/common/components";
import { DOMparsedData } from "@/util/DOMparser";
import { getPublicImage } from "@/util/getPubliceImage";

import { ArmoryGem } from "@/types";

interface Props {
  gemList: ArmoryGem;
}

export const GemSlot = ({ gemList }: Props) => {
  const [hoverGemIndex, setHoverGemIndex] = useState(-1);

  const getGemIndex = (index: number) => {
    setHoverGemIndex(index);
  };
  const initGemIndex = () => {
    setHoverGemIndex(-1);
  };

  if (!gemList) {
    return <ComponentLabel>장착보석 0</ComponentLabel>;
  }

  const { Effects, Gems } = gemList;

  const getGemClassCount = () => {
    type GemData = {
      [key: string]: number;
    };
    let gemData: GemData = {};

    Gems.forEach(data => {
      const gemNameSplit = DOMparsedData(data.Name).innerText.split(" ");
      const gemClass = gemNameSplit[1][0] + gemNameSplit[1][1];
      if (!gemData[gemClass]) {
        gemData[gemClass] = 1;
      } else {
        gemData[gemClass] += 1;
      }
    });
    const gemClassList = Object.keys(gemData);
    const result = gemClassList.map(v => [v, gemData[v]]);
    return result;
  };

  return (
    <Container>
      <ComponentLabel>
        장착 보석{" "}
        <LabelSideInfo>
          (
          {getGemClassCount().map((v, index) => {
            return (
              <span key={index}>
                {index === 0 ? "" : " / "}
                {`${v[1]} ${v[0]}`}
              </span>
            );
          })}
          )
        </LabelSideInfo>
      </ComponentLabel>
      <SimpleGemList>
        {Gems.map((value, index) => {
          const { Level, Icon, Grade, Name } = value;
          const gradeLevel = gradeNumber[Grade as GradeName] as GradeLevel;
          const gemName = DOMparsedData(Name).innerText.split(" ");
          const gemClass = gemName[1][0] + gemName[1][1];

          return (
            <li
              key={index}
              onMouseEnter={() => getGemIndex(index)}
              onMouseLeave={initGemIndex}
            >
              <Image
                src={Icon}
                width={50}
                height={50}
                alt="보석"
                style={{ background: `${gradeBackground[gradeLevel]}` }}
              />
              <span>{`${Level} ${gemClass}`}</span>
            </li>
          );
        })}
      </SimpleGemList>
      <GemHoverInfo style={hoverGemIndex === -1 ? { display: "none" } : {}}>
        <Image
          src={Effects[hoverGemIndex]?.Icon || getPublicImage("logo")}
          width={50}
          height={50}
          alt="스킬"
        />
        <div>
          <p>{Effects[hoverGemIndex]?.Name}</p>
          <span>{Effects[hoverGemIndex]?.Description}</span>
        </div>
      </GemHoverInfo>
      <ComponentLabel>보석 상세</ComponentLabel>
      <GemInfoList>
        {Effects.map((value, index) => {
          const { Icon, Name, Description } = value;
          return (
            <GemList key={index}>
              <Image src={Icon} width={50} height={50} alt="보석" />
              <GemInfo>
                <p>{Name}</p>
                <span>{Description}</span>
              </GemInfo>
            </GemList>
          );
        })}
      </GemInfoList>
    </Container>
  );
};

const Container = styled.div``;

const LabelSideInfo = styled.span`
  font-size: 13px;
  color: orange;
`;

const SimpleGemList = styled.div`
  display: flex;

  & li {
    margin: 0 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & img {
      border-radius: 5px;
      cursor: pointer;
    }
  }
  & span {
    font-size: 12px;
    font-weight: bold;
  }
`;

const GemInfoList = styled.div`
  display: grid;
  grid-template-columns: 330px 330px;
  grid-gap: 20px;
`;
const GemList = styled.li`
  display: flex;
  align-items: center;

  & img {
    margin-right: 10px;
    border-radius: 5px;
  }
`;
const GemInfo = styled.div`
  display: flex;
  flex-direction: column;

  & p {
    margin: 0;
    font-weight: bold;
  }
  & span {
    font-size: 13px;
  }
`;

const GemHoverInfo = styled.div`
  padding: 20px;

  display: flex;
  position: absolute;
  transform: translateY(15px);

  width: 620px;
  border: 1px solid #7b7b7b;
  border-radius: 10px;
  background-color: #15181d;

  & img {
    margin-right: 10px;
  }

  & p {
    margin: 0;
    margin-bottom: 10px;
    font-weight: bold;
  }
`;
