import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100vw;
  max-width: 100%;
  min-height: 100vh;
  overflow: hidden;

  background-color: ${({ theme }) => theme.colors.bgMain};
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileM}) {
    padding: 0 16px;
  }
`;
