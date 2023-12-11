import styled from "styled-components";
import { useState } from "react";
import { EditIcon } from "@/components/common/icons";

// style
import { ComponentLabel } from "@/components/common/components";

// type
import { FormEvent, SelectEvent } from "@/types";

export default function StoneShave() {
  type SlotCheck = boolean | number; // 0: none 1: success 2: fail
  type SlotArray = SlotCheck[];
  type SumulatorInfo = {
    nameEditIndex: number;
    recommanIndex: number;
    successPercentage: number;
    engravingGoal: string;
  };

  const slotArray = Array.from({ length: 10 }).fill(0) as SlotArray;
  const slotInit = [slotArray, slotArray, slotArray];
  const slotNameInit = ["각인1", "각인2", "디버프"];
  const simulatorInit: SumulatorInfo = {
    nameEditIndex: -1,
    recommanIndex: -1,
    successPercentage: 75,
    engravingGoal: "77",
  };

  const [slotName, setSlotName] = useState(slotNameInit);
  const [engravingSlots, setEngravingSlots] = useState(slotInit);
  const [
    { nameEditIndex, recommanIndex, successPercentage, engravingGoal },
    setSimulator,
  ] = useState<SumulatorInfo>(simulatorInit);

  const initShaving = () => {
    if (window.confirm("초기화 할까요??")) {
      setSlotName(slotNameInit);
      setEngravingSlots(slotInit);
      setSimulator(simulatorInit);
    }
  };

  const closeNameEditer = () => {
    setSimulator(prev => ({ ...prev, nameEditIndex: -1 }));
  };

  const openNameEditer = (index: number) => {
    setSimulator(prev => ({ ...prev, nameEditIndex: index }));
  };

  const editSlotName = (e: FormEvent) => {
    e.preventDefault();
    const value = e.target[0].value;
    let prevSlotName = slotName;
    prevSlotName[nameEditIndex] = value;
    setSlotName(prevSlotName);
    closeNameEditer();
  };

  const selectEngravingGoal = (e: SelectEvent) => {
    const value = e.target.value;
    setSimulator(prev => ({ ...prev, engravingGoal: value }));
  };

  return (
    <Container>
      <ComponentLabel>어빌리티 스톤 세공 시뮬레이터</ComponentLabel>
      <ShavingBox>
        <Recovery>
          <button className="init" onClick={initShaving}>
            초기화
          </button>
          <button>되돌리기</button>
        </Recovery>
        <ShavingInfo>
          <div>
            <span>목표 각인</span>
            <select onChange={selectEngravingGoal}>
              <option value="77">7/7</option>
              <option value="97">9/7</option>
              <option value="79">7/9</option>
            </select>
          </div>
          <Percentage>성공률 {successPercentage}%</Percentage>
        </ShavingInfo>
        <Content>
          <BoxHead>
            {slotName.map((name, index) => {
              const isDebuff = index === 2 ? true : false;
              const isEditable = index === nameEditIndex ? true : false;
              const goalPoint = index !== 2 ? engravingGoal[index] : null;
              return (
                <NameSlot key={index}>
                  {isEditable ? (
                    <EditForm onSubmit={editSlotName}>
                      <input type="text" defaultValue={name} maxLength={10} />
                      <div>
                        <button type="submit">수정</button>
                        <button onClick={closeNameEditer}>취소</button>
                      </div>
                    </EditForm>
                  ) : (
                    <>
                      <span style={isDebuff ? { color: "red" } : {}}>
                        {goalPoint ? (
                          <GoalPoint>{`(${goalPoint})`}</GoalPoint>
                        ) : null}
                        {name}
                      </span>
                      <EditBtn onClick={() => openNameEditer(index)}>
                        {isDebuff || <EditIcon />}
                      </EditBtn>
                    </>
                  )}
                </NameSlot>
              );
            })}
          </BoxHead>
          <BoxBody>
            {engravingSlots.map((slot, index) => {
              const isDebuff = index === 2;
              return (
                <EngravingLIne key={index}>
                  <EngravingSlot
                    style={isDebuff ? { color: "red" } : { color: "blue" }}
                  >
                    {slot.map((value, idx) => {
                      const slotIcon = value === 0 ? "◇" : "◆";
                      const isFail = value === 2;
                      const IconColor = isFail ? { color: "black" } : {};
                      return (
                        <CheckList key={idx} style={IconColor}>
                          {slotIcon}
                        </CheckList>
                      );
                    })}
                  </EngravingSlot>
                  <ControlTab>
                    <button>성공</button>
                    <button className="fail">실패</button>
                  </ControlTab>
                </EngravingLIne>
              );
            })}
          </BoxBody>
          <BoxFooter>
            <span>{recommanIndex === 0 ? "★ 추천" : "-"}</span>
            <span>{recommanIndex === 1 ? "★ 추천" : "-"}</span>
            <span>{recommanIndex === 2 ? "★ 추천" : "-"}</span>
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

  & button {
    height: 35px;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    background: #4c4cd5;

    cursor: pointer;
    &:hover {
      filter: brightness(0.8);
    }
  }
  & .init {
    background: #cf3f3f;
  }
`;

const ShavingInfo = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 18px;
  font-weight: bold;

  & select {
    margin-left: 10px;
    width: 70px;
    height: 30px;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    border: 2px solid #7b7b7b;
    border-radius: 10px;
    background-color: black;
    color: white;
    & option {
      text-align: center;
    }
  }
`;

const Percentage = styled.div`
  margin: 0 10px 20px 0;
  text-align: right;
`;

const Content = styled.div`
  display: flex;
  border-radius: 20px;
  border: 2px solid #7b7b7b;
  background-color: #15181d;
`;

const BoxHead = styled.div`
  font-size: 16px;
`;

const NameSlot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 100px;
  border-right: 2px solid #7b7b7b;

  font-weight: bold;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 200px;

  & input {
    width: 195px;
    height: 25px;
    border: none;
    border: 1px solid #7b7b7b;
    border-radius: 5px;
    background-color: #15181d;
    color: white;
    font-size: 16px;
    font-weight: bold;
  }
  & button {
    margin-left: 7px;
    color: white;
    font-weight: bold;
    background: none;
    border: none;

    transition: 0.2s;
    cursor: pointer;
    &:hover {
      color: black;
      background: white;
    }
  }
`;

const GoalPoint = styled.span`
  margin-right: 5px;
  font-size: 14px;
`;

const EditBtn = styled.span`
  margin-left: 5px;
  & svg {
    cursor: pointer;
  }
`;

const BoxBody = styled.div``;

const EngravingLIne = styled.div`
  display: flex;
`;

const EngravingSlot = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
`;
const CheckList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100px;
  border: 1px solid #7b7b7b;
`;

const ControlTab = styled.div`
  display: flex;
  & button {
    color: white;
    font-weight: bold;
    cursor: pointer;
    background: #4c4cd5;
    &:hover {
      filter: brightness(0.8);
    }
  }
  & .fail {
    background: #cf3f3f;
  }
`;

const BoxFooter = styled.div`
  display: flex;
  flex-direction: column;
  & span {
    height: 100px;
    line-height: 100px;
  }
`;
