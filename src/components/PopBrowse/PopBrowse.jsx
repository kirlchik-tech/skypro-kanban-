import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";
import { useTasks } from "../../context/TaskContext";
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
  if (typeof err?.response?.data === "string") {
    return err.response.data;
  }

  if (err?.response?.data?.message) {
    return err.response.data.message;
  }

  if (err?.response?.data?.error) {
    return err.response.data.error;
  }

  if (err?.message) {
    return err.message;
  }

  return defaultMessage;
};

const PopBrowse = () => {
  const { id } = useParams();

  const { isBrowseOpen, closeBrowse, currentTask } = useModal();
  const { cards, isLoading: isTasksLoading, editTask, removeTask } = useTasks();

  const taskFromRoute = useMemo(() => {
    return cards.find((card) => card._id === id);
  }, [cards, id]);

  const task =
    currentTask?._id === id || currentTask?.id === id
      ? currentTask
      : taskFromRoute;

  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Без статуса");
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");

  const resetForm = useCallback(() => {
    if (!task) return;

    const taskDate = normalizeDate(task.date);

    setTitle(task.title || "");
    setDescription(task.description || "");
    setStatus(task.status || "Без статуса");
    setSelectedDate(taskDate);
    setViewDate(taskDate || new Date());
    setError("");
    setTitleError("");
    setIsLoading(false);
  }, [task]);

  const handleClose = useCallback(() => {
    setIsEditMode(false);
    closeBrowse();
  }, [closeBrowse]);

  useEffect(() => {
    resetForm();
    setIsEditMode(false);
  }, [resetForm]);

  useEffect(() => {
    if (isBrowseOpen && !isTasksLoading && !task) {
      toast.error("Задача не найдена");
      closeBrowse();
    }
  }, [isBrowseOpen, isTasksLoading, task, closeBrowse]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isBrowseOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose, isBrowseOpen]);

  const calendarDays = useMemo(() => getCalendarDays(viewDate), [viewDate]);

  if (!isBrowseOpen || !task) return null;

  const validateForm = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    setError("");
    setTitleError("");

    if (!trimmedTitle) {
      setTitleError("Введите название задачи");
      toast.warning("Введите название задачи");
      return false;
    }

    if (trimmedTitle.length < 3) {
      setTitleError("Название должно содержать минимум 3 символа");
      toast.warning("Название должно содержать минимум 3 символа");
      return false;
    }

    if (trimmedTitle.length > 100) {
      setTitleError("Название не должно превышать 100 символов");
      toast.warning("Название не должно превышать 100 символов");
      return false;
    }

    if (!trimmedDescription) {
      setError("Введите описание задачи");
      toast.warning("Введите описание задачи");
      return false;
    }

    if (!selectedDate) {
      setError("Выберите срок исполнения");
      toast.warning("Выберите срок исполнения");
      return false;
    }

    return true;
  };

  const handleCancelEdit = () => {
    resetForm();
    setIsEditMode(false);
  };

  const handleDateSelect = (date) => {
    if (!isEditMode) return;

    setSelectedDate(date);
    setViewDate(date);

    if (error) {
      setError("");
    }
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
      topic: task.topic || "Web Design",
      description: description.trim(),
      status,
      date: selectedDate.toISOString(),
    };

    try {
      await editTask(task._id, taskData);

      toast.success("Задача успешно сохранена");
      setIsEditMode(false);
      closeBrowse();
    } catch (err) {
      const message = getErrorMessage(
        err,
        "Ошибка сохранения задачи. Попробуйте снова.",
      );

      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError("");

    try {
      await removeTask(task._id);

      toast.success("Задача удалена");
      closeBrowse();
    } catch (err) {
      const message = getErrorMessage(
        err,
        "Ошибка удаления задачи. Попробуйте снова.",
      );

      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const currentMonthTitle = `${
    monthNames[viewDate.getMonth()]
  } ${viewDate.getFullYear()}`;

  return (
    <S.PopBrowseContainer onMouseDown={handleClose}>
      <S.PopBrowseBlock onMouseDown={(event) => event.stopPropagation()}>
        <S.PopBrowseContent>
          <S.PopBrowseHeader>
            {isEditMode ? (
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
            ) : (
              <S.TitleText>{title || "Название задачи"}</S.TitleText>
            )}

            <S.TopicTag $topic={task.topic}>
              {task.topic || "Web Design"}
            </S.TopicTag>
          </S.PopBrowseHeader>

          {(error || titleError) && (
            <S.ErrorText>{error || titleError}</S.ErrorText>
          )}

          <S.StatusBlock>
            <S.Subttl>Статус</S.Subttl>

            <S.StatusButtons $isEditMode={isEditMode}>
              {isEditMode ? (
                statuses.map((statusName) => (
                  <S.StatusButton
                    type="button"
                    key={statusName}
                    disabled={isLoading}
                    $active={status === statusName}
                    $statusName={statusName}
                    onClick={() => setStatus(statusName)}
                  >
                    {statusName}
                  </S.StatusButton>
                ))
              ) : (
                <S.StatusButton
                  type="button"
                  disabled
                  $active
                  $readonly
                  $statusName={status}
                >
                  {status}
                </S.StatusButton>
              )}
            </S.StatusButtons>
          </S.StatusBlock>

          <S.MainContent>
            <S.LeftColumn>
              <S.DescriptionBlock>
                <S.Subttl htmlFor="task-description">Описание задачи</S.Subttl>

                {isEditMode ? (
                  <S.DescriptionTextarea
                    id="task-description"
                    placeholder="Введите описание задачи..."
                    value={description}
                    disabled={isLoading}
                    onChange={(event) => {
                      setDescription(event.target.value);

                      if (error) {
                        setError("");
                      }
                    }}
                  />
                ) : (
                  <S.DescriptionPreview>
                    {description || "Описание задачи"}
                  </S.DescriptionPreview>
                )}
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
                        disabled={!isEditMode}
                        $isEditMode={isEditMode}
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
              {isEditMode ? (
                <>
                  <S.PrimaryButton
                    type="button"
                    disabled={isLoading}
                    onClick={handleSave}
                  >
                    {isLoading ? "Сохранение..." : "Сохранить"}
                  </S.PrimaryButton>

                  <S.SecondaryButton
                    type="button"
                    disabled={isLoading}
                    onClick={handleCancelEdit}
                  >
                    Отменить
                  </S.SecondaryButton>
                </>
              ) : (
                <S.SecondaryButton
                  type="button"
                  disabled={isLoading}
                  onClick={() => setIsEditMode(true)}
                >
                  Редактировать задачу
                </S.SecondaryButton>
              )}

              <S.SecondaryButton
                type="button"
                disabled={isLoading}
                onClick={handleDelete}
              >
                Удалить задачу
              </S.SecondaryButton>
            </S.ButtonsLeft>

            <S.PrimaryButton type="button" onClick={handleClose}>
              Закрыть
            </S.PrimaryButton>
          </S.ButtonGroup>
        </S.PopBrowseContent>
      </S.PopBrowseBlock>
    </S.PopBrowseContainer>
  );
};

export default PopBrowse;
