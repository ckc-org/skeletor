"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { Providers } from "./providers";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
