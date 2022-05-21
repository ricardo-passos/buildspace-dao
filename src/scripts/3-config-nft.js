import sdk from './1-init-sdk.js'
import { resolve } from 'node:path'
import { readFile } from 'node:fs/promises'

const editionDrop = sdk.getEditionDrop(
  '0x98316f5f186672578df55E9a3e1c6DDe0DC79A17'
)

;(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: 'Electrons...',
        description: 'This NFT will give you access to RandomDAO!',
        image: await readFile(resolve('src/scripts/assets/atoms.gif')),
      },
    ])
    console.log('✅ Successfully created a new NFT in the drop!')
  } catch (error) {
    console.error('failed to create the new NFT', error)
  }
})()
