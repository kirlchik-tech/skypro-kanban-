import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import PopNewCard from "./components/PopNewCard/PopNewCard";
import PopBrowse from "./components/PopBrowse/PopBrowse";
import PopUser from "./components/PopUser/PopUser";
import "./styles/popups.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PopNewCard />
      <PopBrowse />
      <PopUser />
      <AppRoutes user={user} setUser={setUser} />
    </ThemeProvider>
  );
}

export default App;
