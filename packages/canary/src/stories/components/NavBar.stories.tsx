/// <reference types="vite-plugin-svgr/client" />
import { Meta, Story } from '@storybook/react'
import NavItemPlaceholder from '@/assets/environment-icon.svg?react'
import Navbar from '@/components/layout/Navbar'
import NavUserBadge from '@/components/layout/NavUserBadge'
import NavCompanyBadge from '@/components/layout/NavCompanyBadge'
import CompanyAvatar from '@/assets/company-avatar.svg?react'
import RepositoriesIcon from '@/assets/repositories-icon.svg?react'
import PipelinesIcon from '@/assets/pipelines-icon.svg?react'
import ExecutionsIcon from '@/assets/executions-icon.svg?react'
import FeaturedFlagsIcon from '@/assets/featured-flags-icon.svg?react'
import MoreDotsIcon from '@/assets/more-dots-icon.svg?react'
import ChaosEngineeringIcon from '@/assets/chaos-engineering-icon.svg?react'
import EnvironmentIcon from '@/assets/environment-icon.svg?react'
import SecretsIcon from '@/assets/secrets-icon.svg?react'
import ConnectorsIcon from '@/assets/connectors-icon.svg?react'
import SystemAdministrationIcon from '@/assets/system-administration-icon.svg?react'

export default {
  title: 'Components/Navbar',
  component: Navbar.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a nav bar that docks to the left side of screen.`
      }
    }
  },
  tags: ['autodocs']
} as Meta

const primaryMenuItems = [
  {
    text: 'Repositories',
    icon: <RepositoriesIcon />
  },
  {
    text: 'Pipelines',
    icon: <PipelinesIcon />
  },
  {
    text: 'Executions',
    icon: <ExecutionsIcon />
  },
  {
    text: 'Featured Flags',
    icon: <FeaturedFlagsIcon />
  }
]

const pinnedMenuItems = [
  {
    text: 'Chaos Engineering',
    icon: <ChaosEngineeringIcon />
  },
  {
    text: 'Environment',
    icon: <EnvironmentIcon />
  },
  {
    text: 'Secrets',
    icon: <SecretsIcon />
  },
  {
    text: 'Connectors',
    icon: <ConnectorsIcon />
  }
]

const secondaryMenuItems = [
  {
    text: 'System Administration',
    icon: <SystemAdministrationIcon />
  }
]

const Template: Story = () => (
  <Navbar.Root>
    <Navbar.Header>
      <NavCompanyBadge avatar={<CompanyAvatar />} name="Company name" />
    </Navbar.Header>
    <Navbar.Content>
      <Navbar.Group>
        <Navbar.Item text="Link 1" icon={<NavItemPlaceholder />} />
        <Navbar.Item text="Link 2" icon={<NavItemPlaceholder />} active />
      </Navbar.Group>
      <Navbar.AccordionGroup title="Group accordion name">
        <Navbar.Item text="Link 3" icon={<NavItemPlaceholder />} />
      </Navbar.AccordionGroup>
      <Navbar.Group topBorder>
        <Navbar.Item text="Link 4" icon={<NavItemPlaceholder />} />
      </Navbar.Group>
    </Navbar.Content>
    <Navbar.Footer>
      <NavUserBadge />
    </Navbar.Footer>
  </Navbar.Root>
)

const GitnessTemplate: Story = () => (
  <Navbar.Root>
    <Navbar.Header>
      <NavCompanyBadge avatar={<CompanyAvatar />} name="Pixel Point" />
    </Navbar.Header>
    <Navbar.Content>
      <Navbar.Group>
        {primaryMenuItems.map((item, idx) => (
          <Navbar.Item key={idx} text={item.text} icon={item.icon} active={idx === 1} />
        ))}
        <Navbar.Item text="More" icon={<MoreDotsIcon />} onClick={() => {}} />
      </Navbar.Group>
      <Navbar.AccordionGroup title="Pinned">
        {pinnedMenuItems.map((item, idx) => (
          <Navbar.Item key={idx} text={item.text} icon={item.icon} />
        ))}
      </Navbar.AccordionGroup>
      <Navbar.Group topBorder>
        {secondaryMenuItems.map((item, idx) => (
          <Navbar.Item key={idx} text={item.text} icon={item.icon} />
        ))}
      </Navbar.Group>
    </Navbar.Content>
    <Navbar.Footer>
      <NavUserBadge />
    </Navbar.Footer>
  </Navbar.Root>
)

export const GitnessNavbar = GitnessTemplate.bind({})
GitnessTemplate.args = {}

export const Default = Template.bind({})
Default.args = {}
