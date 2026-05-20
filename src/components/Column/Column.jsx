import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import Card from "../Card/Card";
import {
  CardsList,
  ColumnContainer,
  ColumnTitle,
  DraggableCardWrapper,
  DropHint,
} from "./Column.styled";

const DraggableCard = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card._id,
      data: {
        card,
      },
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.35 : 1,
    zIndex: isDragging ? 20 : 1,
  };

  return (
    <DraggableCardWrapper
      ref={setNodeRef}
      style={style}
      $isDragging={isDragging}
      {...listeners}
      {...attributes}
    >
      <Card cardData={card} />
    </DraggableCardWrapper>
  );
};

const Column = ({ title, cards = [] }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
    data: {
      status: title,
    },
  });

  return (
    <ColumnContainer ref={setNodeRef} $isOver={isOver}>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>

      <CardsList $isOver={isOver}>
        {cards.map((card) => (
          <DraggableCard key={card._id} card={card} />
        ))}

        {isOver && <DropHint>Отпустите карточку здесь</DropHint>}
      </CardsList>
    </ColumnContainer>
  );
};

export default Column;
