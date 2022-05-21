// contexts
import { Thirdweb } from './contexts/providers/Thirdweb'

// components
import { ConnectWallet } from './components/ConnectWallet'

function Home() {
  return (
    <Thirdweb>
      <ConnectWallet />
    </Thirdweb>
  )
}

export default Home
