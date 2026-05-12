import styled from "styled-components";

const getCategoryBackground = (theme, bgColor, textColor) => {
  if (theme.name === "dark") {
    return textColor || theme.colors.grayBg;
  }

  return bgColor || theme.colors.grayBg;
};

const getCategoryColor = (theme, textColor) => {
  if (theme.name === "dark") {
    return theme.colors.textLight;
  }

  return textColor || theme.colors.textLight;
};

export const PopNewCard = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  display: block;
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
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

  background: ${({ theme }) => theme.colors.overlay};
`;

export const PopNewCardBlock = styled.div`
  width: 100%;
  max-width: 630px;
  padding: 40px 30px 48px;
  margin: 0 auto;

  display: block;
  position: relative;

  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.bgPopup};
  border: 0.7px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;

  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 32px 20px;
  }
`;

export const PopNewCardContent = styled.div`
  display: block;
  text-align: left;
`;

export const PopNewCardTtl = styled.h3`
  margin-bottom: 20px;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
`;

export const PopNewCardMainContent = styled.div`
  margin-bottom: 20px;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    flex-direction: column;
  }
`;

export const PopNewCardForm = styled.div`
  width: 100%;
  max-width: 370px;

  display: flex;
  flex-direction: column;
`;

export const PopNewCardFormBlock = styled.div`
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
`;

export const Subttl = styled.label`
  display: block;
  margin-bottom: 14px;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;
`;

export const PopNewCardInput = styled.input`
  width: 100%;
  padding: 14px;

  outline: none;
  background: ${({ theme }) => theme.colors.bgInput};
  border: 0.7px solid ${({ theme }) => theme.colors.borderSoft};
  border-radius: 8px;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;

  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 400;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const PopNewCardArea = styled.textarea`
  width: 100%;
  max-width: 370px;
  height: 200px;
  padding: 14px;

  resize: none;
  outline: none;
  background: ${({ theme }) => theme.colors.bgInput};
  border: 0.7px solid ${({ theme }) => theme.colors.borderSoft};
  border-radius: 8px;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: -0.14px;

  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 400;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 182px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
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

export const CategoriesThemeItem = styled.button`
  width: auto;
  height: 30px;
  padding: 8px 20px;

  display: inline-block;

  border: none;
  border-radius: 24px;

  background-color: ${({ theme, $topic }) => {
    if ($topic === "Web Design") return theme.colors.orangeBg;
    if ($topic === "Research") return theme.colors.greenBg;
    if ($topic === "Copywriting") return theme.colors.purpleBg;
    return theme.colors.grayBg;
  }};

  color: ${({ theme, $topic }) => {
    if ($topic === "Web Design") return theme.colors.orange;
    if ($topic === "Research") return theme.colors.green;
    if ($topic === "Copywriting") return theme.colors.purple;
    return theme.colors.textLight;
  }};

  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;

  cursor: pointer;
  opacity: ${({ $active }) => ($active ? "1" : "0.4")};
  transition:
    opacity 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;

  color: #ff4d4f;
  font-size: 12px;
`;

export const CreateButton = styled.button`
  width: 132px;
  height: 30px;
  float: right;

  border: 0.7px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary};

  color: ${({ theme }) => theme.colors.textLight};
  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
    border-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
