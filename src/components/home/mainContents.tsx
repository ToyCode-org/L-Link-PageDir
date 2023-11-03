import styled from "styled-components";

// type
import { CalenderContents } from "@/types";

interface Props {
  content: CalenderContents[];
}

export const MainContents = ({ content }: Props) => {
  return (
    <Container>
      {content.map((value, index) => {
        const { CategoryName, ContentsIcon, ContentsName, Location } = value;
        return (
          <li key={index}>
            <p>카테고리: {CategoryName}</p>
            <div>{ContentsIcon}</div>
            <div>{ContentsName}</div>
            <div>{Location}</div>
          </li>
        );
      })}
    </Container>
  );
};

const Container = styled.section``;
