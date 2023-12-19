import styled from "styled-components";

export default function RecommandClass() {
  return (
    <Container>
      <QuestionBox>
        <div>
          <Test>Coming Soon...</Test>
          {/* <span>page/pages</span> */}
        </div>
      </QuestionBox>
    </Container>
  );
}

const Container = styled.div`
  width: 1100px;
`;

const QuestionBox = styled.div`
  margin: 0 auto;
  width: 850px;
  height: 700px;
`;

const Test = styled.p`
  margin-top: 200px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
`;
