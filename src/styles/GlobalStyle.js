import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: "Montserrat", "Roboto", Arial, Helvetica, sans-serif;
    background-color: ${({ theme }) => theme.colors.bgMain};
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
  }

  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  button,
  ._btn {
    cursor: pointer;
    outline: none;
    font-family: inherit;
  }

  ul li {
    list-style: none;
  }
`;
