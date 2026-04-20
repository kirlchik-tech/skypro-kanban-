import React from "react";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import { ColumnContainer, ColumnTitle, CardsList } from "./Column.styled";

const Column = ({ title, cards }) => {
  const navigate = useNavigate();

  const handleCardClick = (cardId) => {
    navigate(`/card/${cardId}`);
  };

  return (
    <ColumnContainer>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <CardsList>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            style={{ cursor: "pointer" }}
          >
            <Card topic={card.topic} title={card.title} date={card.date} />
          </div>
        ))}
      </CardsList>
    </ColumnContainer>
  );
};

export default Column;
