import { useState } from 'react'
import { Group, Button, Title } from '@mantine/core'
import { useAddress, useEditionDrop } from '@thirdweb-dev/react'

// web3
import { config } from '../web3/config'

// types
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  setHasClaimedNFT: Dispatch<SetStateAction<boolean>>
}

function MintMembershipNFT({ setHasClaimedNFT }: Props) {
  // states
  const [isClaiming, setIsClaiming] = useState(false)

  // hooks
  const address = useAddress()
  const editionDrop = useEditionDrop(config.contracts.RandomDAOERC1155.address)

  async function mintNFT() {
    try {
      setIsClaiming(true)
      await editionDrop?.claim(0, 1)
      setHasClaimedNFT(true)
    } catch (err) {
      console.log({ err })
    } finally {
      setIsClaiming(false)
    }
  }

  if (!address) return null

  return (
    <Group
      sx={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}
    >
      <Group position='center' direction='column'>
        <Title sx={{ fontSize: '48px' }}>
          Mint your free 🍪DAO Membership NFT
        </Title>

        <Button disabled={isClaiming} onClick={mintNFT} loading={isClaiming}>
          {isClaiming ? 'Minting...' : 'Mint your nft (FREE)'}
        </Button>
      </Group>
    </Group>
  )
}

export { MintMembershipNFT }
