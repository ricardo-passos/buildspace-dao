import { Proposal } from '@thirdweb-dev/sdk'
import { Group, Text, RadioGroup, Radio } from '@mantine/core'

type Props = Proposal

function Proposal({ description, votes, proposalId }: Props) {
  return (
    <Group
      sx={(theme) => ({
        padding: '10px',
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.gray[8],
        border: `1px solid ${theme.colors.gray[7]}`,
      })}
    >
      <Text sx={{ textAlign: 'center', fontWeight: 600 }}>{description}</Text>

      <RadioGroup
        required
        label='your position'
        styles={(theme) => ({
          radio: { backgroundColor: theme.colors.gray[9] },
        })}
      >
        {votes.map(({ label, type }) => (
          <Radio
            label={label}
            value={type.toString()}
            key={proposalId.toString()}
            defaultChecked={type === 2}
            name={proposalId.toString()}
            id={`${proposalId.toString()}-${type.toString()}`}
          />
        ))}
      </RadioGroup>
    </Group>
  )
}

export { Proposal }
