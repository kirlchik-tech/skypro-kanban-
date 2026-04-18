import { Routes, Route } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import SignInPage from "../../pages/SignInPage";
import SignUpPage from "../../pages/SignUpPage";
import NotFoundPage from "../../pages/NotFoundPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PopUser from "../PopUser/PopUser";
import PopNewCard from "../PopNewCard/PopNewCard";
import PopBrowse from "../PopBrowse/PopBrowse";

function AppRoutes({ user, setUser }) {
  const login = () => setUser({ login: "admin" });
  const logout = () => setUser(null);

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={!!user} />}>
        <Route path="/" element={<MainPage />}>
          <Route path="exit" element={<PopUser logout={logout} />} />
          <Route path="new-card" element={<PopNewCard />} />
          <Route path="card/:id" element={<PopBrowse />} />
        </Route>
      </Route>

      <Route path="/login" element={<SignInPage login={login} />} />
      <Route path="/register" element={<SignUpPage login={login} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
