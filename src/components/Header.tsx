import { Group } from '@mantine/core'
import { useAddress } from '@thirdweb-dev/react'

// components
import { Profile } from './Profile'
import { ConnectWallet } from './ConnectWallet'

function Header() {
  // hooks
  const address = useAddress()

  return <Group>{address ? <Profile /> : <ConnectWallet />}</Group>
}

export { Header }
