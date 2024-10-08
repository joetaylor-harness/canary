import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Container from '../../components/layout/container'
import { GitnessNavbar } from '../components/NavBar.stories'
import { GitnessTopBar } from '../components/TopBar.stories'
import { GitnessBottomBar } from '../components/BottomBar.stories'
import { GitnessContent } from './Content.stories'
import { GitnessSecondaryNavbar } from '../components/SecondaryNavBar.stories'
import { GitnessPanel } from '../components/Panel.stories'

export default {
  title: 'Components/App Shell/Container',
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

const Template: StoryFn = () => (
  <Container.Root>
    <Container.Sidebar>
      <GitnessNavbar />
    </Container.Sidebar>
    <Container.Main>
      <Container.Topbar>
        <GitnessTopBar />
      </Container.Topbar>
      <Container.CenteredContent>
        <GitnessContent />
      </Container.CenteredContent>

      <Container.Bottombar>
        <GitnessBottomBar />
      </Container.Bottombar>
    </Container.Main>
  </Container.Root>
)

const SecondaryNavbarTemplate: StoryFn = () => (
  <Container.Root>
    <Container.Sidebar>
      <GitnessNavbar />
    </Container.Sidebar>
    <Container.SecondarySidebar>
      <GitnessSecondaryNavbar />
    </Container.SecondarySidebar>
    <Container.Main>
      <Container.Topbar>
        <GitnessTopBar />
      </Container.Topbar>
      <Container.CenteredContent>
        <GitnessContent />
      </Container.CenteredContent>
      <Container.Bottombar>
        <GitnessBottomBar />
      </Container.Bottombar>
    </Container.Main>
  </Container.Root>
)

const RightPanelTemplate: StoryFn = () => (
  <Container.Root>
    <Container.Sidebar>
      <GitnessNavbar />
    </Container.Sidebar>

    <Container.Main>
      <Container.Topbar>
        <GitnessTopBar />
      </Container.Topbar>
      <Container.CenteredContent>
        <GitnessContent />
      </Container.CenteredContent>
      <Container.Panel>
        <GitnessPanel />
      </Container.Panel>
      <Container.Bottombar>
        <GitnessBottomBar />
      </Container.Bottombar>
    </Container.Main>
  </Container.Root>
)

const NoSidebarTemplate: StoryFn = () => (
  <Container.Root>
    <Container.Main>
      <Container.Topbar>
        <GitnessTopBar />
      </Container.Topbar>
      <Container.CenteredContent>
        <GitnessContent />
      </Container.CenteredContent>
      <Container.Bottombar>
        <GitnessBottomBar />
      </Container.Bottombar>
    </Container.Main>
  </Container.Root>
)

const ContentOnlyTemplate: StoryFn = () => (
  <Container.Root>
    <Container.Main>
      <Container.Content>
        <p>Content only</p>
      </Container.Content>
    </Container.Main>
  </Container.Root>
)

const CenteredContentOnlyTemplate: StoryFn = () => (
  <Container.Root>
    <Container.Main>
      <Container.CenteredContent>
        <p>Centered content only</p>
      </Container.CenteredContent>
    </Container.Main>
  </Container.Root>
)

export const Default = Template.bind({})
Default.args = {}

export const WithSecondaryNavbar = SecondaryNavbarTemplate.bind({})
WithSecondaryNavbar.args = {}

export const WithRightPanel = RightPanelTemplate.bind({})
WithRightPanel.args = {}

export const NoSidebar = NoSidebarTemplate.bind({})
NoSidebarTemplate.args = {}

export const ContentOnly = ContentOnlyTemplate.bind({})
ContentOnlyTemplate.args = {}

export const CenteredContentOnly = CenteredContentOnlyTemplate.bind({})
ContentOnlyTemplate.args = {}
