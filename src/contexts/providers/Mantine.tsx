import { MantineProvider, MantineThemeOverride } from '@mantine/core'

// types
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const theme: MantineThemeOverride = {
  colorScheme: 'dark',
}

function Mantine({ children }: Props) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      {children}
    </MantineProvider>
  )
}

export { Mantine }
