// types
import type { AppProps } from 'next/app'

function _App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default _App
