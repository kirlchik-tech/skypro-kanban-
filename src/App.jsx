import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import { ModalProvider } from "./context/ModalContext";
import "./styles/popups.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ModalProvider>
        <AppRoutes user={user} setUser={setUser} />
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
