// contexts
import { Mantine } from '../contexts/providers/Mantine'
import { Thirdweb } from '../contexts/providers/Thirdweb'

// types
import type { AppProps } from 'next/app'

function _App({ Component, pageProps }: AppProps) {
  return (
    <Thirdweb>
      <Mantine>
        <Component {...pageProps} />
      </Mantine>
    </Thirdweb>
  )
}

export default _App
