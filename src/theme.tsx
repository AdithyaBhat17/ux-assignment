import { extendTheme, Theme } from "@chakra-ui/react";
import { createBreakpoints, GlobalStyles } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "72em",
  xl: "96em",
});

const colors = {
  black: "#00253A",
  deepJungleGreen: "#1A5957",
  darkCornflowerBlue: "#253D7F",
  celadonGreen: "#257F78",
  maximumBlueGreen: "#51C3BB",
};

const fonts: Theme["fonts"] = {
  mono: "Menlo, monospace",
  heading: "Inter, sans-serif",
  body: "Inter, sans-serif",
};

const globalStyles: GlobalStyles = {
  global: {
    "html/body": {
      boxSizing: "border-box",
    },
    a: {
      color: colors.celadonGreen,
    },
  },
};

const theme = extendTheme({
  colors,
  fonts,
  breakpoints,
  globalStyles,
});

export default theme;
