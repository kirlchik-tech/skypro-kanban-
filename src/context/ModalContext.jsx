import React, { createContext, useContext, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ModalContext = createContext(null);

const modalRoutes = ["new-card", "exit", "login", "register", "404"];

export const ModalProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentTask, setCurrentTask] = useState(null);

  const routeName = location.pathname.split("/").filter(Boolean)[0];

  const isNewCardOpen = routeName === "new-card";
  const isExitOpen = routeName === "exit";
  const isBrowseOpen = Boolean(routeName) && !modalRoutes.includes(routeName);

  const openNewCard = () => {
    navigate("/new-card");
  };

  const closeNewCard = () => {
    navigate("/");
  };

  const openBrowse = (task) => {
    if (!task?._id) return;

    setCurrentTask(task);
    navigate(`/${task._id}`);
  };

  const closeBrowse = () => {
    setCurrentTask(null);
    navigate("/");
  };

  const openExit = () => {
    navigate("/exit");
  };

  const closeExit = () => {
    navigate("/");
  };

  const value = useMemo(
    () => ({
      isNewCardOpen,
      isBrowseOpen,
      isExitOpen,
      currentTask,
      openNewCard,
      closeNewCard,
      openBrowse,
      closeBrowse,
      openExit,
      closeExit,
    }),
    [isNewCardOpen, isBrowseOpen, isExitOpen, currentTask],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal должен использоваться внутри ModalProvider");
  }

  return context;
};
