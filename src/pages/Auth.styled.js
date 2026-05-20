import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #151419;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;
`;

export const ContainerSignin = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerSignup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBlock = styled.div`
  width: 100%;
`;

export const ModalTtl = styled.h2`
  color: #ffffff;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  letter-spacing: -0.03em;
  text-align: center;
  margin: 0 0 20px 0;
`;

export const ModalFormLogin = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ModalInput = styled.input`
  width: 100%;
  border-radius: 8px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: transparent;
  padding: 8px 10px;
  color: #ffffff;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.02em;
  margin-bottom: 7px;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(148, 166, 190, 0.4);
  }

  &:last-of-type {
    margin-bottom: 20px;
  }
`;

export const ModalBtnEnter = styled.button`
  width: 100%;
  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.01em;
  padding: 8px 10px;
  border: none;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: #33399b;
  }
`;

export const ModalFormGroup = styled.div`
  margin-top: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.01em;
  color: rgba(148, 166, 190, 0.4);
  text-align: center;
`;

export const Modal = styled.div`
  width: 368px;
  background-color: #20202c;
  border-radius: 10px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  padding: 50px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

export const Title = styled.h2`
  color: #ffffff;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  letter-spacing: -0.03em;
  text-align: center;
  margin: 0 0 20px 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 8px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: transparent;
  padding: 8px 10px;
  color: #ffffff;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.02em;
  margin-bottom: 7px;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(148, 166, 190, 0.4);
  }

  &:last-of-type {
    margin-bottom: 20px;
  }
`;

export const Button = styled.button`
  width: 100%;
  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.01em;
  padding: 8px 10px;
  border: none;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: #33399b;
  }
`;

export const FooterText = styled.div`
  margin-top: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.01em;
  color: rgba(148, 166, 190, 0.4);
  text-align: center;
`;

export const StyledLink = styled(Link)`
  color: rgba(148, 166, 190, 0.4);
  text-decoration: underline;

  &:hover {
    color: #ffffff;
  }
`;
