import React, { useState } from "react";
import { Container } from "../common/Layout.styled";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import { useThemeMode } from "../../context/ThemeModeContext";
import {
  HeaderBlock,
  HeaderContainer,
  Logo,
  LogoIcon,
  LogoLetters,
  LogoLink,
  Nav,
  NewTaskButton,
  PopupUserMenu,
  ThemeCheckbox,
  ThemeRow,
  ThemeSlider,
  ThemeSwitch,
  UserButton,
} from "./Header.styled";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { openNewCard, openExit } = useModal();
  const { user } = useAuth();
  const { isDarkTheme, toggleTheme } = useThemeMode();

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
            <LogoLink to="/">
              <LogoIcon>
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3.18111 16.7811C1.32986 17.8505 0 16.9593 0 15.3743C0 13.687 0 8.62421 0 8.62421C0 8.62421 0 3.56141 0 1.87409C0 0.289076 1.32904 -0.60203 3.18111 0.467297C6.06441 2.13234 14.7135 7.12913 14.7135 7.12913C15.8635 7.79334 15.8635 9.45426 14.7135 10.1185C14.7135 10.1193 6.06441 15.1161 3.18111 16.7811Z"
                    fill="#00C1FF"
                  />
                </svg>

                <svg
                  className="logo-icon-second"
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3.18111 16.7811C1.32986 17.8505 0 16.9593 0 15.3743C0 13.687 0 8.62421 0 8.62421C0 8.62421 0 3.56141 0 1.87409C0 0.289076 1.32904 -0.60203 3.18111 0.467297C6.06441 2.13234 14.7135 7.12913 14.7135 7.12913C15.8635 7.79334 15.8635 9.45426 14.7135 10.1185C14.7135 10.1193 6.06441 15.1161 3.18111 16.7811Z"
                    fill="#BCEC30"
                  />
                </svg>
              </LogoIcon>

              <LogoLetters>
                <svg
                  className="letter-s"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.0925109 8.65065L0.415009 7.9163C0.634895 7.41694 1.03069 7.28476 1.52909 7.65194C2.48193 8.35691 4.05045 8.87096 6.14669 8.87096C7.93509 8.87096 8.69736 8.41566 8.69736 7.87224C8.69736 7.25539 8.06702 7.09383 7.02623 6.96165L4.65147 6.65322C1.79296 6.27136 0.356373 5.24327 0.356373 3.45145C0.356373 1.52745 1.92489 0 5.56033 0C7.58327 0 8.88792 0.308427 9.73815 0.631542C10.6763 0.998717 10.8083 1.30714 10.8083 2.07087V3.06959C10.8083 3.68644 10.5884 3.89206 9.98735 3.89206H9.31304C8.69736 3.89206 8.49213 3.67175 8.49213 3.06959V2.74647C8.09634 2.61429 7.11418 2.42336 5.97078 2.42336C3.96249 2.42336 2.995 2.79053 2.995 3.40739C2.995 3.86269 3.58136 4.12705 4.65147 4.27392L6.98225 4.58235C9.79678 4.93484 11.292 5.78669 11.292 7.84287C11.292 9.92842 9.31304 11.2649 5.78021 11.2649C3.18556 11.2649 1.10398 10.4425 0.268419 9.67875C-0.0247613 9.385 -0.0687383 9.01783 0.0925109 8.65065Z"
                    fill="currentColor"
                  />
                </svg>

                <svg
                  className="letter-k"
                  width="13"
                  height="15"
                  viewBox="0 0 13 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.167 14.0408H10.9649C10.3786 14.0408 10.188 13.9527 9.89484 13.5121L7.63735 10.1781C7.31485 9.7228 7.06565 9.60531 6.39133 9.60531H4.13384V13.2183C4.13384 13.8352 3.91396 14.0408 3.31294 14.0408H2.44806C1.83238 14.0408 1.62715 13.8205 1.62715 13.2183V2.3793H0.820906C0.205227 2.3793 0 2.15899 0 1.55682V0.822473C0 0.205618 0.219886 0 0.820906 0H3.3276C3.94328 0 4.1485 0.220305 4.1485 0.822473V7.16726H6.17145C6.84576 7.16726 7.08031 7.06445 7.41746 6.59447L9.30848 3.67175C9.61632 3.21646 9.80688 3.12833 10.3932 3.12833H11.5953C12.2549 3.12833 12.3722 3.65707 12.0057 4.20049L9.89484 7.40226C9.67495 7.71068 9.41109 8.0338 9.16189 8.29816C9.42575 8.51847 9.79222 8.88564 9.93882 9.10595L12.5774 12.998C12.9439 13.5121 12.812 14.0408 12.167 14.0408Z"
                    fill="currentColor"
                  />
                </svg>

                <svg
                  className="letter-y"
                  width="13"
                  height="14"
                  viewBox="0 0 13 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.94893 12.8952V12.1755C1.94893 11.5587 2.16882 11.3531 2.76984 11.3531H3.81063C4.44097 11.3531 4.74881 11.2209 4.98335 10.7215L5.11528 10.4425L0.131215 0.998717C-0.176624 0.425924 0.0725792 0 0.717576 0H1.84632C2.43268 0 2.69654 0.102809 2.91643 0.528733L4.99801 4.81734C5.48176 5.80137 6.02414 6.93227 6.44925 7.9163C6.88902 6.96165 7.38743 5.86012 7.85652 4.90546L9.98208 0.528733C10.1726 0.117496 10.4658 0 11.0522 0H12.1809C12.8406 0 13.0751 0.440611 12.7673 0.998717L7.09425 11.7937C6.43459 13.0421 5.68699 13.7324 3.98654 13.7324H2.74052C2.15416 13.7324 1.94893 13.5121 1.94893 12.8952Z"
                    fill="currentColor"
                  />
                </svg>

                <svg
                  className="letter-p"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6036 5.63981C13.6036 9.10595 11.0382 11.2649 7.57871 11.2649C6.08349 11.2649 4.94009 10.8978 4.13384 10.4425V13.4092C4.13384 14.0261 3.91396 14.2317 3.31294 14.2317H2.44806C1.83238 14.2317 1.62715 14.0114 1.62715 13.4092V2.57023H0.820906C0.205227 2.57023 0 2.34992 0 1.74775V1.0134C0 0.396549 0.219886 0.190931 0.820906 0.190931H2.9318C3.54748 0.190931 3.75271 0.411236 3.75271 1.0134V1.07215C4.57361 0.528732 5.81963 0 7.57871 0C11.0382 0.014687 13.6036 2.17368 13.6036 5.63981ZM10.9943 5.63981C10.9943 3.61301 9.36711 2.48211 7.34417 2.48211C5.89292 2.48211 4.70554 3.09896 4.1485 3.59832V7.696C4.7202 8.19535 5.89292 8.81221 7.34417 8.81221C9.36711 8.79752 10.9943 7.66662 10.9943 5.63981Z"
                    fill="currentColor"
                  />
                </svg>

                <svg
                  className="letter-r"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9178 4.77328C11.9178 5.39013 11.6979 5.59575 11.0969 5.59575H10.232C9.61631 5.59575 9.41109 5.41951 9.41109 4.77328C9.41109 3.15771 8.79541 2.43804 7.32951 2.43804C5.9369 2.43804 4.77884 3.30458 4.13385 4.36204V10.2515C4.13385 10.8684 3.91396 11.074 3.31294 11.074H2.44806C1.83238 11.074 1.62715 10.8537 1.62715 10.2515V2.55554H0.820906C0.205227 2.55554 0 2.33524 0 1.73307V0.998717C0 0.381862 0.219886 0.176244 0.820906 0.176244H2.9318C3.54748 0.176244 3.75271 0.396549 3.75271 0.998717V1.70369C4.52964 0.83716 5.71702 0 7.73996 0C10.7011 0 11.9178 1.76244 11.9178 4.77328Z"
                    fill="currentColor"
                  />
                </svg>

                <svg
                  className="letter-o"
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 5.62513C0 2.39398 2.72658 0 6.34735 0C9.93881 0 12.6507 2.39398 12.6507 5.62513C12.6507 8.87096 9.92415 11.2649 6.34735 11.2649C2.72658 11.2649 0 8.87096 0 5.62513ZM10.1587 5.62513C10.1587 3.74519 8.50223 2.3793 6.34735 2.3793C4.1485 2.3793 2.49203 3.75988 2.49203 5.62513C2.49203 7.51975 4.1485 8.90033 6.34735 8.90033C8.51689 8.90033 10.1587 7.51975 10.1587 5.62513Z"
                    fill="currentColor"
                  />
                </svg>
              </LogoLetters>
            </LogoLink>
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

              <ThemeRow>
                <p>Темная тема</p>

                <ThemeSwitch>
                  <ThemeCheckbox
                    type="checkbox"
                    checked={isDarkTheme}
                    onChange={toggleTheme}
                  />
                  <ThemeSlider />
                </ThemeSwitch>
              </ThemeRow>

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
