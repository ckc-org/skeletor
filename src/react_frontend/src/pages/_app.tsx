import '../styles/globals.styl'
import type {AppProps} from 'next/app'
// import {ThemeProvider} from "@mui/material";

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <Component {...pageProps} />
  )
}
