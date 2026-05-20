import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";

const ExitOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.overlay};
`;

const ExitBlock = styled.div`
  width: 370px;
  padding: 50px 60px;

  background: ${({ theme }) => theme.colors.bgPopup};
  border: 0.7px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.colors.shadow};

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileS}) {
    width: calc(100vw - 32px);
    padding: 50px 20px;
  }
`;

const ExitTitle = styled.h2`
  margin-bottom: 20px;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.4px;
  text-align: center;
`;

const Buttons = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileS}) {
    flex-direction: column;
  }
`;

const BaseButton = styled.button`
  width: 153px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;

  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;

  cursor: pointer;
  transition: 0.2s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileS}) {
    width: 100%;
    height: 40px;
  }
`;

const ConfirmButton = styled(BaseButton)`
  border: 0.7px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryHover};
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const CancelButton = styled(BaseButton)`
  border: 0.7px solid ${({ theme }) => theme.colors.textPrimary};
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const PopUser = () => {
  const navigate = useNavigate();

  const { isExitOpen, closeExit } = useModal();
  const { logout } = useAuth();

  const handleExit = () => {
    logout();
    closeExit();
    navigate("/login", { replace: true });
  };

  if (!isExitOpen) return null;

  return (
    <ExitOverlay onMouseDown={closeExit}>
      <ExitBlock onMouseDown={(event) => event.stopPropagation()}>
        <ExitTitle>Выйти из аккаунта?</ExitTitle>

        <Buttons>
          <ConfirmButton type="button" onClick={handleExit}>
            Да, выйти
          </ConfirmButton>

          <CancelButton type="button" onClick={closeExit}>
            Нет, остаться
          </CancelButton>
        </Buttons>
      </ExitBlock>
    </ExitOverlay>
  );
};

export default PopUser;
