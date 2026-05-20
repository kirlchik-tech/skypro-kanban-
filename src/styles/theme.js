const commonTheme = {
  breakpoints: {
    desktop: "1200px",
    tablet: "1024px",
    mobileL: "660px",
    mobileM: "495px",
    mobileS: "375px",
  },
};

export const lightTheme = {
  ...commonTheme,
  name: "light",
  colors: {
    primary: "#565EEF",
    primaryHover: "#33399B",

    textPrimary: "#000000",
    textSecondary: "#94A6BE",
    textLight: "#FFFFFF",
    logoText: "#000000",

    bgMain: "#EAEFF6",
    bgHeader: "#FFFFFF",
    bgCard: "#FFFFFF",
    bgPopup: "#FFFFFF",
    bgInput: "#FFFFFF",
    bgDescription: "#EAEEF6",

    border: "#D4DBE5",
    borderSoft: "rgba(148, 166, 190, 0.4)",
    overlay: "rgba(0, 0, 0, 0.4)",

    orange: "#FF6D00",
    orangeBg: "#FFE4C2",
    green: "#06B16E",
    greenBg: "#B4FDD1",
    purple: "#9A48F1",
    purpleBg: "#E9D4FF",
    gray: "#94A6BE",
    grayBg: "#94A6BE",

    shadow: "0px 10px 39px 0px rgba(26, 56, 101, 0.21)",
  },
};

export const darkTheme = {
  ...commonTheme,
  name: "dark",
  colors: {
    primary: "#565EEF",
    primaryHover: "#33399B",

    textPrimary: "#FFFFFF",
    textSecondary: "#94A6BE",
    textLight: "#FFFFFF",
    logoText: "#FFFFFF",

    bgMain: "#151419",
    bgHeader: "#20202C",
    bgCard: "#20202C",
    bgPopup: "#202229",
    bgInput: "#20202C",
    bgDescription: "#151419",

    border: "#4E5566",
    borderSoft: "#4E5566",
    overlay: "rgba(0, 0, 0, 0.75)",

    orange: "#FFE4C2",
    orangeBg: "#FF6D00",
    green: "#B4FDD1",
    greenBg: "#06B16E",
    purple: "#E9D4FF",
    purpleBg: "#9A48F1",
    gray: "#94A6BE",
    grayBg: "#94A6BE",

    shadow: "0px 10px 39px 0px rgba(148, 166, 190, 0.15)",
  },
};

export const theme = lightTheme;
