import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const openNewCard = () => setIsNewCardOpen(true);
  const closeNewCard = () => setIsNewCardOpen(false);

  const openBrowse = (card) => {
    console.log("Open browse with:", card);
    setCurrentTask(card);
    setIsBrowseOpen(true);
  };
  const closeBrowse = () => {
    setCurrentTask(null);
    setIsBrowseOpen(false);
  };

  const openExit = () => setIsExitOpen(true);
  const closeExit = () => setIsExitOpen(false);

  return (
    <ModalContext.Provider
      value={{
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
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
