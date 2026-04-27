import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../components/common/Layout.styled";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Loader from "../components/Loader/Loader";
import PopNewCard from "../components/PopNewCard/PopNewCard";
import PopBrowse from "../components/PopBrowse/PopBrowse";
import PopUser from "../components/PopUser/PopUser";
import { getTasks } from "../services/tasks";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    setIsLoading(true);
    setError("");
    try {
      const tasks = await getTasks();
      setCards(tasks);
    } catch (err) {
      console.error(err);
      // Обработка 401 - не авторизован
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError(
          err.response?.data?.message ||
            "Не удалось загрузить задачи. Попробуйте позже.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (error) {
    return (
      <Wrapper>
        <Outlet />
        <Header />
        <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
          <p>{error}</p>
          <button
            onClick={loadTasks}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Повторить
          </button>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header />
      {isLoading ? <Loader /> : <Main cards={cards} />}
      <PopNewCard onTaskCreated={loadTasks} />
      <PopBrowse onTaskUpdated={loadTasks} onTaskDeleted={loadTasks} />
      <PopUser />
    </Wrapper>
  );
};

export default MainPage;
