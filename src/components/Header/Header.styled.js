import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  width: 100%;
  margin: 0 auto;

  background-color: ${({ theme }) => theme.colors.bgHeader};
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05);

  transition: background-color 0.2s ease;
`;

export const HeaderBlock = styled.div`
  position: relative;

  height: 70px;
  padding: 0 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoLink = styled(Link)`
  height: 18px;

  display: inline-flex;
  align-items: flex-start;
  gap: 6px;
`;

export const LogoIcon = styled.div`
  position: relative;

  width: 25px;
  height: 18px;

  flex-shrink: 0;

  svg {
    position: absolute;
    top: 0;

    width: 15.6px;
    height: 17.25px;
    display: block;
  }

  svg:first-child {
    left: 0;
  }

  .logo-icon-second {
    left: 9.5px;
  }
`;

export const LogoLetters = styled.div`
  height: 18px;

  display: inline-flex;
  align-items: flex-start;

  color: ${({ theme }) => theme.colors.logoText};

  svg {
    display: block;
    flex-shrink: 0;
  }

  .letter-s {
    width: 11.29px;
    height: 11.26px;
    margin-top: 2.95px;
  }

  .letter-k {
    width: 12.78px;
    height: 14.04px;
    margin-top: 0;
    margin-left: 2.35px;
  }

  .letter-y {
    width: 12.9px;
    height: 13.73px;
    margin-top: 3.14px;
    margin-left: 1.73px;
  }

  .letter-p {
    width: 13.6px;
    height: 14.23px;
    margin-top: 2.95px;
    margin-left: 1.59px;
  }

  .letter-r {
    width: 11.92px;
    height: 11.07px;
    margin-top: 2.97px;
    margin-left: 1.75px;
  }

  .letter-o {
    width: 12.65px;
    height: 11.26px;
    margin-top: 2.97px;
    margin-left: 1.55px;
  }
`;

export const Nav = styled.nav`
  max-width: 290px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const NewTaskButton = styled.button`
  width: 178px;
  height: 30px;

  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};

  color: ${({ theme }) => theme.colors.textLight};
  font-size: 14px;
  font-weight: 500;
  line-height: 1;

  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileM}) {
    position: fixed;
    left: 16px;
    bottom: 30px;
    z-index: 3;

    width: calc(100vw - 32px);
    height: 40px;
  }
`;

export const UserButton = styled.button`
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: none;

  color: ${({ theme }) => theme.colors.logoText};
  font-size: 14px;
  line-height: 20px;

  cursor: pointer;

  &::after {
    content: "";
    width: 6px;
    height: 6px;
    margin: -6px 0 0 5px;

    display: block;

    border-left: 1.9px solid ${({ theme }) => theme.colors.logoText};
    border-bottom: 1.9px solid ${({ theme }) => theme.colors.logoText};
    border-radius: 1px;

    transform: rotate(-45deg);
  }
`;

export const PopupUserMenu = styled.div`
  position: absolute;
  top: 61px;
  right: 0;
  z-index: 10;

  width: 213px;
  padding: 34px;

  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};

  text-align: center;

  background: ${({ theme }) => theme.colors.bgPopup};
  border: 0.7px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.colors.shadow};

  .pop-user-set__name {
    width: 145px;
    min-height: 21px;
    margin: 0 auto 4px;

    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.01em;
    text-align: center;
  }

  .pop-user-set__mail {
    margin: 0 auto 10px;

    color: ${({ theme }) => theme.colors.textSecondary};
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.01em;
    text-align: center;
  }

  button {
    width: 72px;
    height: 30px;

    border: 0.7px solid ${({ theme }) => theme.colors.textPrimary};
    border-radius: 4px;
    background: transparent;

    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: 500;

    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.textLight};
    }
  }
`;

export const ThemeRow = styled.div`
  margin-bottom: 30px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    width: 90px;
    min-height: 21px;
    margin: 0;

    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.01em;
    text-align: left;
  }
`;

export const ThemeSwitch = styled.label`
  position: relative;

  width: 24.43px;
  height: 13.5px;

  display: inline-block;
  flex-shrink: 0;
`;

export const ThemeCheckbox = styled.input`
  width: 0;
  height: 0;

  opacity: 0;

  &:checked + span {
    background: #ffffff;
  }

  &:checked + span::before {
    transform: translateX(10.9px);
    background: #565eef;
  }
`;

export const ThemeSlider = styled.span`
  position: absolute;
  inset: 0;

  border-radius: 100px;
  background: #eaeef6;

  cursor: pointer;
  transition: background-color 0.2s ease;

  &::before {
    content: "";
    position: absolute;
    top: 1.28px;
    left: 1.28px;

    width: 10.93px;
    height: 10.93px;

    border-radius: 50%;
    background: #94a6be;

    transition:
      transform 0.2s ease,
      background-color 0.2s ease;
  }
`;
