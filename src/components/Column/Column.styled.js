import styled from "styled-components";

export const ColumnContainer = styled.div`
  width: 20%;
  margin: 0 auto;
  display: block;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
  }
`;

export const ColumnTitle = styled.div`
  padding: 0 10px;
  margin: 15px 0;

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
  }
`;

export const CardsList = styled.div`
  width: 100%;
  display: block;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    overflow-y: auto;
  }
`;
