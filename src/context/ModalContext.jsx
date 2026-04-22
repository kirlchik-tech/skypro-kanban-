import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const openNewCard = () => setIsNewCardOpen(true);
  const closeNewCard = () => setIsNewCardOpen(false);

  const openBrowse = (card) => {
    setSelectedCard(card);
    setIsBrowseOpen(true);
  };
  const closeBrowse = () => {
    setSelectedCard(null);
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
        selectedCard,
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
