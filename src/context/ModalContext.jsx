import React, { createContext, useContext, useMemo, useState } from "react";

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const openNewCard = () => {
    setIsNewCardOpen(true);
  };

  const closeNewCard = () => {
    setIsNewCardOpen(false);
  };

  const openBrowse = (task) => {
    setCurrentTask(task);
    setIsBrowseOpen(true);
  };

  const closeBrowse = () => {
    setCurrentTask(null);
    setIsBrowseOpen(false);
  };

  const openExit = () => {
    setIsExitOpen(true);
  };

  const closeExit = () => {
    setIsExitOpen(false);
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
