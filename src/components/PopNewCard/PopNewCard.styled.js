import styled from "styled-components";

export const PopNewCard = styled.div`
  display: block;
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

export const PopNewCardContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`;

export const PopNewCardBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px 30px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
`;

export const PopNewCardContent = styled.div`
  display: block;
  text-align: left;
`;

export const PopNewCardTtl = styled.h3`
  color: #000;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 20px;
`;

export const PopNewCardMainContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 660px) {
    flex-direction: column;
  }
`;

export const PopNewCardForm = styled.div`
  max-width: 370px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PopNewCardFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Subttl = styled.label`
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #000000;
  margin-bottom: 14px;
  display: block;
`;

export const PopNewCardInput = styled.input`
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;

  &::placeholder {
    color: #94a6be;
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border-color: #565eef;
  }
`;

export const PopNewCardArea = styled.textarea`
  width: 100%;
  max-width: 370px;
  height: 200px;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: -0.14px;
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: #94a6be;
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border-color: #565eef;
  }
`;

export const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 182px;

  @media (max-width: 660px) {
    max-width: 100%;
  }
`;

export const PopNewCardCategories = styled.div`
  margin-bottom: 20px;
`;

export const CategoriesThemes = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
`;

export const CategoriesThemeItem = styled.div`
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? "1" : "0.4")};
  background-color: ${({ $bgColor }) => $bgColor || "#94a6be"};
  color: ${({ $textColor }) => $textColor || "#ffffff"};
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const CreateButton = styled.button`
  width: 132px;
  height: 30px;
  background: #565eef;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  float: right;

  &:hover {
    background: #33399b;
  }

  &:disabled {
    background: #ccc;
  }
`;
