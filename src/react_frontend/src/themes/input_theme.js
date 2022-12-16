import palette from "./base_options"
import { createTheme } from '@mui/material/styles';

const input_theme = createTheme({
  palette: {
    ...palette,
    text: {
      primary: '#000000',
      secondary: '#4d4d4d',
    }
  }
});
export default input_theme;
