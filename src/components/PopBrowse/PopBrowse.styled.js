import styled from "styled-components";

const getTopicBackground = (topic, theme) => {
  switch (topic) {
    case "Web Design":
      return theme.colors.orangeBg;
    case "Research":
      return theme.colors.greenBg;
    case "Copywriting":
      return theme.colors.purpleBg;
    default:
      return theme.colors.bgDescription;
  }
};

const getTopicColor = (topic, theme) => {
  switch (topic) {
    case "Web Design":
      return theme.colors.orange;
    case "Research":
      return theme.colors.green;
    case "Copywriting":
      return theme.colors.purple;
    default:
      return theme.colors.textSecondary;
  }
};

const getReadonlyStatusWidth = (statusName) => {
  switch (statusName) {
    case "Без статуса":
      return "111px";
    case "Нужно сделать":
      return "136px";
    case "В работе":
      return "91px";
    case "Тестирование":
      return "127px";
    case "Готово":
      return "77px";
    default:
      return "auto";
  }
};

export const PopBrowseContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.overlay};
`;

export const PopBrowseBlock = styled.div`
  width: 630px;
  height: 492px;
  padding: 40px 30px 48px;

  position: relative;
  box-sizing: border-box;

  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.bgPopup};
  border: 0.7px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;

  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;

  &,
  * {
    box-sizing: border-box;
  }

  @media (max-width: 700px) {
    width: calc(100vw - 30px);
    height: auto;
    min-height: 492px;
    padding: 32px 20px;
  }
`;

export const PopBrowseContent = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export const PopBrowseHeader = styled.div`
  width: 100%;
  min-height: 30px;
  margin-bottom: 18px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const TitleText = styled.h3`
  margin: 0;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 100%;
`;

export const TitleInput = styled.input`
  width: 100%;
  max-width: 370px;
  min-width: 0;
  height: 30px;
  padding: 0;

  border: none;
  outline: none;
  background: transparent;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 100%;

  box-shadow: ${({ $hasError }) => ($hasError ? "0 1px 0 #ff4d4f" : "none")};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textPrimary};
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const TopicTag = styled.div`
  min-width: 122px;
  height: 30px;
  padding: 0 18px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  border-radius: 24px;

  font-size: 14px;
  font-weight: 600;
  line-height: 14px;

  background-color: ${({ $topic, theme }) => getTopicBackground($topic, theme)};

  color: ${({ $topic, theme }) => getTopicColor($topic, theme)};
`;

export const ErrorText = styled.p`
  margin: -8px 0 10px;

  color: #ff4d4f;
  font-size: 12px;
  line-height: 14px;
`;

export const Subttl = styled.label`
  display: block;
  margin: 0 0 14px;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;
`;

export const StatusBlock = styled.div`
  width: 570px;
  height: 60px;
  margin-bottom: 21px;

  display: flex;
  flex-direction: column;
  gap: 14px;

  ${Subttl} {
    margin-bottom: 0;
  }

  @media (max-width: 700px) {
    width: 100%;
    height: auto;
  }
`;

export const StatusButtons = styled.div`
  width: ${({ $isEditMode }) => ($isEditMode ? "570px" : "auto")};
  height: 30px;

  display: flex;
  align-items: center;
  gap: 7px;

  @media (max-width: 700px) {
    width: 100%;
    height: auto;
    flex-wrap: wrap;
  }
`;

export const StatusButton = styled.button`
  height: 30px;
  padding: 0 14px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;

  border: 0.7px solid ${({ theme }) => theme.colors.borderSoft};
  border-radius: 24px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.grayBg : "transparent"};

  color: ${({ $active, theme }) => {
    if (!$active) return theme.colors.textSecondary;
    return theme.name === "dark"
      ? theme.colors.bgPopup
      : theme.colors.textLight;
  }};

  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  white-space: nowrap;

  cursor: ${({ $readonly }) => ($readonly ? "default" : "pointer")};
  transition: 0.2s ease;

  &:nth-child(1) {
    width: 111px;
  }

  &:nth-child(2) {
    width: 136px;
  }

  &:nth-child(3) {
    width: 91px;
  }

  &:nth-child(4) {
    width: 127px;
  }

  &:nth-child(5) {
    width: 77px;
  }

  &:hover {
    background: ${({ $active, $readonly, theme }) => {
      if ($active) return theme.colors.grayBg;
      if ($readonly) return "transparent";
      return theme.colors.bgDescription;
    }};
  }

  &:disabled {
    opacity: 1;
  }
`;

export const MainContent = styled.div`
  width: 570px;
  height: 230px;
  margin-bottom: 21px;

  display: grid;
  grid-template-columns: 370px 180px;
  column-gap: 20px;
  align-items: start;

  @media (max-width: 700px) {
    width: 100%;
    height: auto;
    grid-template-columns: 1fr;
    row-gap: 22px;
  }
`;

export const LeftColumn = styled.div`
  min-width: 0;
`;

export const RightColumn = styled.div`
  min-width: 0;
`;

export const DescriptionBlock = styled.div`
  width: 100%;
`;

export const DescriptionPreview = styled.div`
  width: 370px;
  height: 200px;
  padding: 14px;

  display: block;
  overflow: auto;

  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.bgDescription};

  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  transition: background-color 0.2s ease;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const DescriptionTextarea = styled.textarea`
  width: 370px;
  height: 200px;
  padding: 14px;

  display: block;

  resize: none;
  outline: none;

  border: 0.7px solid ${({ theme }) => theme.colors.borderSoft};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.bgInput};

  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const CalendarBox = styled.div`
  width: 180px;

  @media (max-width: 700px) {
    width: 180px;
  }
`;

export const CalendarHeader = styled.div`
  width: 100%;
  height: 18px;
  margin-bottom: 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CalendarMonth = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
`;

export const CalendarNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CalendarArrow = styled.button`
  width: 16px;
  height: 18px;
  padding: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: transparent;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 26px;
  font-weight: 400;
  line-height: 18px;

  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CalendarWeekDays = styled.div`
  width: 100%;
  margin-bottom: 10px;

  display: grid;
  grid-template-columns: repeat(7, 20px);
  justify-content: space-between;
`;

export const CalendarWeekDay = styled.span`
  width: 20px;

  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: "Roboto", sans-serif;
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;
`;

export const CalendarGrid = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(7, 20px);
  justify-content: space-between;
  row-gap: 8px;
`;

export const CalendarEmptyDay = styled.div`
  width: 20px;
  height: 20px;
`;

export const CalendarDay = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;

  background: ${({ $selected, $today, theme }) => {
    if ($selected) return theme.colors.grayBg;
    if ($today) return theme.colors.bgDescription;
    return "transparent";
  }};

  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.textLight : theme.colors.textSecondary};

  font-family: "Roboto", sans-serif;
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;

  cursor: ${({ $isEditMode }) => ($isEditMode ? "pointer" : "default")};
  transition: 0.2s ease;

  &:hover {
    background: ${({ $selected, $isEditMode, theme }) => {
      if ($selected) return theme.colors.grayBg;
      if ($isEditMode) return theme.colors.bgDescription;
      return "transparent";
    }};
  }

  &:disabled {
    opacity: 1;
  }
`;

export const DeadlineText = styled.p`
  margin: 12px 0 0;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: "Roboto", sans-serif;
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
`;

export const DeadlineDate = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ButtonGroup = styled.div`
  width: 570px;
  height: 30px;
  margin-top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 700px) {
    width: 100%;
    height: auto;
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const ButtonsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 700px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

const BaseButton = styled.button`
  height: 30px;
  padding: 0 14px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;

  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  white-space: nowrap;

  cursor: pointer;
  transition: 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  min-width: 92px;

  border: 0.7px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
    border-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const SecondaryButton = styled(BaseButton)`
  border: 0.7px solid ${({ theme }) => theme.colors.textPrimary};
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;
