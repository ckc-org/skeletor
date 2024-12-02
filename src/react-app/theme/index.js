import { createTheme } from "@mui/material"
import components from "./components"
import palette from "./palette"
import typography from "./typography"

let theme = createTheme({
  palette,
  spacing: 16,
})

theme = createTheme(theme, {
  components: components(theme),
  typography: typography(theme),
  fonts: {
    primary: '"Arial", Helvetica, sans-serif',
    baseSize: "14px",
  },
})

export default theme
