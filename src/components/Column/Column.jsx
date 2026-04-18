import React from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import { ColumnContainer, ColumnTitle, CardsList } from "./Column.styled";

const Column = ({ title, cards }) => {
  return (
    <ColumnContainer>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <CardsList>
        {cards.map((card) => (
          <Link to={`/card/${card.id}`} key={card.id}>
            <Card topic={card.topic} title={card.title} date={card.date} />
          </Link>
        ))}
      </CardsList>
    </ColumnContainer>
  );
};

export default Column;
