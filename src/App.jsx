import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import "./styles/popups.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRoutes user={user} setUser={setUser} />
    </ThemeProvider>
  );
}

export default App;
