import sdk from './1-init-sdk.js'

const token = sdk.getToken('0x41eb083e54DE1739dcE9AB31D76520eA5F851E98')

;(async () => {
  try {
    // Log the current roles.
    const allRoles = await token.roles.getAll()

    console.log('👀 Roles that exist right now:', allRoles)

    // Revoke all the superpowers your wallet had over the ERC-20 contract.
    await token.roles.setAll({ admin: [], minter: [] })
    console.log('🎉 Roles after revoking ourselves', await token.roles.getAll())
    console.log(
      '✅ Successfully revoked our superpowers from the ERC-20 contract'
    )
  } catch (error) {
    console.error('Failed to revoke ourselves from the DAO trasury', error)
  }
})()
