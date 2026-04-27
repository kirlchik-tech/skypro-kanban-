import React from "react";
import Card from "../Card/Card";
import { ColumnContainer, ColumnTitle, CardsList } from "./Column.styled";

const Column = ({ title, cards }) => {
  return (
    <ColumnContainer>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <CardsList>
        {cards.map((card) => (
          <Card
            key={card._id}
            topic={card.topic}
            title={card.title}
            date={card.date}
            cardData={card}
          />
        ))}
      </CardsList>
    </ColumnContainer>
  );
};

export default Column;
