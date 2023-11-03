import styled, { keyframes } from "styled-components";

export const LoadingSpinner = () => {
  return (
    <LoadingContainer>
      <LoadingIcon />
      <LoadingMsg>Loading...</LoadingMsg>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 40%;
  z-index: 999px;
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  } 75% {
    opacity:1;
  } 100% {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled.div`
  margin-bottom: 10px;
  width: 50px;
  height: 50px;
  border: 4px solid #fff;
  border-top-color: transparent;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spinAnimation} 1s infinite;
`;

const msgAnimation = keyframes`
  75% {
    opacity:1;
  } 100% {
  }
`;
const LoadingMsg = styled.div`
  font-weight: bold;
  color: white;
  animation: ${msgAnimation} 1s;
`;
