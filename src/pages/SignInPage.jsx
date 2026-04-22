import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Auth.styled";

const SignInPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { name: "Иван Иванов", email: email };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    navigate("/");
  };

  return (
    <S.Wrapper>
      <S.ContainerSignin>
        <S.Modal>
          <S.ModalBlock>
            <S.ModalTtl>Вход</S.ModalTtl>
            <S.ModalFormLogin id="formLogIn" onSubmit={handleLogin}>
              <S.ModalInput
                type="text"
                placeholder="Эл. почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <S.ModalInput
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <S.ModalBtnEnter type="submit">Войти</S.ModalBtnEnter>
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
