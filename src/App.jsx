import { GlobalStyle } from "./styles/GlobalStyle";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import { ModalProvider } from "./context/ModalContext";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { ThemeModeProvider } from "./context/ThemeModeContext";
import "./styles/popups.css";

function App() {
  return (
    <ThemeModeProvider>
      <GlobalStyle />
      <AuthProvider>
        <TaskProvider>
          <ModalProvider>
            <AppRoutes />
          </ModalProvider>
        </TaskProvider>
      </AuthProvider>
    </ThemeModeProvider>
  );
}

export default App;
