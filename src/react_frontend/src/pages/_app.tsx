import '../styles/globals.styl'
import type {AppProps} from 'next/app'
// @ts-ignore
import { SessionProvider } from "next-auth/react"

export default function App({Component, pageProps: { session, ...pageProps }}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
