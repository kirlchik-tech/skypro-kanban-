import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as S from "./Auth.styled";

const getAuthErrorMessage = (err, fallbackMessage) => {
  if (err?.message === "Failed to fetch" || err instanceof TypeError) {
    return "Ошибка сети. Проверьте подключение к интернету";
  }

  if (typeof err?.response?.data === "string") {
    return err.response.data;
  }

  if (err?.response?.data?.error) {
    return err.response.data.error;
  }

  if (err?.response?.data?.message) {
    return err.response.data.message;
  }

  if (err?.message) {
    return err.message;
  }

  return fallbackMessage;
};

const SignInPage = () => {
  const navigate = useNavigate();

  const { login: loginUser, isAuth } = useAuth();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
    }
  }, [isAuth, navigate]);

  const clearError = () => {
    if (error) {
      setError("");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    if (!login.trim()) {
      setError("Введите логин");
      return;
    }

    if (!password.trim()) {
      setError("Введите пароль");
      return;
    }

    setIsLoading(true);

    try {
      await loginUser(login, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err, "Неверный логин или пароль"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Wrapper>
      <S.ContainerSignin>
        <S.Modal>
          <S.ModalBlock>
            <S.ModalTtl>Вход</S.ModalTtl>

            {error && (
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                {error}
              </p>
            )}

            <S.ModalFormLogin onSubmit={handleLogin}>
              <S.ModalInput
                type="text"
                placeholder="Логин"
                value={login}
                disabled={isLoading}
                required
                onChange={(event) => {
                  setLogin(event.target.value);
                  clearError();
                }}
              />

              <S.ModalInput
                type="password"
                placeholder="Пароль"
                value={password}
                disabled={isLoading}
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                  clearError();
                }}
              />

              <S.ModalBtnEnter type="submit" disabled={isLoading}>
                {isLoading ? "Вход..." : "Войти"}
              </S.ModalBtnEnter>

              <S.ModalFormGroup>
                <p>Нужно зарегистрироваться?</p>
                <S.StyledLink to="/register">
                  Регистрируйтесь здесь
                </S.StyledLink>
              </S.ModalFormGroup>
            </S.ModalFormLogin>
          </S.ModalBlock>
        </S.Modal>
      </S.ContainerSignin>
    </S.Wrapper>
  );
};

export default SignInPage;
