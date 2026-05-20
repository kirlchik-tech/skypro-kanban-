import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%,
  80%,
  100% {
    opacity: 0.2;
  }

  40% {
    opacity: 1;
  }
`;

export const LoaderContainer = styled.div`
  width: 100%;
  min-height: 80vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoaderInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;

export const LoaderSpinner = styled.div`
  width: 54px;
  height: 54px;

  border: 5px solid rgba(86, 94, 239, 0.2);
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;

  animation: ${rotate} 0.8s linear infinite;
`;

export const LoaderText = styled.p`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
`;

export const LoaderDots = styled.span`
  span {
    animation: ${pulse} 1.4s infinite ease-in-out both;
  }

  span:nth-child(1) {
    animation-delay: -0.32s;
  }

  span:nth-child(2) {
    animation-delay: -0.16s;
  }
`;
