import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import PopNewCard from "./components/PopNewCard/PopNewCard";
import PopBrowse from "./components/PopBrowse/PopBrowse";
import PopUser from "./components/PopUser/PopUser";
import { cardList } from "./data";
import "./App.css";

function App() {
  const [cards, setCards] = useState(cardList);
  const [isLoading, setIsLoading] = useState(true);

  // Теперь эта часть будет работать без ошибок
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="wrapper">
      <PopUser />
      <PopNewCard />
      <PopBrowse />
      <Header />

      {isLoading ? (
        <div className="loader-container">
          <h1 className="loader-text">Данные загружаются...</h1>
        </div>
      ) : (
        <Main cards={cards} />
      )}
    </div>
  );
}

export default App;
