import type { ThemeDefinition } from "vuetify"

// String that represents the name of the theme I am using
export const LIGHT_THEME = "light"
// Light mode theme
export const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: ckcColors.gray[200],
    surface: "#FFFFFF",
    primary: ckcColors.purple[600],
    secondary: ckcColors.sky[600],
    error: ckcColors.red[500],
    info: ckcColors.blue[500],
    success: ckcColors.emerald[500],
    warning: ckcColors.amber[500],
  },
}

// String that represents the name of the dark theme I am using
export const DARK_THEME = "dark"
// Dark mode theme
export const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: ckcColors.gray[800],
    surface: ckcColors.slate[900],
    primary: ckcColors.purple[600],
    secondary: ckcColors.sky[600],
    error: ckcColors.red[500],
    info: ckcColors.blue[500],
    success: ckcColors.emerald[500],
    warning: ckcColors.amber[500],
  },
}
