import styled from "styled-components";

export const MainContainer = styled.main`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bgMain};
`;

export const MainBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 40px 0 64px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  }
`;
