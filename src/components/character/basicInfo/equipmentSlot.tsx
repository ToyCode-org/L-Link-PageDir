import styled from "styled-components";
import Image from "next/image";
import { getPublicImage } from "@/util/getPubliceImage";
import {
  GradeLevel,
  gradeBackground,
  gradeColor,
  gradeName,
} from "../itemInfo";
import { qualityCheck } from "../itemInfo";
import { DOMparsedData } from "@/util/DOMparser";
// types
import { Equipment, ArmoryEngraving } from "@/types";
import { ToolTip, EngravingData, IndentStringGroup, ElementType } from "..";

interface Props {
  type: string;
}
export const BlankEquipment = ({ type }: Props) => {
  return (
    <EquipmentItem>
      <div>
        <ItemType>{type === "어빌리티 스톤" ? "스톤" : type}</ItemType>
        <Image
          src={getPublicImage(`equipment/blank-slot`)}
          width={50}
          height={50}
          alt="blank-equipmnet"
        />
      </div>
    </EquipmentItem>
  );
};

interface EquipmentInfo {
  equipmentInfo: Equipment;
}
export const EquipmentSlot = ({ equipmentInfo }: EquipmentInfo) => {
  const tooltips = JSON.parse(equipmentInfo.Tooltip);
  const grade: GradeLevel = tooltips.Element_001.value.slotData.iconGrade;
  const qualityValue = tooltips.Element_001.value.qualityValue;

  // console.log(equipmentInfo);

  return (
    <EquipmentItem>
      <div>
        <ItemType>{equipmentInfo.Type}</ItemType>
        <Image
          src={equipmentInfo.Icon}
          width={50}
          height={50}
          style={{ background: `${gradeBackground[grade]}` }}
          alt="item"
        />
        <QualityProgress
          value={qualityValue}
          max={100}
          $quality={qualityCheck(qualityValue)}
        />
        <ProgressValue>{qualityValue}</ProgressValue>
      </div>
      <ItemName style={{ color: `${gradeColor[grade]}` }}>
        {equipmentInfo.Name}
      </ItemName>
    </EquipmentItem>
  );
};

interface MountedEngravingData {
  armoryEngraving: ArmoryEngraving;
}
export const MountedEngraving = ({ armoryEngraving }: MountedEngravingData) => {
  if (!armoryEngraving) return;

  const mountedEng = !armoryEngraving ? [] : armoryEngraving.Engravings;
  const engraveData = JSON.parse(mountedEng[0].Tooltip).Element_001.value
    .leftText;
  const parser = new DOMParser();
  const doc = parser.parseFromString(engraveData, "text/html");
  const getInnerText = doc.body.innerText.split(" ");
  const engravePoint = getInnerText[getInnerText.length - 1];

  return (
    <EngravingWrap>
      {mountedEng.map((eng, index) => {
        return (
          <li key={index}>
            <Image src={eng.Icon} width={50} height={50} alt="각인" />
            <EngLevelWrap>
              <span>{eng.Name}</span>
              <span>활성도{` ${engravePoint}`}</span>
            </EngLevelWrap>
          </li>
        );
      })}
    </EngravingWrap>
  );
};
const EngravingWrap = styled.div`
  margin-top: 12px;
  display: flex;
  & li {
    margin-right: 15px;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    & img {
      margin-right: 10px;
      border-radius: 50px;
    }
  }
`;
const EngLevelWrap = styled.div`
  display: flex;
  flex-direction: column;
  & span:first-child {
    color: orange;
  }
`;

interface AccessoryInfo {
  equipmentInfo: Equipment;
}
export const AccessorySlot = ({ equipmentInfo }: AccessoryInfo) => {
  const tooltips = JSON.parse(equipmentInfo.Tooltip);
  const typeName =
    equipmentInfo.Type === "어빌리티 스톤" ? "스톤" : equipmentInfo.Type;
  const grade: GradeLevel = tooltips.Element_001.value.slotData.iconGrade;
  const qualityValue = tooltips.Element_001.value.qualityValue;

  let stat: string[];
  let engravingData: EngravingData[] = [];

  // TODO : tooltip[value] type err : any type 수정 필요
  const getElementTypeNameStringGroup = (
    tooltip: ToolTip | any,
    elementType: ElementType,
  ) => {
    const keys = Object.keys(tooltip);

    for (const value of keys) {
      if (tooltip[value].type === elementType) {
        return value;
      }
    }
  };

  const getEngraving = (contentStr: IndentStringGroup) => {
    const egvFirst = contentStr?.Element_000.contentStr;
    const egvSecond = contentStr?.Element_001.contentStr;
    const egvThird = contentStr?.Element_002.contentStr;

    let text = `${egvFirst}${egvSecond}${egvThird}`;
    let doc = DOMparsedData(text);
    // replaceAll은 호출될 때마다 regex를 컴파일하기 때문에
    // 성능에 부정적 영향을 줄 수 있음. 다른 parsing 방법 필요
    let result: string | string[] = doc.innerText
      .split(" ")
      .join("")
      .replaceAll("]", " ");
    result = result.split("[");
    result.shift();

    let engravingLevel = result.map(value => {
      const data = value.split(" 활성도+");
      return {
        engravingName: data[0],
        level: data[1],
      };
    });
    return engravingLevel;
  };

  const indentStringGroupKey = getElementTypeNameStringGroup(
    tooltips,
    "IndentStringGroup",
  ) as string;
  switch (typeName) {
    case "팔찌": {
      stat = [""];
      // ## 1
      // const itemPartBox = getElementTypeNameStringGroup(
      //   tooltips,
      //   "ItemPartBox",
      // ) as string;
      // const statState = tooltips[itemPartBox].value.Element_001;
      // console.log(DOMparsedData(statState).innerHTML.split("<br>"));
      // console.log(JSON.parse(equipmentInfo.Tooltip));
      break;
    }
    case "스톤": {
      stat = tooltips.Element_004.value.Element_001.split("<BR>");
      const engravingState =
        tooltips[indentStringGroupKey].value.Element_000.contentStr;
      engravingData = getEngraving(engravingState);
      break;
    }
    default: {
      stat = tooltips.Element_005.value.Element_001?.split("<BR>");
      const engravingState = tooltips.Element_006.value.Element_000?.contentStr;
      engravingData = getEngraving(engravingState);
      break;
    }
  }

  return (
    <EquipmentItem>
      <div>
        <ItemType>{typeName}</ItemType>
        <Image
          src={equipmentInfo.Icon}
          width={50}
          height={50}
          style={{ background: `${gradeBackground[grade]}` }}
          alt="item"
        />
        {qualityValue >= 0 ? (
          <>
            <QualityProgress
              value={qualityValue}
              max={100}
              $quality={qualityCheck(qualityValue)}
            />
            <ProgressValue>{qualityValue}</ProgressValue>
          </>
        ) : null}
      </div>
      <StatsWrap>
        <ItemName style={{ color: `${gradeColor[grade]}` }}>
          {gradeName[grade]}
        </ItemName>
        <Stats>
          {stat?.map((statValue, index) => {
            return <li key={index}>{statValue}</li>;
          })}
        </Stats>
      </StatsWrap>
      <EngravingStats style={typeName !== "팔찌" ? {} : { display: "none" }}>
        {engravingData.map((value, index) => {
          return (
            <li key={index}>
              <EngravingLevel $index={index}>{value.level}</EngravingLevel>
              {value.engravingName}
            </li>
          );
        })}
      </EngravingStats>
    </EquipmentItem>
  );
};

const EquipmentItem = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;

  & img {
    border: 1px solid white;
    border-radius: 10px;
  }
`;
const ItemType = styled.span`
  padding: 2px;
  position: absolute;
  font-size: 10px;
  background-color: #52525276;
  border-radius: 10px 0 0 0;
`;

const QualityProgress = styled.progress<{ $quality: string }>`
  appearance: none;
  position: absolute;
  transform: translate(-51px, 45px);
  width: 50px;
  height: 10px;
  border: 1px solid white;
  border-radius: 3px;
  &::-webkit-progress-bar {
    background: black;
  }
  &::-webkit-progress-value {
    background-color: ${props => props.$quality};
  }
`;
const ProgressValue = styled.div`
  position: absolute;
  transform: translate(0px, -12px);
  width: 50px;
  height: 10px;
  font-size: 10px;
  text-align: center;
`;

const StatsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ItemName = styled.div`
  margin: 0 10px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 12px;
`;

const Stats = styled.div`
  margin: 0 10px;
  font-size: 12px;
`;

const EngravingStats = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  font-size: 12px;

  & li {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
  }
`;

const EngravingLevel = styled.span<{ $index: number }>`
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 14px;
  border-radius: 10px;
  font-size: 10px;
  background-color: ${props => {
    switch (props.$index) {
      case 0:
        return "blue";
      case 1:
        return "purple";
      case 2:
        return "#ff3232";
    }
  }};
`;
