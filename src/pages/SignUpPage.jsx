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

const SignUpPage = ({ login }) => {
  return (
    <Wrapper>
      <Modal>
        <Title>Регистрация</Title>
        <Form>
          <Input type="text" placeholder="Имя" />
          <Input type="email" placeholder="Эл. почта" />
          <Input type="password" placeholder="Пароль" />

          <Button type="button" onClick={login}>
            Зарегистрироваться
          </Button>
        </Form>
        <FooterText>
          Уже есть аккаунт? <StyledLink to="/login">Войдите здесь</StyledLink>
        </FooterText>
      </Modal>
    </Wrapper>
  );
};

export default SignUpPage;
