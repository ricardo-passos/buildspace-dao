import sdk from './1-init-sdk.js'
import { ethers } from 'ethers'

// This is our governance contract.
const vote = sdk.getVote('0xAa7EDA5688EBE5b86a2AC66cfFD04c86F023C42e')

// This is our ERC-20 contract.
const token = sdk.getToken('0x41eb083e54DE1739dcE9AB31D76520eA5F851E98')

;(async () => {
  try {
    await token.delegateTo(process.env.WALLET_ADDRESS)
    // Create proposal to mint 420,000 new token to the treasury.
    const amount = 420_000
    const description =
      'Should the DAO mint an additional ' +
      amount +
      ' tokens into the treasury?'
    const executions = [
      {
        // Our token contract that actually executes the mint.
        toAddress: token.getAddress(),
        // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
        // to send in this proposal. In this case, we're sending 0 ETH.
        // We're just minting new tokens to the treasury. So, set to 0.
        nativeTokenValue: 0,
        // We're doing a mint! And, we're minting to the vote, which is
        // acting as our treasury.
        // in this case, we need to use ethers.js to convert the amount
        // to the correct format. This is because the amount it requires is in wei.
        transactionData: token.encoder.encode('mintTo', [
          vote.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
        ]),
      },
    ]

    await vote.propose(description, executions)

    console.log('✅ Successfully created proposal to mint tokens')
  } catch (error) {
    console.error('failed to create first proposal', error)
    process.exit(1)
  }

  try {
    // Create proposal to transfer ourselves 6,900 tokens for being awesome.
    const amount = 6_900
    const description =
      'Should the DAO transfer ' +
      amount +
      ' tokens from the treasury to ' +
      process.env.WALLET_ADDRESS +
      ' for being awesome?'
    const executions = [
      {
        // Again, we're sending ourselves 0 ETH. Just sending our own token.
        nativeTokenValue: 0,
        transactionData: token.encoder.encode(
          // We're doing a transfer from the treasury to our wallet.
          'transfer',
          [
            process.env.WALLET_ADDRESS,
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),
        toAddress: token.getAddress(),
      },
    ]

    await vote.propose(description, executions)

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    )
  } catch (error) {
    console.error('failed to create second proposal', error)
  }
})()
