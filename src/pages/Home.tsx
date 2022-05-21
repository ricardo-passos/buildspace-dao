import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

// contexts
import { Thirdweb } from '../contexts/providers/Thirdweb'

// components
import { ConnectWallet } from '../components/ConnectWallet'

function Home() {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <ConnectWallet />
    </ThirdwebProvider>
  )
}

export { Home }
