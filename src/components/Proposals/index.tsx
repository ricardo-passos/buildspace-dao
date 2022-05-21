import { Group, Title } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useVote, useAddress } from '@thirdweb-dev/react'

// components
import { Proposal } from './Proposal'

// web3
import { config } from '../../web3/config'

// types
import type { Proposal as IProposal } from '@thirdweb-dev/sdk'

type Props = {
  hasClaimedNFT: boolean
}

function Proposals({ hasClaimedNFT }: Props) {
  // states
  const [proposals, setProposals] = useState<IProposal[]>([])
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

  // hooks
  const address = useAddress()
  const vote = useVote(config.contracts.RandomDAOGovernance.address)

  // fetches all open proposals
  useEffect(() => {
    if (!hasClaimedNFT) return
    ;(async () => {
      try {
        const proposals = await vote?.getAll()
        setProposals(proposals as IProposal[])
      } catch (err) {
        console.log({ err })
      }
    })()
  }, [hasClaimedNFT, vote])

  // check if user hasn't voted yet
  useEffect(() => {
    if (!hasClaimedNFT || !proposals.length) return
    ;(async () => {
      try {
        const hasVoted = await vote?.hasVoted(
          proposals[0].proposalId.toString(),
          address
        )
        setHasVoted(hasVoted as boolean)

        if (hasVoted) {
          console.log('🥵 User has already voted')
        } else {
          console.log('🙂 User has not voted yet')
        }
      } catch (err) {
        console.log({ err })
      }
    })()
  }, [hasClaimedNFT, proposals, address, vote])

  return (
    <Group>
      <Title order={3}>Active Proposals</Title>

      {proposals.map((proposal) => (
        <Proposal key={proposal.proposalId.toString()} {...proposal} />
      ))}
    </Group>
  )
}

export { Proposals }
