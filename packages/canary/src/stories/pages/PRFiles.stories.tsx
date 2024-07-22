import Container from '@/components/layout/Container'
import { GitnessNavbar } from '../components/NavBar.stories'
import { GitnessTopBar } from '../components/TopBar.stories'

export default {
  title: 'Pages/Repository',
  parameters: {
    layout: 'fullscreen'
  }
}

export function PRFiles() {
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
          <p className="text-sm">Repository – PR Files (Review)</p>
        </Container.CenteredContent>
      </Container.Main>
    </Container.Root>
  )
}
