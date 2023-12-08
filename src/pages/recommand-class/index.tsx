import styled from "styled-components";

export default function RecommandClass() {
  return (
    <Container>
      <QuestionBox>
        <div>
          <p>지문</p>
          <span>page/pages</span>
        </div>
      </QuestionBox>
    </Container>
  );
}

const Container = styled.div`
  width: 1100px;
`;

const QuestionBox = styled.div`
  width: 850px;
  height: 700px;
`;
