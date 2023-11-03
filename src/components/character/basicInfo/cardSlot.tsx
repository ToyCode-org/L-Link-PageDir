import styled from "styled-components";
import { ComponentLabel } from "@/components/common/components";
import Image from "next/image";
import { getPublicImage } from "@/util/getPubliceImage";

import { ArmoryCard } from "@/types";

interface Props {
  cardList: ArmoryCard;
}
export const CardSlot = ({ cardList }: Props) => {
  if (!cardList) {
    return <ComponentLabel>장착카드 0</ComponentLabel>;
  }

  const { Cards, Effects } = cardList;
  return (
    <Container>
      <ComponentLabel>카드</ComponentLabel>
      <CardBox>
        {Cards.map((data, index) => {
          const { Name, Icon, AwakeCount, AwakeTotal } = data;
          return (
            <li key={index}>
              <Image src={Icon} width={110} height={200} alt="card" />
              <AwakeWrap>
                <CardAwakeSlot
                  src={getPublicImage("card/awake-card")}
                  width={110}
                  height={80}
                  alt="awake"
                />
                <AwakedPoint
                  src={getPublicImage("card/awake-card")}
                  width={110}
                  height={80}
                  alt="awake"
                  style={{
                    transform: `translate(${
                      -110 - (AwakeTotal - AwakeCount) * 22
                    }px, -38px)`,
                  }}
                />
              </AwakeWrap>
              <CardName>{Name}</CardName>
            </li>
          );
        })}
      </CardBox>
      <div>
        <ComponentLabel>효과</ComponentLabel>
        {Effects.map((value1, idx1) =>
          value1.Items.map((value2, idx2) => {
            const { Name, Description } = value2;
            return (
              <EffectInfo key={`${idx1}${idx2}`}>
                <span>{Name}</span> : <span>{Description}</span>
              </EffectInfo>
            );
          }),
        )}
      </div>
    </Container>
  );
};

const Container = styled.div``;

const CardBox = styled.div`
  display: flex;

  & li {
    margin-right: 4px;
  }
`;

const AwakeWrap = styled.div`
  position: absolute;
  transform: translate(0%, -50px);
  height: 40px;
  overflow: hidden;
`;
const CardAwakeSlot = styled(Image)`
  object-position: 0px 3px;
`;
const AwakedPoint = styled(Image)`
  position: absolute;
  z-index: 1;
`;
const CardName = styled.div`
  font-size: 10px;
  font-weight: bold;
  text-align: center;
`;

const EffectInfo = styled.li`
  font-size: 14px;

  & span:first-child {
    color: orange;
    font-weight: bold;
  }
  & span {
    font-size: 14px;
    font-weight: normal;
  }
`;
