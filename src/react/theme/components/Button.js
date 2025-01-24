const Button = (_theme) => ({
  MuiButton: {
    defaultProps: { size: "lg" },
    styleOverrides: {
      // root: {
      //   fontFamily: [
      //     "Montserrat",
      //     "Roboto",
      //     '"Helvetica Neue"',
      //     "Arial",
      //     "sans-serif",
      //   ].join(","),
      //   textTransform: "none",
      //   whiteSpace: "nowrap",
      //   fontWeight: 600,
      //   letterSpacing: 0,
      // },
      // contained: {
      //   color: "#FFF",
      //   boxShadow: "none",
      // },
      // outlined: { borderColor: "inherit" },
    },
    variants: [
      // {
      //   props: { size: "lg" },
      //   style: {
      //     height: "4rem",
      //     padding: "0 2.5rem",
      //     fontSize: "1rem",
      //     borderRadius: "1rem",
      //     [theme.breakpoints.down("md")]: {
      //       height: "3rem",
      //       padding: "0 1.5rem",
      //       borderRadius: "0.5rem",
      //     },
      //   },
      // },
      // {
      //   props: { size: "medium" },
      //   style: {
      //     height: "3rem",
      //     padding: "0 3rem",
      //     fontSize: "0.875rem",
      //     borderRadius: "0.5rem",
      //   },
      // },
      // {
      //   props: { size: "small" },
      //   style: {
      //     height: "2rem",
      //     padding: "0 1rem",
      //     fontSize: "0.875rem",
      //     borderRadius: "0.5rem",
      //   },
      // },
    ],
  },
})

export default Button
