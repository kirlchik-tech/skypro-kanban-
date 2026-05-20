import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme";

const ThemeModeContext = createContext(null);

const getSavedThemeMode = () => {
  return localStorage.getItem("themeMode") === "dark";
};

export const ThemeModeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getSavedThemeMode);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      const nextValue = !prev;

      localStorage.setItem("themeMode", nextValue ? "dark" : "light");

      return nextValue;
    });
  };

  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  const value = useMemo(
    () => ({
      isDarkTheme,
      toggleTheme,
    }),
    [isDarkTheme],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error(
      "useThemeMode должен использоваться внутри ThemeModeProvider",
    );
  }

  return context;
};
