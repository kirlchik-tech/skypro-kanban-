import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import SignInPage from "../../pages/SignInPage";
import SignUpPage from "../../pages/SignUpPage";
import NotFoundPage from "../../pages/NotFoundPage";
import { isAuthenticated } from "../../services/auth";

const AppRoutes = ({ setUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated() ? <MainPage /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<SignInPage setUser={setUser} />} />
      <Route path="/register" element={<SignUpPage setUser={setUser} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
