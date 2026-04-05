import React from "react";
import Column from "../Column/Column";
import { MainContainer, MainBlock, ContentWrapper } from "./Main.styled";
import { Container } from "../common/Layout.styled";

const statusList = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];

const Main = ({ cards }) => {
  return (
    <MainContainer>
      <Container>
        <MainBlock>
          <ContentWrapper>
            {statusList.map((status) => (
              <Column
                key={status}
                title={status}
                cards={cards.filter((card) => card.status === status)}
              />
            ))}
          </ContentWrapper>
        </MainBlock>
      </Container>
    </MainContainer>
  );
};

export default Main;
