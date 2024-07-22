import Container from '@/components/layout/Container'
import { GitnessNavbar } from '../components/NavBar.stories'
import { GitnessTopBar } from '../components/TopBar.stories'

export default {
  title: 'Pages/Execution',
  parameters: {
    layout: 'fullscreen'
  }
}

export function Logs() {
  return (
    <Container.Root>
      <Container.Sidebar>
        <GitnessNavbar />
      </Container.Sidebar>
      <Container.Main>
        <Container.Topbar>
          <GitnessTopBar />
        </Container.Topbar>
        <Container.CenteredContent>
          <p className="text-sm">Logs</p>
        </Container.CenteredContent>
      </Container.Main>
    </Container.Root>
  )
}
