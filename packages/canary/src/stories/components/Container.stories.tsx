/// <reference types="vite-plugin-svgr/client" />
import { Meta, Story } from '@storybook/react'
import Container from '@/components/layout/Container'
import { GitnessNavbar } from './NavBar.stories'
import { GitnessTopBar } from './TopBar.stories'
import { GitnessBottomBar } from './BottomBar.stories'
import { GitnessContent } from './Content.stories'

export default {
  title: 'Components/Container',
  component: Container.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a container that wraps other layout components`
      }
    }
  },
  tags: ['autodocs']
} as Meta

const Template: Story = () => (
  <Container.Root>
    <Container.Sidebar>
      <GitnessNavbar />
    </Container.Sidebar>
    <Container.Main>
      <Container.Topbar>
        <GitnessTopBar />
      </Container.Topbar>
      <Container.Content>
        <GitnessContent />
      </Container.Content>
      <Container.Footer>
        <GitnessBottomBar />
      </Container.Footer>
    </Container.Main>
  </Container.Root>
)

const NoSidebarTemplate: Story = () => (
  <Container.Root>
    <Container.Main>
      <Container.Topbar>
        <GitnessTopBar />
      </Container.Topbar>
      <Container.Content>
        <GitnessContent />
      </Container.Content>
      <Container.Footer>
        <GitnessBottomBar />
      </Container.Footer>
    </Container.Main>
  </Container.Root>
)

const ContentOnlyTemplate: Story = () => (
  <Container.Root>
    <Container.Main>
      <Container.Content>
        <GitnessContent />
      </Container.Content>
    </Container.Main>
  </Container.Root>
)

export const Default = Template.bind({})
Default.args = {}

export const NoSidebar = NoSidebarTemplate.bind({})
NoSidebarTemplate.args = {}

export const ContentOnly = ContentOnlyTemplate.bind({})
ContentOnlyTemplate.args = {}
