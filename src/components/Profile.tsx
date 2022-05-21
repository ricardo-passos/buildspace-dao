import { useAddress } from '@thirdweb-dev/react'
import { Avatar, Indicator, Text, Group } from '@mantine/core'

function Profile() {
  // hooks
  const address = useAddress()

  const formattedAdress = `${address?.substring(0, 6)} ... ${address?.substring(
    38
  )}`

  return (
    <Group
      sx={(theme) => ({
        padding: '3px',
        cursor: 'pointer',
        width: 'max-content',
        borderRadius: theme.radius.xl,
        backgroundColor: theme.colors.gray,
        transition: 'background 200ms ease',
        '&:hover': {
          backgroundColor: theme.colors.gray[8],
          '.mantine-Avatar-placeholder': {
            transition: 'background ease 200ms',
            backgroundColor: theme.colors.gray[9]
          }
        },
      })}
    >
      <Indicator
        inline
        size={16}
        offset={7}
        withBorder
        color='green'
        position='bottom-end'
      >
        <Avatar radius='xl' size='lg' />
      </Indicator>

      <Text component='p' sx={{ paddingRight: '16px' }}>
        {formattedAdress}
      </Text>
    </Group>
  )
}

export { Profile }
