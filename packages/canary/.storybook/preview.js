import '../src/styles.css'

import { withThemeByClassName } from '@storybook/addon-themes'

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Design System', 'Components', 'Pages'],
        locales: ''
      }
    }
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark'
      },
      defaultTheme: 'dark' // Force Storybook to use dark mode by default for the app
    })
  ]
}

export default preview
