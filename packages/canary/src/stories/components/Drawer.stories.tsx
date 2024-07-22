/// <reference types="vite-plugin-svgr/client" />
import { Meta, Story } from '@storybook/react'
import Drawer from '@/components/layout/Drawer'

export default {
  title: 'Components/Drawer',
  component: Drawer.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a top bar component inside a container, docked to top of screen`
      }
    }
  },
  tags: ['autodocs']
} as Meta

const Template: Story = () => (
  <Drawer.Root>
    <p>Drawer</p>
  </Drawer.Root>
)

const GitnessTemplate: Story = () => (
  <Drawer.Root>
    <p>Drawer</p>
  </Drawer.Root>
)

export const Default = Template.bind({})
Default.args = {}

export const GitnessDrawer = GitnessTemplate.bind({})
GitnessTemplate.args = {}
