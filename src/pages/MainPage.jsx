import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../components/common/Layout.styled";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Loader from "../components/Loader/Loader";
import PopNewCard from "../components/PopNewCard/PopNewCard";
import PopBrowse from "../components/PopBrowse/PopBrowse";
import PopUser from "../components/PopUser/PopUser";
import { useTasks } from "../context/TaskContext";

const MainPage = () => {
  const navigate = useNavigate();

  const { cards, isLoading, error, loadTasks } = useTasks();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await loadTasks();
      } catch (err) {
        if (err?.response?.status === 401) {
          navigate("/login", { replace: true });
        }
      }
    };

    fetchTasks();
  }, [loadTasks, navigate]);

  const handleRetry = async () => {
    try {
      await loadTasks();
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login", { replace: true });
      }
    }
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

        <PopUser />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header />
      {isLoading ? <Loader /> : <Main cards={cards} />}
      <PopNewCard />
      <PopBrowse />
      <PopUser />
    </Wrapper>
  );
};

export default MainPage;
