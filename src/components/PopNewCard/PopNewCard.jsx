import React, { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import { useModal } from "../../context/ModalContext";
import { addTask } from "../../services/tasks";
import * as S from "./PopNewCard.styled";

const categories = [
  { name: "Web Design", bgColor: "#FFE4C2", textColor: "#FF6D00" },
  { name: "Research", bgColor: "#B4FDD1", textColor: "#06B16E" },
  { name: "Copywriting", bgColor: "#E9D4FF", textColor: "#9A48F1" },
];

const PopNewCard = ({ onTaskCreated }) => {
  const { isNewCardOpen, closeNewCard } = useModal();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Design");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");

  // Обработчик нажатия Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isNewCardOpen) {
        closeNewCard();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isNewCardOpen, closeNewCard]);

  if (!isNewCardOpen) return null;

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const validateForm = () => {
    let isValid = true;
    setTitleError("");
    setError("");

    if (!title.trim()) {
      setTitleError("Введите название задачи");
      isValid = false;
    } else if (title.trim().length < 3) {
      setTitleError("Название должно содержать минимум 3 символа");
      isValid = false;
    } else if (title.trim().length > 100) {
      setTitleError("Название не должно превышать 100 символов");
      isValid = false;
    }

    return isValid;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    const taskData = {
      title: title.trim(),
      topic: category,
      description: description.trim() || "",
      status: "Без статуса",
      date: selectedDate
        ? selectedDate.toISOString()
        : new Date().toISOString(),
    };

    try {
      await addTask(taskData);
      if (onTaskCreated) onTaskCreated();
      closeNewCard();
      setTitle("");
      setDescription("");
      setSelectedDate(null);
      setCategory("Web Design");
      setTitleError("");
    } catch (err) {
      let errorMessage = "Ошибка создания задачи. Попробуйте снова.";
      if (err.response?.data) {
        if (typeof err.response.data === "string") {
          errorMessage = err.response.data;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.PopNewCard>
      <S.PopNewCardContainer onClick={closeNewCard}>
        <S.PopNewCardBlock onClick={(e) => e.stopPropagation()}>
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
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (titleError) setTitleError("");
                    }}
                    disabled={isLoading}
                    style={{ borderColor: titleError ? "red" : undefined }}
                  />
                  {titleError && <S.ErrorText>{titleError}</S.ErrorText>}
                </S.PopNewCardFormBlock>

                <S.PopNewCardFormBlock>
                  <S.Subttl htmlFor="formArea">Описание задачи</S.Subttl>
                  <S.PopNewCardArea
                    id="formArea"
                    placeholder="Введите описание задачи..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isLoading}
                  />
                </S.PopNewCardFormBlock>
              </S.PopNewCardForm>

              <S.CalendarWrapper>
                <Calendar
                  isEditable={true}
                  onDateSelect={handleDateSelect}
                  selectedDate={selectedDate}
                />
              </S.CalendarWrapper>
            </S.PopNewCardMainContent>

            <S.PopNewCardCategories>
              <S.Subttl>Категория</S.Subttl>
              <S.CategoriesThemes>
                {categories.map((cat) => (
                  <S.CategoriesThemeItem
                    key={cat.name}
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

            <S.CreateButton onClick={handleCreate} disabled={isLoading}>
              {isLoading ? "Создание..." : "Создать задачу"}
            </S.CreateButton>
          </S.PopNewCardContent>
        </S.PopNewCardBlock>
      </S.PopNewCardContainer>
    </S.PopNewCard>
  );
};

export default PopNewCard;
