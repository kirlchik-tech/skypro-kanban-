import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #151419;
  font-family: "Roboto", sans-serif;
`;

const NotFoundCard = styled.div`
  width: 100%;
  max-width: 368px;
  padding: 50px 60px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #20202c;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 10px;
`;

const NotFoundTitle = styled.h1`
  margin-bottom: 12px;

  color: #ffffff;
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
`;

const NotFoundText = styled.p`
  margin-bottom: 24px;

  color: rgba(148, 166, 190, 0.8);
  font-size: 16px;
  line-height: 1.4;
  text-align: center;
`;

const HomeLink = styled(Link)`
  min-width: 150px;
  height: 36px;
  padding: 0 18px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  background-color: #565eef;
  border-radius: 4px;

  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    background-color: #33399b;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundWrapper>
      <NotFoundCard>
        <NotFoundTitle>404</NotFoundTitle>
        <NotFoundText>Страница не найдена или была удалена</NotFoundText>

        <HomeLink to="/">На главную</HomeLink>
      </NotFoundCard>
    </NotFoundWrapper>
  );
};

export default NotFoundPage;
