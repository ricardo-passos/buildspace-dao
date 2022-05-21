import sdk from './1-init-sdk.js'

// This is the address of our ERC-20 contract printed out in the step before.
const token = sdk.getToken('0x41eb083e54DE1739dcE9AB31D76520eA5F851E98')

;(async () => {
  try {
    // What's the max supply you want to set? 1,000,000 is a nice number!
    const amount = 1_000_000
    // Interact with your deployed ERC-20 contract and mint the tokens!
    await token.mintTo('0x8E6f42979b5517206Cf9e69A969Fac961D1b36B7', amount)
    const totalSupply = await token.totalSupply()

    // Print out how many of our token's are out there now!
    console.log(
      '✅ There now is',
      totalSupply.displayValue,
      '$RDAO in circulation'
    )
  } catch (error) {
    console.error('Failed to print money', error)
  }
})()
