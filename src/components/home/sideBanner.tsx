import styled from "styled-components";
import Image from "next/image";

// type
import { GameEvents } from "@/types";

interface Props {
  events: GameEvents[];
}

export const SideBanner = ({ events }: Props) => {
  return (
    <Container>
      <News>
        <p>진행중 이벤트</p>
        <ul>
          {events.map((value, index) => {
            const { Thumbnail, Link } = value;
            return (
              <li key={index}>
                <a href={Link} target="_blank">
                  <Image
                    src={Thumbnail}
                    width={220}
                    height={110}
                    alt="event"
                    priority
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </News>
    </Container>
  );
};

const Container = styled.aside`
  width: 250px;
`;

const News = styled.div`
  margin-bottom: 25px;
  padding: 7px;
  border: 1px solid #7b7b7b;
  border-radius: 10px;
  background-color: #15181d;

  & p {
    margin: 0;
    margin-bottom: 12px;
    padding: 5px;
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid #7b7b7b;
  }

  & li {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    font-size: 15px;
    font-weight: bold;
  }
`;
