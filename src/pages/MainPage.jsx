import React, { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../components/common/Layout.styled";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Loader from "../components/Loader/Loader";
import { useTasks } from "../context/TaskContext";

const StateBlock = styled.div`
  min-height: 60vh;
  padding: 60px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  text-align: center;
`;

const StateTitle = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
`;

const StateText = styled.p`
  max-width: 460px;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
`;

const RetryButton = styled.button`
  min-width: 132px;
  height: 36px;
  padding: 0 18px;

  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary};

  color: ${({ theme }) => theme.colors.textLight};
  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const MainPage = () => {
  const navigate = useNavigate();

  const { cards, isLoading, error, hasLoaded, loadTasks } = useTasks();

  const loadTasksSafely = useCallback(
    async ({ force = false } = {}) => {
      try {
        await loadTasks({ force });
      } catch (err) {
        if (err?.response?.status === 401) {
          navigate("/login", { replace: true });
        }
      }
    },
    [loadTasks, navigate],
  );

  useEffect(() => {
    if (!hasLoaded) {
      loadTasksSafely();
    }
  }, [hasLoaded, loadTasksSafely]);

  const handleRetry = () => {
    loadTasksSafely({ force: true });
  };

  if (error) {
    return (
      <Wrapper>
        <Header />

        <StateBlock>
          <StateTitle>Не удалось загрузить задачи</StateTitle>
          <StateText>{error}</StateText>

          <RetryButton type="button" onClick={handleRetry}>
            Повторить
          </RetryButton>
        </StateBlock>

        <Outlet />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header />

      {isLoading ? (
        <Loader />
      ) : cards.length > 0 ? (
        <Main cards={cards} />
      ) : (
        <StateBlock>
          <StateTitle>Новых задач нет</StateTitle>
          <StateText>
            Создайте первую задачу, чтобы она появилась на канбан-доске.
          </StateText>
        </StateBlock>
      )}

      <Outlet />
    </Wrapper>
  );
};

export default MainPage;
