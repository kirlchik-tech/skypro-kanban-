import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.bgHeader};
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05);
`;

export const HeaderBlock = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
`;

export const Logo = styled.div`
  img {
    width: 85px;
  }
`;

export const Nav = styled.nav`
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const NewTaskButton = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  transition: background-color 0.3s;
  cursor: pointer;
  color: #ffffff; /* ← добавляем эту строку */

  a {
    color: ${({ theme }) => theme.colors.textLight};
    display: block;
    width: 100%;
    height: 100%;
    line-height: 30px;
    text-decoration: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileM}) {
    position: fixed;
    left: 16px;
    bottom: 30px;
    top: auto;
    width: calc(100vw - 32px);
    height: 40px;
    margin-right: 0;
    z-index: 3;

    a {
      line-height: 40px;
    }
  }
`;

export const UserButton = styled.button`
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: none;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid ${({ theme }) => theme.colors.primary};
    border-bottom: 1.9px solid ${({ theme }) => theme.colors.primary};
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
    &::after {
      border-left-color: ${({ theme }) => theme.colors.primaryHover};
      border-bottom-color: ${({ theme }) => theme.colors.primaryHover};
    }
  }
`;

export const PopupUserMenu = styled.div`
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  border-radius: 10px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: #fff;
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: center;
  z-index: 2;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};

  button {
    width: 72px;
    height: 30px;
    background: transparent;
    color: #565eef;
    border-radius: 4px;
    border: 1px solid #565eef;
    cursor: pointer;

    a {
      color: #565eef;
      text-decoration: none;
    }

    &:hover {
      background-color: #33399b;
      a {
        color: #ffffff;
      }
    }
  }
`;
