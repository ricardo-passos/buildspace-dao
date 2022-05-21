import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

// types
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Thirdweb({ children }: Props) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      {children}
    </ThirdwebProvider>
  )
}

export { Thirdweb }
