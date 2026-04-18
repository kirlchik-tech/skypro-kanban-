import React from "react";
import {
  Wrapper,
  Modal,
  Title,
  Form,
  Input,
  Button,
  FooterText,
  StyledLink,
} from "./Auth.styled";

const SignInPage = ({ login }) => {
  return (
    <Wrapper>
      <Modal>
        <Title>Вход</Title>
        <Form>
          <Input type="email" placeholder="Эл. почта" />
          <Input type="password" placeholder="Пароль" />
          <Button type="button" onClick={login}>
            Войти
          </Button>
        </Form>
        <FooterText>
          Нужно зарегистрироваться? <br />
          <StyledLink to="/register">Регистрируйтесь здесь</StyledLink>
        </FooterText>
      </Modal>
    </Wrapper>
  );
};

export default SignInPage;
