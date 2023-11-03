import styled from "styled-components";
import Image from "next/image";
import { useIndexHandler } from "@/hooks/useIndexHandler";
import { ComponentLabel } from "../common/components";
import { getPublicImage } from "@/util/getPubliceImage";
import { commonStyles } from "../common/component-style";

import { Collectibles } from "@/types";

interface Props {
  collectibles: Collectibles;
}

export const Collections = ({ collectibles }: Props) => {
  const { indexNumber, indexHandler } = useIndexHandler();

  return (
    <Container>
      <ComponentLabel>수집형 포인트</ComponentLabel>
      <Content>
        <CollectibleNav>
          {collectibles.map((value, index) => {
            const { MaxPoint, Point, Type } = value;
            return (
              <li
                key={index}
                style={commonStyles.innerContent}
                onClick={() => indexHandler(index)}
              >
                <Image
                  src={getPublicImage(Type)}
                  width={25}
                  height={25}
                  alt="collectibleItem"
                />
                <span>{`${Point} / ${MaxPoint}`}</span>
              </li>
            );
          })}
        </CollectibleNav>
        <CollectibleInfo>
          {collectibles[indexNumber].CollectiblePoints.map((value, index) => {
            const { PointName, Point, MaxPoint } = value;
            const isCollected = Point === MaxPoint;
            return (
              <li key={index} style={isCollected ? { color: "orange" } : {}}>
                <span>{PointName}</span>
                <span>{` : ${Point} / ${MaxPoint}`}</span>
              </li>
            );
          })}
        </CollectibleInfo>
      </Content>
    </Container>
  );
};

const Container = styled.div``;

const Content = styled.div`
  display: flex;
`;

const CollectibleNav = styled.nav`
  margin-right: 20px;
  & li {
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    height: 20px;
    cursor: pointer;

    &:hover {
      background-color: #080a0c;
    }
  }
`;

const CollectibleInfo = styled.div`
  display: grid;
  grid-template-columns: 240px 240px;
  & li {
    font-weight: bold;
    font-size: 13px;
    color: gray;
  }
`;
