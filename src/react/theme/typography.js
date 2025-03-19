const typography = (theme) => ({
  ...theme.typography,

  h1: {
    fontFamily: "Arial",
    fontWeight: 500,
    fontSize: "4rem",
    lineHeight: 1.2,
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
    },
  },
  h2: {
    fontFamily: "Arial",
    fontWeight: 500,
    fontSize: "3rem",
    lineHeight: 1.2,
    [theme.breakpoints.down("md")]: {
      fontSize: "1.75rem",
    },
  },
  h3: {
    fontFamily: "Arial",
    fontWeight: 500,
    fontSize: "2rem",
    lineHeight: 1.5,

    [theme.breakpoints.down("md")]: {
      lineHeight: 1.25,
      fontSize: "1.25rem",
    },
  },
  h4: {
    fontFamily: "Arial",
    fontWeight: 500,
    fontSize: "1.5rem",
    lineHeight: 1.5,
    [theme.breakpoints.down("md")]: {
      fontSize: "1.125rem",
    },
  },
  subtitle1: {
    fontFamily: "Arial",
    fontSize: "1.125rem",
    fontWeight: 600,
    lineHeight: 1.5,
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
  subtitle2: {
    fontFamily: "Arial",
    fontSize: "1.125rem",
    fontWeight: 500,
    lineHeight: 1.5,
  },
  subtitle3: {
    fontFamily: "Arial",
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: 1.5,
    [theme.breakpoints.down("md")]: {
      fontSize: "0.75rem",
    },
  },
  subtitle4: {
    fontFamily: "Arial",
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.5,
    [theme.breakpoints.down("md")]: {
      fontSize: "0.75rem",
    },
  },
  subtitle5: {
    fontFamily: "Arial",
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: 1.5,
    [theme.breakpoints.down("md")]: {
      fontSize: "0.75rem",
    },
  },
  subtitle6: {
    fontFamily: "Arial",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.5,
  },

  body1: {
    fontFamily: "Arial",
    fontSize: "1rem",
    lineHeight: 1.5,
    [theme.breakpoints.down("md")]: {
      fontSize: "0.875rem",
    },
  },
  body2: {
    fontFamily: "Arial",
    fontSize: "0.875rem",
    lineHeight: 1.5,
    [theme.breakpoints.down("md")]: {
      fontSize: "0.75rem",
    },
  },
  body3: {
    fontFamily: "Arial",
    fontSize: "0.75rem",
    lineHeight: 1.5,
    display: "block",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.65rem",
    },
  },
  body4: {
    fontFamily: "Arial",
    fontSize: "0.63rem",
    lineHeight: 1.4,
    display: "block",
  },
  // fontFamily: [
  //   'Arial',
  //   'Roboto',
  //   'sans-serif'
  // ].join(','),
})

export default typography
