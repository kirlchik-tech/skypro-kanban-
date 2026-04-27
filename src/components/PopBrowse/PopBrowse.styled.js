import styled from "styled-components";

export const PopBrowseContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.4);
`;

export const PopBrowseBlock = styled.div`
  width: 630px;
  height: 492px;
  padding: 40px 30px 48px;

  box-sizing: border-box;
  position: relative;

  background: #ffffff;
  border: 0.7px solid #d4dbe5;
  border-radius: 10px;

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
  margin-bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
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

  color: #000000;
  font-family: inherit;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;

  box-shadow: ${({ $hasError }) => ($hasError ? "0 1px 0 #ff4d4f" : "none")};

  &::placeholder {
    color: #000000;
    opacity: 1;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const PopBrowseTtl = styled.h3`
  margin: 0;

  color: #000000;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
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

  background-color: ${({ $topic }) => {
    switch ($topic) {
      case "Web Design":
        return "#FFE4C2";
      case "Research":
        return "#B4FDD1";
      case "Copywriting":
        return "#E9D4FF";
      default:
        return "#EAEFF6";
    }
  }};

  color: ${({ $topic }) => {
    switch ($topic) {
      case "Web Design":
        return "#FF6D00";
      case "Research":
        return "#06B16E";
      case "Copywriting":
        return "#9A48F1";
      default:
        return "#94A6BE";
    }
  }};
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

  color: #000000;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
`;

export const StatusBlock = styled.div`
  width: 570px;
  height: 60px;
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
  gap: 14px;

  ${Subttl} {
    margin-bottom: 0;
  }
`;

export const StatusButtons = styled.div`
  width: 570px;
  height: 30px;

  display: flex;
  align-items: center;
  gap: 7px;
`;

export const StatusButton = styled.button`
  height: 30px;
  padding: 0 14px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;

  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 24px;
  background: ${({ $active }) => ($active ? "#94A6BE" : "#FFFFFF")};

  color: ${({ $active }) => ($active ? "#FFFFFF" : "#94A6BE")};
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  white-space: nowrap;

  cursor: pointer;
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
    background: ${({ $active }) => ($active ? "#94A6BE" : "#F4F7F9")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const MainContent = styled.div`
  width: 100%;
  margin-bottom: 18px;

  display: grid;
  grid-template-columns: 370px 180px;
  column-gap: 20px;
  align-items: start;

  @media (max-width: 700px) {
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

export const DescriptionTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 14px;

  display: block;

  resize: none;
  outline: none;

  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  background: #ffffff;

  color: #000000;
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  &::placeholder {
    color: #94a6be;
  }

  &:focus {
    border-color: #565eef;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const CalendarBox = styled.div`
  width: 180px;
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

  color: #94a6be;
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

  color: #94a6be;
  font-size: 26px;
  font-weight: 400;
  line-height: 18px;

  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #565eef;
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
  color: #94a6be;
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

  background: ${({ $selected, $today }) => {
    if ($selected) return "#94A6BE";
    if ($today) return "#EAEEF6";
    return "transparent";
  }};

  color: ${({ $selected }) => ($selected ? "#FFFFFF" : "#94A6BE")};
  font-family: inherit;
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;

  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: ${({ $selected }) => ($selected ? "#94A6BE" : "#EAEEF6")};
  }
`;

export const DeadlineText = styled.p`
  margin: 12px 0 0;

  color: #94a6be;
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
`;

export const DeadlineDate = styled.span`
  color: #000000;
`;

export const ButtonGroup = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const ButtonsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BaseButton = styled.button`
  height: 30px;
  padding: 0 14px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;

  font-family: inherit;
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

export const SaveButton = styled(BaseButton)`
  min-width: 105px;

  border: 0.7px solid #565eef;
  background: #565eef;
  color: #ffffff;

  &:hover:not(:disabled) {
    background: #33399b;
    border-color: #33399b;
  }
`;

export const CancelButton = styled(BaseButton)`
  min-width: 99px;

  border: 0.7px solid #565eef;
  background: #ffffff;
  color: #565eef;

  &:hover {
    background: #565eef;
    color: #ffffff;
  }
`;

export const DeleteButton = styled(BaseButton)`
  min-width: 140px;

  border: 0.7px solid #565eef;
  background: #ffffff;
  color: #565eef;

  &:hover:not(:disabled) {
    background: #565eef;
    color: #ffffff;
  }
`;

export const PopBrowseClose = styled(BaseButton)`
  min-width: 92px;

  border: 0.7px solid #565eef;
  background: #565eef;
  color: #ffffff;

  &:hover {
    background: #33399b;
    border-color: #33399b;
  }
`;
