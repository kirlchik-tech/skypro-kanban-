import React, { useMemo, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { toast } from "react-toastify";
import { Container } from "../common/Layout.styled";
import Column from "../Column/Column";
import Card from "../Card/Card";
import { useTasks } from "../../context/TaskContext";
import { ContentWrapper, MainBlock, MainContainer } from "./Main.styled";

const statuses = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];

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

const Main = ({ cards = [] }) => {
  const { editTask } = useTasks();

  const [activeCard, setActiveCard] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const cardsByStatus = useMemo(() => {
    return statuses.reduce((acc, status) => {
      acc[status] = cards.filter((card) => card.status === status);
      return acc;
    }, {});
  }, [cards]);

  const handleDragStart = (event) => {
    const card = event.active.data.current?.card;

    if (card) {
      setActiveCard(card);
    }
  };

  const handleDragCancel = () => {
    setActiveCard(null);
  };

  const handleDragEnd = async (event) => {
    const card = event.active.data.current?.card;
    const newStatus = event.over?.data.current?.status;

    setActiveCard(null);

    if (!card || !newStatus || card.status === newStatus) return;

    const updatedTask = {
      title: card.title?.trim() || "Новая задача",
      topic: card.topic || "Research",
      status: newStatus,
      description: card.description || "",
      date: card.date || new Date().toISOString(),
    };

    try {
      await editTask(card._id, updatedTask);
      toast.success(`Задача перемещена в «${newStatus}»`);
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          "Не удалось переместить задачу. Попробуйте снова.",
        ),
      );
    }
  };

  return (
    <MainContainer>
      <Container>
        <MainBlock>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
            onDragEnd={handleDragEnd}
          >
            <ContentWrapper>
              {statuses.map((status) => (
                <Column
                  key={status}
                  title={status}
                  cards={cardsByStatus[status] || []}
                />
              ))}
            </ContentWrapper>

            <DragOverlay>
              {activeCard ? <Card cardData={activeCard} /> : null}
            </DragOverlay>
          </DndContext>
        </MainBlock>
      </Container>
    </MainContainer>
  );
};

export default Main;
