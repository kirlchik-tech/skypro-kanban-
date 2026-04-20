import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Auth.styled";

const SignUpPage = ({ login }) => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    login();
    navigate("/");
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.Title>Регистрация</S.Title>
        <S.Form id="formLogUp" action="#">
          <S.Input
            type="text"
            name="first-name"
            id="first-name"
            placeholder="Имя"
          />
          <S.Input
            type="text"
            name="login"
            id="loginReg"
            placeholder="Эл. почта"
          />
          <S.Input
            type="password"
            name="password"
            id="passwordFirst"
            placeholder="Пароль"
          />
          <S.Button id="SignUpEnter" onClick={handleRegister}>
            Зарегистрироваться
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
