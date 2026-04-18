import React, { useState, useEffect } from "react";
import { Wrapper } from "../components/common/Layout.styled";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Loader from "../components/Loader/Loader";
import { cardList } from "../data";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  const [cards, setCards] = useState(cardList);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>
      {/* Outlet нужен для отображения модальных окон через вложенные маршруты */}
      <Outlet />
      <Header />
      {isLoading ? <Loader /> : <Main cards={cards} />}
    </Wrapper>
  );
};

export default MainPage;
