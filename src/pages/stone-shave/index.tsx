import styled from "styled-components";
import { useState } from "react";

// style
import { ComponentLabel } from "@/components/common/components";

export default function StoneShave() {
  type SlotCheck = boolean | 0;
  type SlotArray = SlotCheck[];
  const slotArray = Array.from({ length: 10 }).fill(0) as SlotArray;
  const slotInit = [slotArray, slotArray, slotArray];
  const slotNameInit = ["각인1", "각인2", "디버프"];

  const [slotName, setSlotName] = useState(slotNameInit);
  const [engravingSlots, setEngravingSlots] = useState(slotInit);

  const test = () => {
    setSlotName(slotNameInit);
    setEngravingSlots(slotInit);
  };

  return (
    <Container>
      <ComponentLabel>어빌리티 스톤 세공 시뮬레이터</ComponentLabel>
      <ShavingBox>
        <Recovery>
          <button onClick={test}>초기화</button>
          <button>되돌리기</button>
        </Recovery>
        <Content>
          <BoxHead>
            {slotName.map((name, index) => {
              return <NameSlot key={index}>{name}</NameSlot>;
            })}
          </BoxHead>
          <BoxBody>
            {engravingSlots.map((slot, index) => {
              return (
                <EngravingSlot key={index}>
                  {slot.map((value, idx) => {
                    return <CheckList key={idx}>{value}</CheckList>;
                  })}
                </EngravingSlot>
              );
            })}
          </BoxBody>
          <BoxFooter>
            <ControlTab>
              <button>성공</button>
              <button>실패</button>
            </ControlTab>
          </BoxFooter>
        </Content>
      </ShavingBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShavingBox = styled.div`
  width: 900px;
`;

const Recovery = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
`;

const BoxHead = styled.div``;
const NameSlot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
  background-color: blue;
`;
const BoxBody = styled.div``;

const EngravingSlot = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;
const CheckList = styled.div``;

const BoxFooter = styled.div``;

const ControlTab = styled.div``;
