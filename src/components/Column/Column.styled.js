import styled from "styled-components";

export const ColumnContainer = styled.div`
  width: 20%;
  margin: 0 auto;

  display: block;

  transition:
    background-color 0.2s ease,
    outline-color 0.2s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
  }
`;

export const ColumnTitle = styled.div`
  margin: 15px 0;
  padding: 0 10px;

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
  }
`;

export const CardsList = styled.div`
  position: relative;

  width: 100%;
  min-height: 140px;
  padding-bottom: 10px;

  display: block;

  border-radius: 10px;
  transition:
    background-color 0.2s ease,
    outline-color 0.2s ease;

  ${({ $isOver, theme }) =>
    $isOver &&
    `
      outline: 1.5px dashed ${theme.colors.textSecondary};
      outline-offset: 4px;
      background: rgba(148, 166, 190, 0.08);
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    overflow-y: auto;
  }
`;

export const DraggableCardWrapper = styled.div`
  position: relative;

  touch-action: none;
  cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "grab")};
  transition:
    opacity 0.2s ease,
    transform 0.08s linear;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 10px;
  }
`;

export const DropHint = styled.div`
  width: 220px;
  height: 130px;
  margin: 5px;
  padding: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1.5px dashed ${({ theme }) => theme.colors.textSecondary};
  border-radius: 10px;
  background: rgba(148, 166, 190, 0.08);

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  font-weight: 500;
  text-align: center;

  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-shrink: 0;
  }
`;
