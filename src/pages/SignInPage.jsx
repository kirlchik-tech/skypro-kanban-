import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Auth.styled";

const SignInPage = ({ login }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate("/");
  };

  return (
    <S.Wrapper>
      <S.ContainerSignin>
        <S.Modal>
          <S.ModalBlock>
            <S.ModalTtl>Вход</S.ModalTtl>
            <S.ModalFormLogin id="formLogIn">
              <S.ModalInput type="text" placeholder="Эл. почта" />
              <S.ModalInput type="password" placeholder="Пароль" />
              <S.ModalBtnEnter onClick={handleLogin}>Войти</S.ModalBtnEnter>
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
