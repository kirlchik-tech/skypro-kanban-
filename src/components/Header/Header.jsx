import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../common/Layout.styled";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
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
  const { user } = useAuth();

  const userName = user?.name?.trim() || user?.login?.trim() || "Пользователь";
  const userEmail =
    user?.login?.trim() || user?.email?.trim() || "Почта не указана";

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNewCard = () => {
    setIsOpen(false);
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
            <NewTaskButton type="button" onClick={handleNewCard}>
              Создать новую задачу
            </NewTaskButton>

            <UserButton type="button" onClick={togglePopup}>
              {userName}
            </UserButton>

            <PopupUserMenu $isOpen={isOpen}>
              <p className="pop-user-set__name">{userName}</p>

              <p className="pop-user-set__mail">{userEmail}</p>

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
