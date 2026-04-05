import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import PopNewCard from "./components/PopNewCard/PopNewCard";
import PopBrowse from "./components/PopBrowse/PopBrowse";
import PopUser from "./components/PopUser/PopUser";
import Loader from "./components/Loader/Loader";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import { Wrapper } from "./components/common/Layout.styled"; // ← ТОЛЬКО ЭТОТ
import { cardList } from "./data";
import "./styles/popups.css";

function App() {
  const [cards, setCards] = useState(cardList);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <PopUser />
        <PopNewCard />
        <PopBrowse />
        <Header />
        {isLoading ? <Loader /> : <Main cards={cards} />}
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
