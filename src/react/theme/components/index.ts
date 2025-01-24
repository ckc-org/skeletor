// components
import Button from "./Button"

const components = (theme) => ({
  ...Button(theme),
  // ...TextField(theme),
  // ...Box(theme),
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        "&.Mui-selected": {
          backgroundColor: theme.palette.secondary[100],
          "&:hover": {
            backgroundColor: theme.palette.secondary[400],
          },
        },
      },
    },
  },
})

export default components
