import React, { useCallback, useEffect, useState } from "react";
import Calendar from "../Calendar/Calendar";
import { useModal } from "../../context/ModalContext";
import { useTasks } from "../../context/TaskContext";
import * as S from "./PopNewCard.styled";

const categories = ["Web Design", "Research", "Copywriting"];

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

const PopNewCard = () => {
  const { isNewCardOpen, closeNewCard } = useModal();
  const { createTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Design");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [dateError, setDateError] = useState("");

  const resetForm = useCallback(() => {
    setTitle("");
    setDescription("");
    setCategory("Web Design");
    setSelectedDate(null);
    setIsLoading(false);
    setError("");
    setTitleError("");
    setDescriptionError("");
    setDateError("");
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    closeNewCard();
  }, [closeNewCard, resetForm]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isNewCardOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose, isNewCardOpen]);

  if (!isNewCardOpen) return null;

  const validateForm = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    setError("");
    setTitleError("");
    setDescriptionError("");
    setDateError("");

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

    if (!trimmedDescription) {
      setDescriptionError("Введите описание задачи");
      return false;
    }

    if (!selectedDate) {
      setDateError("Выберите срок исполнения");
      return false;
    }

    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    const taskData = {
      title: title.trim(),
      topic: category,
      description: description.trim(),
      status: "Без статуса",
      date: selectedDate.toISOString(),
    };

    try {
      await createTask(taskData);
      resetForm();
      closeNewCard();
    } catch (err) {
      setError(
        getErrorMessage(err, "Ошибка создания задачи. Попробуйте снова."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.PopNewCard>
      <S.PopNewCardContainer onClick={handleClose}>
        <S.PopNewCardBlock onClick={(event) => event.stopPropagation()}>
          <S.PopNewCardContent>
            <S.PopNewCardTtl>Создание задачи</S.PopNewCardTtl>

            {error && <S.ErrorText>{error}</S.ErrorText>}

            <S.PopNewCardMainContent>
              <S.PopNewCardForm>
                <S.PopNewCardFormBlock>
                  <S.Subttl htmlFor="formTitle">Название задачи</S.Subttl>

                  <S.PopNewCardInput
                    type="text"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    value={title}
                    disabled={isLoading}
                    style={{ borderColor: titleError ? "#ff4d4f" : undefined }}
                    onChange={(event) => {
                      setTitle(event.target.value);

                      if (titleError) {
                        setTitleError("");
                      }
                    }}
                  />

                  {titleError && <S.ErrorText>{titleError}</S.ErrorText>}
                </S.PopNewCardFormBlock>

                <S.PopNewCardFormBlock>
                  <S.Subttl htmlFor="formArea">Описание задачи</S.Subttl>

                  <S.PopNewCardArea
                    id="formArea"
                    placeholder="Введите описание задачи..."
                    value={description}
                    disabled={isLoading}
                    style={{
                      borderColor: descriptionError ? "#ff4d4f" : undefined,
                    }}
                    onChange={(event) => {
                      setDescription(event.target.value);

                      if (descriptionError) {
                        setDescriptionError("");
                      }
                    }}
                  />

                  {descriptionError && (
                    <S.ErrorText>{descriptionError}</S.ErrorText>
                  )}
                </S.PopNewCardFormBlock>
              </S.PopNewCardForm>

              <S.CalendarWrapper>
                <Calendar
                  isEditable
                  selectedDate={selectedDate}
                  onDateSelect={(date) => {
                    setSelectedDate(date);

                    if (dateError) {
                      setDateError("");
                    }
                  }}
                />

                {dateError && <S.ErrorText>{dateError}</S.ErrorText>}
              </S.CalendarWrapper>
            </S.PopNewCardMainContent>

            <S.PopNewCardCategories>
              <S.Subttl>Категория</S.Subttl>

              <S.CategoriesThemes>
                {categories.map((categoryName) => (
                  <S.CategoriesThemeItem
                    key={categoryName}
                    type="button"
                    $active={category === categoryName}
                    $topic={categoryName}
                    onClick={() => setCategory(categoryName)}
                    disabled={isLoading}
                  >
                    {categoryName}
                  </S.CategoriesThemeItem>
                ))}
              </S.CategoriesThemes>
            </S.PopNewCardCategories>

            <S.CreateButton
              type="button"
              onClick={handleCreate}
              disabled={isLoading}
            >
              {isLoading ? "Создание..." : "Создать задачу"}
            </S.CreateButton>
          </S.PopNewCardContent>
        </S.PopNewCardBlock>
      </S.PopNewCardContainer>
    </S.PopNewCard>
  );
};

export default PopNewCard;
