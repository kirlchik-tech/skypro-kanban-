import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Montserrat', 'Roboto', Arial, Helvetica, sans-serif;
    color: #000000;
  }

  a, a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  button, ._btn {
    cursor: pointer;
    outline: none;
  }

  ul li {
    list-style: none;
  }
`;
