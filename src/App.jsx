import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle } from "./styles/GlobalStyle";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import { ModalProvider } from "./context/ModalContext";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { ThemeModeProvider, useThemeMode } from "./context/ThemeModeContext";

const AppContent = () => {
  const { isDarkTheme } = useThemeMode();

  return (
    <>
      <GlobalStyle />

      <AuthProvider>
        <TaskProvider>
          <ModalProvider>
            <AppRoutes />
          </ModalProvider>
        </TaskProvider>
      </AuthProvider>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkTheme ? "dark" : "light"}
      />
    </>
  );
};

function App() {
  return (
    <ThemeModeProvider>
      <AppContent />
    </ThemeModeProvider>
  );
}

export default App;
