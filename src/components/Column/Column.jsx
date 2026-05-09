import React from "react";
import Card from "../Card/Card";
import { CardsList, ColumnContainer, ColumnTitle } from "./Column.styled";

const Column = ({ title, cards = [] }) => {
  return (
    <ColumnContainer>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>

      <CardsList>
        {cards.map((card) => (
          <Card key={card._id} cardData={card} />
        ))}
      </CardsList>
    </ColumnContainer>
  );
};

export default Column;
