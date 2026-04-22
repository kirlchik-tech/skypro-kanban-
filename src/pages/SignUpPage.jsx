import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Auth.styled";

const SignUpPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const userData = { name: name, email: email };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    navigate("/");
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.Title>Регистрация</S.Title>
        <S.Form id="formLogUp" onSubmit={handleRegister}>
          <S.Input
            type="text"
            name="first-name"
            id="first-name"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <S.Input
            type="text"
            name="login"
            id="loginReg"
            placeholder="Эл. почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <S.Input
            type="password"
            name="password"
            id="passwordFirst"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <S.Button type="submit">Зарегистрироваться</S.Button>
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
