import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as S from "./Auth.styled";

const getAuthErrorMessage = (err, fallbackMessage) => {
  if (err?.message === "Failed to fetch" || err instanceof TypeError) {
    return "Сервер временно недоступен. Попробуйте позже.";
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

  const validateForm = () => {
    const trimmedLogin = login.trim();
    const trimmedPassword = password.trim();

    setError("");

    if (!trimmedLogin) {
      setError("Введите логин");
      toast.warning("Введите логин");
      return false;
    }

    if (!trimmedPassword) {
      setError("Введите пароль");
      toast.warning("Введите пароль");
      return false;
    }

    return true;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await loginUser(login.trim(), password);

      toast.success("Вы успешно вошли");
      navigate("/", { replace: true });
    } catch (err) {
      const message = getAuthErrorMessage(err, "Неверный логин или пароль");

      setError(message);
      toast.error(message);
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
