import React, { useEffect, useState } from "react";
import Calendar from "../Calendar/Calendar";
import { useModal } from "../../context/ModalContext";
import { useTasks } from "../../context/TaskContext";
import * as S from "./PopNewCard.styled";

const categories = [
  { name: "Web Design", bgColor: "#FFE4C2", textColor: "#FF6D00" },
  { name: "Research", bgColor: "#B4FDD1", textColor: "#06B16E" },
  { name: "Copywriting", bgColor: "#E9D4FF", textColor: "#9A48F1" },
];

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

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isNewCardOpen) {
        closeNewCard();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isNewCardOpen, closeNewCard]);

  if (!isNewCardOpen) return null;

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Web Design");
    setSelectedDate(null);
    setError("");
    setTitleError("");
  };

  const handleClose = () => {
    resetForm();
    closeNewCard();
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const validateForm = () => {
    const trimmedTitle = title.trim();

    setTitleError("");
    setError("");

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

  const handleCreate = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    const taskData = {
      title: title.trim(),
      topic: category,
      description: description.trim(),
      status: "Без статуса",
      date: selectedDate
        ? selectedDate.toISOString()
        : new Date().toISOString(),
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
                    style={{ borderColor: titleError ? "red" : undefined }}
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
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </S.PopNewCardFormBlock>
              </S.PopNewCardForm>

              <S.CalendarWrapper>
                <Calendar
                  isEditable
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
              </S.CalendarWrapper>
            </S.PopNewCardMainContent>

            <S.PopNewCardCategories>
              <S.Subttl>Категория</S.Subttl>

              <S.CategoriesThemes>
                {categories.map((cat) => (
                  <S.CategoriesThemeItem
                    key={cat.name}
                    type="button"
                    $active={category === cat.name}
                    $bgColor={cat.bgColor}
                    $textColor={cat.textColor}
                    onClick={() => setCategory(cat.name)}
                  >
                    {cat.name}
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
