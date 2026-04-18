import React from "react";
import styled from "styled-components";

const NotFoundWrapper = styled.div`
  background: #151419;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const NotFoundPage = () => (
  <NotFoundWrapper>
    <h1>404</h1>
    <p>Страница не найдена</p>
  </NotFoundWrapper>
);

export default NotFoundPage;
