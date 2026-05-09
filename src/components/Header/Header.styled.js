import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  margin: 0 auto;

  background-color: ${({ theme }) => theme.colors.bgHeader};
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05);
`;

export const HeaderBlock = styled.div`
  position: relative;
  top: 0;
  left: 0;

  height: 70px;
  padding: 0 10px;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
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
    top: auto;
    z-index: 3;

    width: calc(100vw - 32px);
    height: 40px;
    margin-right: 0;
  }
`;

export const UserButton = styled.button`
  height: 20px;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  border: none;
  background: none;

  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  line-height: 20px;

  cursor: pointer;

  &::after {
    content: "";
    width: 6px;
    height: 6px;
    margin: -6px 0 0 5px;
    padding: 0;

    display: block;

    border-left: 1.9px solid ${({ theme }) => theme.colors.primary};
    border-bottom: 1.9px solid ${({ theme }) => theme.colors.primary};
    border-radius: 1px;

    transform: rotate(-45deg);
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
  z-index: 2;

  width: 213px;
  padding: 34px;

  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};

  text-align: center;

  background: #ffffff;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 10px;
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);

  button {
    width: 72px;
    height: 30px;

    border: 1px solid #565eef;
    border-radius: 4px;
    background: transparent;

    color: #565eef;

    cursor: pointer;

    &:hover {
      background-color: #33399b;
      color: #ffffff;
    }
  }
`;
