import {ThemeDefinition} from "vuetify";
import {ckcColors} from "~/utils/ckc-colors";

// String that represents the name of the theme I am using
export const LIGHT_THEME = "light";
// Light mode theme
export const light: ThemeDefinition = {
    dark: false,
    colors: {
        background: "#FFFFFF",
        surface: "#FFFFFF",
        primary: ckcColors.indigo[600],
        secondary: ckcColors.purple[600],
        error: ckcColors.red[500],
        info: ckcColors.blue[500],
        success: ckcColors.emerald[500],
        warning: ckcColors.amber[500],
    },
};

// String that represents the name of the dark theme I am using
export const DARK_THEME = "dark";
// Dark mode theme
export const dark: ThemeDefinition = {
    dark: true,
    colors: {
        background: ckcColors.slate[950],
        surface: ckcColors.slate[900],
        primary: ckcColors.indigo[500],
        secondary: ckcColors.purple[500],
        error: ckcColors.red[500],
        info: ckcColors.blue[500],
        success: ckcColors.emerald[500],
        warning: ckcColors.amber[500],
    },
};
