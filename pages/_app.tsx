import Head from 'next/head'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  <Head>
    <meta charSet="utf-8"/>
  </Head>
  return <Component {...pageProps} />
}

export default MyApp
