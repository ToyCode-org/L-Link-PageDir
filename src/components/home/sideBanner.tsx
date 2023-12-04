import styled from "styled-components";

// type
import { GameEvents, Notices } from "@/types";

interface Props {
  events: GameEvents[];
  notices: Notices[];
}

export const SideBanner = ({ events, notices }: Props) => {
  return (
    <Container>
      <p>new Component</p>
      <p>테스트{`${events[0].Link}${notices[0].Link}`}</p>
    </Container>
  );
};

const Container = styled.aside`
  width: 200px;
`;
