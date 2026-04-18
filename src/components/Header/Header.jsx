import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../common/Layout.styled";
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

  const togglePopup = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer>
      <Container>
        <HeaderBlock>
          <Logo>
            <a href="/" target="_self">
              <img src="/images/logo.png" alt="logo" />
            </a>
          </Logo>
          <Nav>
            <NewTaskButton>
              <Link to="/new-card">Создать новую задачу</Link>
            </NewTaskButton>
            <UserButton href="#" onClick={togglePopup}>
              Иван Иванов
            </UserButton>
            <PopupUserMenu $isOpen={isOpen}>
              {" "}
              {/* ← $isOpen */}
              <p className="pop-user-set__name">Иван Иванов</p>
              <p className="pop-user-set__mail">ivan.ivanov@gmail.com</p>
              <div className="pop-user-set__theme">
                <p>Темная тема</p>
                <input type="checkbox" className="checkbox" name="checkbox" />
              </div>
              <button type="button" className="_hover03">
                <Link to="/exit">Выйти</Link>
              </button>
            </PopupUserMenu>
          </Nav>
        </HeaderBlock>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
