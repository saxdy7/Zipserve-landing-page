import React from 'react';
import styled, { keyframes } from 'styled-components';

const move = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const TextContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  margin-top: 20px; /* Changed from -80px */
  margin-bottom: 0%;
  padding-top: 40px; /* Added padding */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  white-space: nowrap;
  display: inline-block;
  animation: ${move} 10s linear infinite;
`;

const Text = styled.h1`
  font-size: 12vw;
  display: inline-block;
`;

const Dot = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  background-color: #395edae0;
  margin: 1vw 2vw;
`;

const MovingText = () => {
  return (
    <TextContainer id="moving-text">
      {[1, 2, 3].map((index) => (
        <Container key={index} className="con">
          <Text>Smart</Text>
          <Dot className="gola" />
          <Text>Fast</Text>
          <Dot className="gola" />
          <Text>Reliable</Text>
          <Dot className="gola" />
        </Container>
      ))}
    </TextContainer>
  );
};

export default MovingText;