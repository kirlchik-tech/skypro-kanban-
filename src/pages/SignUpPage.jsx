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

const SignUpPage = () => {
  const navigate = useNavigate();

  const { register, isAuth } = useAuth();

  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    setError("");

    if (!trimmedLogin) {
      setError("Введите логин");
      toast.warning("Введите логин");
      return false;
    }

    if (trimmedLogin.length < 3) {
      setError("Логин должен содержать минимум 3 символа");
      toast.warning("Логин должен содержать минимум 3 символа");
      return false;
    }

    if (!trimmedName) {
      setError("Введите имя");
      toast.warning("Введите имя");
      return false;
    }

    if (trimmedName.length < 2) {
      setError("Имя должно содержать минимум 2 символа");
      toast.warning("Имя должно содержать минимум 2 символа");
      return false;
    }

    if (!trimmedPassword) {
      setError("Введите пароль");
      toast.warning("Введите пароль");
      return false;
    }

    if (trimmedPassword.length < 6) {
      setError("Пароль должен содержать минимум 6 символов");
      toast.warning("Пароль должен содержать минимум 6 символов");
      return false;
    }

    if (!trimmedConfirmPassword) {
      setError("Подтвердите пароль");
      toast.warning("Подтвердите пароль");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      toast.warning("Пароли не совпадают");
      return false;
    }

    return true;
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await register(login.trim(), name.trim(), password);

      toast.success("Регистрация прошла успешно");
      navigate("/", { replace: true });
    } catch (err) {
      const message = getAuthErrorMessage(
        err,
        "Ошибка регистрации. Попробуйте другой логин.",
      );

      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.Title>Регистрация</S.Title>

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

        <S.Form onSubmit={handleRegister}>
          <S.Input
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

          <S.Input
            type="text"
            placeholder="Имя"
            value={name}
            disabled={isLoading}
            required
            onChange={(event) => {
              setName(event.target.value);
              clearError();
            }}
          />

          <S.Input
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

          <S.Input
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            disabled={isLoading}
            required
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              clearError();
            }}
          />

          <S.Button type="submit" disabled={isLoading}>
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </S.Button>

          <S.FooterText>
            <p>
              Уже есть аккаунт?{" "}
              <S.StyledLink to="/login">Войдите здесь</S.StyledLink>
            </p>
          </S.FooterText>
        </S.Form>
      </S.Modal>
    </S.Wrapper>
  );
};

export default SignUpPage;
