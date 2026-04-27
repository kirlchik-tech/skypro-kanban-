import React, { useEffect, useMemo, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { updateTask, deleteTask } from "../../services/tasks";
import * as S from "./PopBrowse.styled";

const statuses = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];

const weekDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

const monthNames = [
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

const normalizeDate = (date) => {
  if (!date) return null;

  const parsedDate = new Date(date);

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

const isSameDay = (firstDate, secondDate) => {
  if (!firstDate || !secondDate) return false;

  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};

const padDateNumber = (number) => String(number).padStart(2, "0");

const formatDeadline = (date) => {
  if (!date) return "—";

  return `${padDateNumber(date.getDate())}.${padDateNumber(
    date.getMonth() + 1,
  )}.${String(date.getFullYear()).slice(-2)}.`;
};

const getCalendarDays = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstMonthDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstWeekDayIndex = (firstMonthDay.getDay() + 6) % 7;

  const emptyDays = Array.from({ length: firstWeekDayIndex }, (_, index) => ({
    type: "empty",
    key: `empty-${index}`,
  }));

  const monthDays = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;

    return {
      type: "day",
      key: `${year}-${month}-${day}`,
      day,
      date: new Date(year, month, day, 12),
    };
  });

  return [...emptyDays, ...monthDays];
};

const getErrorMessage = (err, defaultMessage) => {
  if (err?.response?.data) {
    if (typeof err.response.data === "string") {
      return err.response.data;
    }

    if (err.response.data.message) {
      return err.response.data.message;
    }

    if (err.response.data.error) {
      return err.response.data.error;
    }
  }

  return err?.message || defaultMessage;
};

const PopBrowse = ({ onTaskUpdated, onTaskDeleted }) => {
  const { isBrowseOpen, closeBrowse, currentTask } = useModal();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Без статуса");
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    if (!currentTask) return;

    const taskDate = normalizeDate(currentTask.date);

    setTitle(currentTask.title || "");
    setDescription(currentTask.description || "");
    setStatus(currentTask.status || "Без статуса");
    setSelectedDate(taskDate);
    setViewDate(taskDate || new Date());
    setError("");
    setTitleError("");
  }, [currentTask]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isBrowseOpen) {
        closeBrowse();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isBrowseOpen, closeBrowse]);

  const calendarDays = useMemo(() => getCalendarDays(viewDate), [viewDate]);

  if (!isBrowseOpen || !currentTask) return null;

  const validateForm = () => {
    const trimmedTitle = title.trim();

    setError("");
    setTitleError("");

    if (!trimmedTitle) {
      setTitleError("Введите название задачи");
      return false;
    }

    if (trimmedTitle.length < 3) {
      setTitleError("Название должно содержать минимум 3 символа");
      return false;
    }

    if (trimmedTitle.length > 100) {
      setTitleError("Название не должно превышать 100 символов");
      return false;
    }

    return true;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setViewDate(date);
  };

  const handlePrevMonth = () => {
    setViewDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setViewDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1),
    );
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    const taskData = {
      title: title.trim(),
      topic: currentTask.topic,
      description: description.trim(),
      status,
      date: selectedDate
        ? selectedDate.toISOString()
        : currentTask.date || new Date().toISOString(),
    };

    try {
      await updateTask(currentTask._id, taskData);

      if (onTaskUpdated) {
        onTaskUpdated();
      }

      closeBrowse();
    } catch (err) {
      setError(
        getErrorMessage(err, "Ошибка сохранения задачи. Попробуйте снова."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Вы уверены, что хотите удалить эту задачу?",
    );

    if (!isConfirmed) return;

    setIsLoading(true);
    setError("");

    try {
      await deleteTask(currentTask._id);

      if (onTaskDeleted) {
        onTaskDeleted();
      }

      closeBrowse();
    } catch (err) {
      setError(
        getErrorMessage(err, "Ошибка удаления задачи. Попробуйте снова."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const currentMonthTitle = `${
    monthNames[viewDate.getMonth()]
  } ${viewDate.getFullYear()}`;

  return (
    <S.PopBrowseContainer onMouseDown={closeBrowse}>
      <S.PopBrowseBlock onMouseDown={(event) => event.stopPropagation()}>
        <S.PopBrowseContent>
          <S.PopBrowseHeader>
            <S.TitleInput
              type="text"
              placeholder="Название задачи"
              value={title}
              disabled={isLoading}
              $hasError={Boolean(titleError)}
              onChange={(event) => {
                setTitle(event.target.value);

                if (titleError) {
                  setTitleError("");
                }
              }}
            />

            <S.TopicTag $topic={currentTask.topic}>
              {currentTask.topic || "Web Design"}
            </S.TopicTag>
          </S.PopBrowseHeader>

          {(error || titleError) && (
            <S.ErrorText>{error || titleError}</S.ErrorText>
          )}

          <S.StatusBlock>
            <S.Subttl>Статус</S.Subttl>

            <S.StatusButtons>
              {statuses.map((statusName) => (
                <S.StatusButton
                  type="button"
                  key={statusName}
                  disabled={isLoading}
                  $active={status === statusName}
                  onClick={() => setStatus(statusName)}
                >
                  {statusName}
                </S.StatusButton>
              ))}
            </S.StatusButtons>
          </S.StatusBlock>

          <S.MainContent>
            <S.LeftColumn>
              <S.DescriptionBlock>
                <S.Subttl htmlFor="task-description">Описание задачи</S.Subttl>

                <S.DescriptionTextarea
                  id="task-description"
                  placeholder="Введите описание задачи..."
                  value={description}
                  disabled={isLoading}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </S.DescriptionBlock>
            </S.LeftColumn>

            <S.RightColumn>
              <S.Subttl>Даты</S.Subttl>

              <S.CalendarBox>
                <S.CalendarHeader>
                  <S.CalendarMonth>{currentMonthTitle}</S.CalendarMonth>

                  <S.CalendarNav>
                    <S.CalendarArrow
                      type="button"
                      aria-label="Предыдущий месяц"
                      onClick={handlePrevMonth}
                    >
                      ‹
                    </S.CalendarArrow>

                    <S.CalendarArrow
                      type="button"
                      aria-label="Следующий месяц"
                      onClick={handleNextMonth}
                    >
                      ›
                    </S.CalendarArrow>
                  </S.CalendarNav>
                </S.CalendarHeader>

                <S.CalendarWeekDays>
                  {weekDays.map((day) => (
                    <S.CalendarWeekDay key={day}>{day}</S.CalendarWeekDay>
                  ))}
                </S.CalendarWeekDays>

                <S.CalendarGrid>
                  {calendarDays.map((calendarDay) => {
                    if (calendarDay.type === "empty") {
                      return <S.CalendarEmptyDay key={calendarDay.key} />;
                    }

                    return (
                      <S.CalendarDay
                        type="button"
                        key={calendarDay.key}
                        $selected={isSameDay(calendarDay.date, selectedDate)}
                        $today={isSameDay(calendarDay.date, new Date())}
                        onClick={() => handleDateSelect(calendarDay.date)}
                      >
                        {calendarDay.day}
                      </S.CalendarDay>
                    );
                  })}
                </S.CalendarGrid>

                <S.DeadlineText>
                  Срок исполнения:{" "}
                  <S.DeadlineDate>
                    {formatDeadline(selectedDate)}
                  </S.DeadlineDate>
                </S.DeadlineText>
              </S.CalendarBox>
            </S.RightColumn>
          </S.MainContent>

          <S.ButtonGroup>
            <S.ButtonsLeft>
              <S.SaveButton
                type="button"
                disabled={isLoading}
                onClick={handleSave}
              >
                {isLoading ? "Сохранение..." : "Сохранить"}
              </S.SaveButton>

              <S.CancelButton type="button" onClick={closeBrowse}>
                Отменить
              </S.CancelButton>

              <S.DeleteButton
                type="button"
                disabled={isLoading}
                onClick={handleDelete}
              >
                Удалить задачу
              </S.DeleteButton>
            </S.ButtonsLeft>

            <S.PopBrowseClose type="button" onClick={closeBrowse}>
              Закрыть
            </S.PopBrowseClose>
          </S.ButtonGroup>
        </S.PopBrowseContent>
      </S.PopBrowseBlock>
    </S.PopBrowseContainer>
  );
};

export default PopBrowse;
