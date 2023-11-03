import styled from "styled-components";
import Image from "next/image";
import { CharacterArmories, Equipment } from "@/types";
import {
  BlankEquipment,
  EquipmentSlot,
  AccessorySlot,
  MountedEngraving,
} from "./basicInfo/equipmentSlot";
import { ComponentLabel } from "../common/components";

interface Props {
  characterArmories: CharacterArmories;
}

export const BasicInfo = ({ characterArmories }: Props) => {
  const {
    // ArmoryAvatars,
    // ArmoryCard,
    ArmoryEngraving,
    ArmoryEquipment,
    // ArmoryGem,
    // ArmoryProfile,
  } = characterArmories;

  let EQUIPMENTS: (string | Equipment)[] = [
    "투구",
    "어깨",
    "상의",
    "하의",
    "장갑",
    "무기",
    "목걸이",
    "귀걸이",
    "귀걸이",
    "반지",
    "반지",
    "팔찌",
    "어빌리티 스톤",
  ];

  ArmoryEquipment.forEach(item => {
    const idx = EQUIPMENTS.indexOf(item.Type);
    if (idx !== -1) EQUIPMENTS[idx] = item;
  });

  const equipments = [
    EQUIPMENTS[0],
    EQUIPMENTS[1],
    EQUIPMENTS[2],
    EQUIPMENTS[3],
    EQUIPMENTS[4],
    EQUIPMENTS[5],
  ];
  const accessories = [
    EQUIPMENTS[6],
    EQUIPMENTS[7],
    EQUIPMENTS[8],
    EQUIPMENTS[9],
    EQUIPMENTS[10],
    EQUIPMENTS[11],
    EQUIPMENTS[12],
  ];

  const effectLevels = ArmoryEngraving?.Effects.map(value => {
    const { Name, Icon } = value;
    const [name, level] = Name.split(" Lv. ");
    return {
      name,
      level,
      icon: Icon,
    };
  });

  return (
    <Container>
      <ComponentLabel>장비</ComponentLabel>
      <Content>
        <Equipments>
          <EquipmentList>
            {equipments.map((item, index) => {
              if (typeof item === "string") {
                return <BlankEquipment key={index} type={item} />;
              }
              return <EquipmentSlot key={index} equipmentInfo={item} />;
            })}
            <MountedEngraving armoryEngraving={ArmoryEngraving} />
          </EquipmentList>
          <Accessory>
            {accessories.map((item, index) => {
              if (typeof item === "string") {
                return <BlankEquipment key={index} type={item} />;
              }
              return <AccessorySlot key={index} equipmentInfo={item} />;
            })}
          </Accessory>
        </Equipments>
        <EngravingEffect>
          <ComponentLabel>
            각인<span>{` (${effectLevels?.map(v => v.level) || "0"})`}</span>
          </ComponentLabel>
          <EffectsWrap>
            {effectLevels?.map((value, index) => {
              const { name, level, icon } = value;

              return (
                <EngravingEffectList
                  key={index}
                  style={
                    level === "3" ? { color: "orange" } : { color: "skyblue" }
                  }
                >
                  <Image src={icon} width={50} height={50} alt="effects" />
                  <span>{`${name}(${level})`}</span>
                </EngravingEffectList>
              );
            })}
          </EffectsWrap>
        </EngravingEffect>
      </Content>
    </Container>
  );
};

const Container = styled.div``;

const Content = styled.div``;

const Equipments = styled.div`
  display: flex;
`;

const EquipmentList = styled.div`
  width: 340px;
`;
const Accessory = styled.div`
  width: 340px;
`;

const EngravingEffect = styled.div`
  & p {
    font-weight: bold;

    & span {
      font-size: 14px;
      color: orange;
    }
  }
  & li {
    font-weight: bold;
  }
`;

const EffectsWrap = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 110px 110px 110px 110px 110px 110px;
`;
const EngravingEffectList = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    border-radius: 25px;
  }
  & span {
    font-size: 12px;
  }
`;
