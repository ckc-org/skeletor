// import { Roboto } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import palette from './base_options.js'
// export const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   fallback: ['Helvetica', 'Arial', 'sans-serif'],
// });

const card_theme = createTheme({
  palette: palette
});

export default card_theme;
