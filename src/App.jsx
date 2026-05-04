import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import { ModalProvider } from "./context/ModalContext";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import "./styles/popups.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <TaskProvider>
          <ModalProvider>
            <AppRoutes />
          </ModalProvider>
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
