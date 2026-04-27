import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 182px;
`;

const CalendarTitle = styled.div`
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #000000;
  margin-bottom: 14px;
`;

const CalendarNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
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

const NavAction = styled.div`
  width: 18px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: #94a6be;
  }

  &:hover svg {
    fill: #565eef;
  }
`;

const DaysNames = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
  padding: 0 2px;
`;

const DayName = styled.div`
  color: #94a6be;
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;
  width: 22px;
  text-align: center;
`;

const CalendarCells = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const CalendarCell = styled.div`
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;
  cursor: ${({ $editable }) => ($editable ? "pointer" : "default")};
  background-color: ${({ $active }) => ($active ? "#94A6BE" : "transparent")};
  color: ${({ $active }) => ($active ? "#FFFFFF" : "#94A6BE")};
  font-weight: 400;

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
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  margin: 0;
  color: #94a6be;

  span {
    color: #000000;
  }
`;

const Calendar = ({
  isEditable = false,
  selectedDate = null,
  onDateSelect,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      setSelectedDay(date.getDate());
      setSelectedMonth(date.getMonth());
      setSelectedYear(date.getFullYear());
      setCurrentDate(date);
    }
  }, [selectedDate]);

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

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    let firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const handleDateSelect = (day) => {
    if (!isEditable) return;

    setSelectedDay(day);
    setSelectedMonth(currentDate.getMonth());
    setSelectedYear(currentDate.getFullYear());
    const dateObj = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    if (onDateSelect) onDateSelect(dateObj);
  };

  const renderCalendarCells = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    const cells = [];

    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(<CalendarCell key={`empty-${i}`} $editable={false} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDay === day && selectedMonth === month && selectedYear === year;

      cells.push(
        <CalendarCell
          key={day}
          $editable={isEditable}
          $active={isSelected}
          onClick={() => handleDateSelect(day)}
        >
          {day}
        </CalendarCell>,
      );
    }

    return cells;
  };

  const formatSelectedDate = () => {
    if (selectedDay && selectedMonth !== null && selectedYear !== null) {
      return `${selectedDay.toString().padStart(2, "0")}.${(selectedMonth + 1).toString().padStart(2, "0")}.${selectedYear}`;
    }
    if (selectedDate) {
      const date = new Date(selectedDate);
      return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
    }
    return null;
  };

  const displayDate = formatSelectedDate();

  return (
    <CalendarContainer>
      <CalendarTitle>Даты</CalendarTitle>
      <CalendarNav>
        <CalendarMonth>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </CalendarMonth>
        <NavActions>
          <NavAction onClick={prevMonth}>
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
          <NavAction onClick={nextMonth}>
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
          {displayDate ? "Срок исполнения: " : "Выберите срок исполнения "}
          {displayDate && <span> {displayDate}</span>}
          {displayDate && "."}
        </PeriodText>
      </CalendarPeriod>
    </CalendarContainer>
  );
};

export default Calendar;
