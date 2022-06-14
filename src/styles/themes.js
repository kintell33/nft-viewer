import { extendTheme, colors } from "@vechaiui/react";

const cool = {
  id: "cool",
  type: "dark",
  colors: {
    bg: {
      base: colors.coolGray["900"],
      fill: colors.coolGray["900"],
    },
    text: {
      foreground: colors.coolGray["100"],
      muted: colors.coolGray["300"],
    },
    primary: colors.cyan,
    neutral: colors.coolGray,
  },
};

const midnight = {
  id: "midnight",
  type: "dark",
  colors: {
    bg: {
      base: colors.trueGray["900"],
      fill: colors.trueGray["900"],
    },
    text: {
      foreground: colors.trueGray["100"],
      muted: colors.trueGray["300"],
    },
    primary: colors.rose,
    neutral: colors.trueGray,
  },
};

export const theme = extendTheme({
    cursor: "pointer",
    colorSchemes: {
      cool,
      midnight,
    },
  });