import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Wrapper } from "../components/common/Layout.styled";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Loader from "../components/Loader/Loader";
import { useTasks } from "../context/TaskContext";

const MainPage = () => {
  const navigate = useNavigate();

  const { cards, isLoading, error, loadTasks } = useTasks();

  const loadTasksSafely = async () => {
    try {
      await loadTasks();
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login", { replace: true });
      }
    }
  };

  useEffect(() => {
    loadTasksSafely();
  }, [loadTasks, navigate]);

  const handleRetry = async () => {
    await loadTasksSafely();
  };

  if (error) {
    return (
      <Wrapper>
        <Header />

        <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
          <p>{error}</p>

          <button
            type="button"
            onClick={handleRetry}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Повторить
          </button>
        </div>

        <Outlet />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header />
      {isLoading ? <Loader /> : <Main cards={cards} />}

      <Outlet />
    </Wrapper>
  );
};

export default MainPage;
