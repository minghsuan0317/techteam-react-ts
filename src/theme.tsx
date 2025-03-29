import { extendTheme } from "@chakra-ui/react";

const fonts = {
  heading: `'Segoe UI', sans-serif`,
  body: `'Segoe UI', sans-serif`,
  mono: `'Menlo', monospace`
};

const colors = {
  brand: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#81E6D9",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#319795", // main color
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044"
  },
  black: "#16161D" // default text color
};

const radii = {
  sm: "4px",
  md: "8px",
  lg: "12px"
};

const breakpoints = {
  sm: "40em", // 640px
  md: "52em", // 832px
  lg: "64em", // 1024px
  xl: "80em" // 1280px
};

const theme = extendTheme({
  fonts,
  colors,
  radii,
  breakpoints
});

export default theme;
