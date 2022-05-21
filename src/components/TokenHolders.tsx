import { Group, Table, Loader, Center } from '@mantine/core'
import { useState, useEffect, useMemo } from 'react'
import { useToken, useEditionDrop } from '@thirdweb-dev/react'

// web3
import { config } from '../web3/config'

// utils
import { shortenAddress } from '../utils'

// types
import type { TokenHolderBalance } from '@thirdweb-dev/sdk'

type Props = {
  hasClaimedNFT: boolean
}

function TokenHolders({ hasClaimedNFT }: Props) {
  // states
  const [membersTokenAmount, setMembersTokenAmount] = useState<
    TokenHolderBalance[]
  >([])
  const [memberAddresses, setMemberAddresses] = useState<string[]>([])

  // hooks
  const editionDrop = useEditionDrop(config.contracts.RandomDAOERC1155.address)
  const token = useToken(config.contracts.RandomDAOERC20.address)

  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      const member = membersTokenAmount.find(({ holder }) => holder === address)

      return {
        address,
        tokenAmount: member?.balance.displayValue || '0',
      }
    })
  }, [memberAddresses, membersTokenAmount])

  // fetches all members wallet
  useEffect(() => {
    if (!hasClaimedNFT) return
    ;(async () => {
      try {
        const memberAddresses =
          await editionDrop?.history.getAllClaimerAddresses(0)
        setMemberAddresses(memberAddresses as [])
      } catch (err) {
        console.log({ err })
      }
    })()
  }, [hasClaimedNFT, editionDrop?.history])

  // fetches the total of # each member has
  useEffect(() => {
    if (!hasClaimedNFT) return
    ;(async () => {
      try {
        const amounts = await token?.history.getAllHolderBalances()
        setMembersTokenAmount(amounts as [])
      } catch (err) {
        console.log({ err })
      }
    })()
  }, [hasClaimedNFT, token?.history])

  return (
    <Group>
      <Table>
        <thead>
          <tr>
            <th>Addresses</th>
            <th>Token Amount</th>
          </tr>
        </thead>

        {memberList.length > 0 ? (
          <tbody>
            {memberList.map((member) => (
              <tr key={member.address}>
                <td>{shortenAddress(member.address)}</td>
                <td style={{ textAlign: 'center' }}>{member.tokenAmount}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <Center sx={{ width: '100%', marginTop: '10px' }}>
            <Loader />
          </Center>
        )}
      </Table>
    </Group>
  )
}

export { TokenHolders }
