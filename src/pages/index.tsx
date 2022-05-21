import { useState, useEffect } from 'react'
import { Box, Title, Text, Group } from '@mantine/core'
import { useAddress, useEditionDrop } from '@thirdweb-dev/react'

// components
import { Header } from '../components/Header'
import { Proposals } from '../components/Proposals'
import { TokenHolders } from '../components/TokenHolders'
import { MintMembershipNFT } from '../components/MintMembershipNFT'

// web3
import { config } from '../web3/config'

function Home() {
  // states
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false)

  // hooks
  const address = useAddress()
  const editionDrop = useEditionDrop(config.contracts.RandomDAOERC1155.address)

  // check NFT balance
  useEffect(() => {
    if (!address) return
    ;(async () => {
      try {
        const balance = await editionDrop?.balanceOf(address, 0)

        if (balance?.gt(0)) {
          setHasClaimedNFT(true)
        } else {
          setHasClaimedNFT(false)
        }
      } catch (err) {
        setHasClaimedNFT(false)
        console.log({ err })
      }
    })()
  }, [address, editionDrop])

  return (
    <Box p='10px' sx={{ width: '100%', height: '100vh' }}>
      <Header />

      {hasClaimedNFT ? (
        <Group
          sx={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Group direction='column' position='center' sx={{ gap: '0px' }}>
            <Title sx={{ fontSize: '48px' }}>🍪DAO Member Page</Title>

            <Text component='p'>Congratulations on being a member</Text>

            <TokenHolders hasClaimedNFT={hasClaimedNFT} />

            <Proposals hasClaimedNFT={hasClaimedNFT} />
          </Group>
        </Group>
      ) : (
        <MintMembershipNFT setHasClaimedNFT={setHasClaimedNFT} />
      )}
    </Box>
  )
}

export default Home
