import React, { useEffect, useState } from "react";
import styled from "styled-components";

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const daysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 182px;
`;

const CalendarTitle = styled.div`
  margin-bottom: 14px;

  color: #000000;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;
`;

const CalendarNav = styled.div`
  margin-bottom: 14px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CalendarMonth = styled.div`
  color: #94a6be;
  font-size: 14px;
  font-weight: 600;
  line-height: 25px;
`;

const NavActions = styled.div`
  display: flex;
  gap: 12px;
`;

const NavAction = styled.button`
  width: 18px;
  height: 25px;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: transparent;

  cursor: pointer;

  svg {
    fill: #94a6be;
  }

  &:hover svg {
    fill: #565eef;
  }
`;

const DaysNames = styled.div`
  margin-bottom: 7px;
  padding: 0 2px;

  display: flex;
  justify-content: space-between;
`;

const DayName = styled.div`
  width: 22px;

  color: #94a6be;
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;
  text-align: center;
`;

const CalendarCells = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
`;

const CalendarCell = styled.button`
  width: 22px;
  height: 22px;
  margin: 2px;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? "#94A6BE" : "transparent")};

  color: ${({ $active }) => ($active ? "#FFFFFF" : "#94A6BE")};
  font-family: inherit;
  font-size: 10px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.2px;

  cursor: ${({ $editable }) => ($editable ? "pointer" : "default")};

  &:hover {
    background-color: ${({ $editable, $active }) =>
      $editable && !$active ? "#EAEEF6" : ""};
  }
`;

const CalendarPeriod = styled.div`
  margin-top: 14px;
  padding: 0 2px;
`;

const PeriodText = styled.p`
  margin: 0;

  color: #94a6be;
  font-family: "Roboto", sans-serif;
  font-size: 10px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;

  span {
    color: #000000;
  }
`;

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();

  return firstDay === 0 ? 6 : firstDay - 1;
};

const formatDate = (date) => {
  if (!date) return null;

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);
};

const Calendar = ({
  isEditable = false,
  selectedDate = null,
  onDateSelect,
}) => {
  const initialDate = selectedDate ? new Date(selectedDate) : new Date();

  const [currentDate, setCurrentDate] = useState(initialDate);
  const [activeDate, setActiveDate] = useState(selectedDate);

  useEffect(() => {
    if (!selectedDate) {
      setActiveDate(null);
      return;
    }

    const date = new Date(selectedDate);

    setActiveDate(date);
    setCurrentDate(date);
  }, [selectedDate]);

  const prevMonth = () => {
    setCurrentDate((date) => new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate((date) => new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const handleDateSelect = (day) => {
    if (!isEditable) return;

    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );

    setActiveDate(date);

    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const renderCalendarCells = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    const cells = [];

    for (let index = 0; index < firstDayIndex; index += 1) {
      cells.push(
        <CalendarCell
          key={`empty-${index}`}
          type="button"
          $editable={false}
          disabled
        />,
      );
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const isSelected =
        activeDate &&
        activeDate.getDate() === day &&
        activeDate.getMonth() === month &&
        activeDate.getFullYear() === year;

      cells.push(
        <CalendarCell
          key={day}
          type="button"
          $editable={isEditable}
          $active={isSelected}
          disabled={!isEditable}
          onClick={() => handleDateSelect(day)}
        >
          {day}
        </CalendarCell>,
      );
    }

    return cells;
  };

  const displayDate = formatDate(activeDate);

  return (
    <CalendarContainer>
      <CalendarTitle>Даты</CalendarTitle>

      <CalendarNav>
        <CalendarMonth>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </CalendarMonth>

        <NavActions>
          <NavAction
            type="button"
            aria-label="Предыдущий месяц"
            onClick={prevMonth}
          >
            <svg
              width="6"
              height="11"
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"
                fill="#94A6BE"
              />
            </svg>
          </NavAction>

          <NavAction
            type="button"
            aria-label="Следующий месяц"
            onClick={nextMonth}
          >
            <svg
              width="6"
              height="11"
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633779 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z"
                fill="#94A6BE"
              />
            </svg>
          </NavAction>
        </NavActions>
      </CalendarNav>

      <DaysNames>
        {daysOfWeek.map((day) => (
          <DayName key={day}>{day}</DayName>
        ))}
      </DaysNames>

      <CalendarCells>{renderCalendarCells()}</CalendarCells>

      <CalendarPeriod>
        <PeriodText>
          {displayDate ? "Срок исполнения: " : "Выберите срок исполнения"}
          {displayDate && <span> {displayDate}</span>}
          {displayDate && "."}
        </PeriodText>
      </CalendarPeriod>
    </CalendarContainer>
  );
};

export default Calendar;
