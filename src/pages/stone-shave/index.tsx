import styled from "styled-components";
import { useState } from "react";
import { EditIcon } from "@/components/common/icons";

// style
import { ComponentLabel } from "@/components/common/components";

// type
import { FormEvent } from "@/types";

export default function StoneShave() {
  type SlotCheck = boolean | number; // 0: none 1: success 2: fail
  type SlotArray = SlotCheck[];

  const slotArray = Array.from({ length: 10 }).fill(0) as SlotArray;
  const slotInit = [slotArray, slotArray, slotArray];
  const slotNameInit = ["각인1", "각인2", "디버프"];

  const [slotName, setSlotName] = useState(slotNameInit);
  const [nameEditIndex, setNameEditIndex] = useState(-1);
  const [engravingSlots, setEngravingSlots] = useState(slotInit);
  const [recommanIndex, setRecommanIndex] = useState(-1);

  const initShaving = () => {
    if (window.confirm("초기화 할까요??")) {
      setSlotName(slotNameInit);
      setNameEditIndex(-1);
      setEngravingSlots(slotInit);
    }
  };

  const closeNameEditer = () => {
    setNameEditIndex(-1);
  };

  const openNameEditer = (index: number) => {
    setNameEditIndex(index);
  };

  const editSlotName = (e: FormEvent) => {
    e.preventDefault();
    const value = e.target[0].value;
    let prevSlotName = slotName;
    prevSlotName[nameEditIndex] = value;
    setSlotName(prevSlotName);
    closeNameEditer();
  };

  const test = () => {
    setRecommanIndex(1);
  };

  return (
    <Container>
      <ComponentLabel>어빌리티 스톤 세공 시뮬레이터</ComponentLabel>
      <ShavingBox>
        <Recovery onClick={test}>
          <button className="init" onClick={initShaving}>
            초기화
          </button>
          <button>되돌리기</button>
        </Recovery>
        <Content>
          <BoxHead>
            {slotName.map((name, index) => {
              const isDebuff = index === 2 ? true : false;
              const isEditable = index === nameEditIndex ? true : false;
              return (
                <NameSlot key={index}>
                  {isEditable ? (
                    <EditForm onSubmit={e => editSlotName(e)}>
                      <input type="text" defaultValue={name} maxLength={10} />
                      <div>
                        <button type="submit">수정</button>
                        <button onClick={closeNameEditer}>취소</button>
                      </div>
                    </EditForm>
                  ) : (
                    <>
                      <span style={isDebuff ? { color: "red" } : {}}>
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
            {/* {slotName.map((value, index) => {
              value = "★ 추천";
              return (
                <span key={index}>{recommanIndex === index ? value : "-"}</span>
              );
            })} */}
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
