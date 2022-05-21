import { useState, useEffect } from 'react'
import { Group, Title, Button } from '@mantine/core'
import { AddressZero } from '@ethersproject/constants'
import { useVote, useAddress, useToken } from '@thirdweb-dev/react'

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
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [proposals, setProposals] = useState<IProposal[]>([])

  // hooks
  const address = useAddress()
  const token = useToken(config.contracts.RandomDAOERC20.address)
  const vote = useVote(config.contracts.RandomDAOGovernance.address)

  async function sendVotes() {
    setIsVoting(true)

    const votes = proposals.map((proposal) => {
      const voteResult = {
        proposalId: proposal.proposalId,
        //abstain by default
        vote: 2,
      }
      proposal.votes.forEach((vote) => {
        const elem = document.getElementById(
          proposal.proposalId + '-' + vote.type
        ) as HTMLInputElement

        if (elem.checked) {
          voteResult.vote = vote.type
          return
        }
      })

      return voteResult
    })

    try {
      //we'll check if the wallet still needs to delegate their tokens before they can vote
      const delegation = await token?.getDelegationOf(address!)
      // if the delegation is the 0x0 address that means they have not delegated their governance tokens yet
      if (delegation === AddressZero) {
        //if they haven't delegated their tokens yet, we'll have them delegate them before voting
        await token?.delegateTo(address!)
      }
      // then we need to vote on the proposals
      try {
        await Promise.all(
          votes.map(async ({ proposalId, vote: _vote }) => {
            // before voting we first need to check whether the proposal is open for voting
            // we first need to get the latest state of the proposal
            const proposal = await vote?.get(proposalId)
            // then we check if the proposal is open for voting (state === 1 means it is open)
            if (proposal?.state === 1) {
              // if it is open for voting, we'll vote on it
              return vote?.vote(proposalId.toString(), _vote)
            }
            // if the proposal is not open for voting we just return nothing, letting us continue
            return
          })
        )
        try {
          // if any of the propsals are ready to be executed we'll need to execute them
          // a proposal is ready to be executed if it is in state 4
          await Promise.all(
            votes.map(async ({ proposalId }) => {
              // we'll first get the latest state of the proposal again, since we may have just voted before
              const proposal = await vote?.get(proposalId)

              //if the state is in state 4 (meaning that it is ready to be executed), we'll execute the proposal
              if (proposal?.state === 4) {
                return vote?.execute(proposalId.toString())
              }
            })
          )
          // if we get here that means we successfully voted, so let's set the "hasVoted" state to true
          setHasVoted(true)
        } catch (err) {
          console.error('failed to execute votes', err)
        }
      } catch (err) {
        console.error('failed to vote', err)
      }
    } catch (err) {
      console.log({ err })
    } finally {
      setIsVoting(false)
    }
  }

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
    <Group position='center' sx={{ maxWidth: '768px' }}>
      <Title order={3}>Active Proposals</Title>

      <Group direction='column' position='center'>
        {proposals.map((proposal) => (
          <Proposal {...proposal} key={proposal.proposalId.toString()} />
        ))}

        <Button
          loading={isVoting}
          onClick={sendVotes}
          disabled={isVoting || hasVoted}
          sx={{ '&:disabled': {
            color: 'white'
          } }}
        >
          {isVoting
            ? 'Voting...'
            : hasVoted
            ? 'You Already Voted'
            : 'Submit Votes'}
        </Button>
      </Group>
    </Group>
  )
}

export { Proposals }
