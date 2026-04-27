import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../common/Layout.styled";
import { useModal } from "../../context/ModalContext";
import {
  HeaderContainer,
  HeaderBlock,
  Logo,
  Nav,
  NewTaskButton,
  UserButton,
  PopupUserMenu,
} from "./Header.styled";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openNewCard, openExit } = useModal();
  const user = JSON.parse(localStorage.getItem("user"));

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleNewCard = () => {
    openNewCard();
  };

  const handleExitClick = () => {
    setIsOpen(false);
    openExit();
  };

  return (
    <HeaderContainer>
      <Container>
        <HeaderBlock>
          <Logo>
            <Link to="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
          </Logo>
          <Nav>
            <NewTaskButton onClick={handleNewCard}>
              Создать новую задачу
            </NewTaskButton>
            <UserButton onClick={togglePopup}>
              {user?.name || "Иван Иванов"}
            </UserButton>
            <PopupUserMenu $isOpen={isOpen}>
              <p className="pop-user-set__name">
                {user?.name || "Иван Иванов"}
              </p>
              <p className="pop-user-set__mail">
                {user?.email || "ivan.ivanov@gmail.com"}
              </p>
              <div className="pop-user-set__theme">
                <p>Темная тема</p>
                <input type="checkbox" className="checkbox" name="checkbox" />
              </div>
              <button type="button" onClick={handleExitClick}>
                Выйти
              </button>
            </PopupUserMenu>
          </Nav>
        </HeaderBlock>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
