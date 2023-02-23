export default {
  customVariables: ["~/assets/variables.scss"],
  treeShake: true,
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#2E2D4D",
        secondary: "#CB48B7",
        highlight: "#CB48B7",
        anchor: "#070707",
        // Custom Colors
        black: "#000000",
        "black-light": "#070707",

        white: "#ffffff",
        "white-dark": "#f1f1f1",
        "main-bg": "#F7F3E3",

        // greys
        "grey-darker": "#4d4d4d",
        "grey-dark": "#6a6a6a",
        grey: "#9c9c9c",
        "grey-light": "#ced4db",
        "grey-lighter": "#dee2e6",
        "grey-lightest": "#e7e7e7",

        // highlights
        "active-highlight-yellow": "#fdd835",
        "active-highlight-orange": "#f3774f",

        // blues
        "blue-lighter": "#69A2B0",
        "blue-light": "#6495ED",

        // yellows
        yellow: "#fad569",

        // red
        red: "#D11222",
      },
    },
  },
};

