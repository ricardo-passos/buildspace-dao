import { Alert as _Alert } from '@mantine/core'
import { useNetwork, useAddress, ChainId } from '@thirdweb-dev/react'

function Alert() {
  // hooks
  const network = useNetwork()
  const address = useAddress()

  if (address && network[0].data.chain?.id !== ChainId.Goerli) {
    return (
      <_Alert title='Unsupported network' color='orange'>
        Please, connect to the Goerli network.
      </_Alert>
    )
  }

  return null
}

export { Alert }
