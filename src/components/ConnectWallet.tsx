import { Button } from '@mantine/core'
import { useMetamask } from '@thirdweb-dev/react'

function ConnectWallet() {
  // hooks
  const connectWithMetamask = useMetamask()

  return <Button onClick={connectWithMetamask}>Connect your wallet</Button>
}

export { ConnectWallet }
