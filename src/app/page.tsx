import Cursor from '@/components/effects/Cursor'
import Preloader from '@/components/effects/Preloader'
import Footer from '@/components/layout/Footer'
import Sidebar from '@/components/layout/Sidebar'
import SmoothScroll from '@/components/providers/SmoothScroll'
import About from '@/components/sections/About'
import Achievements from '@/components/sections/Achievements'
import Contact from '@/components/sections/Contact'
import Internship from '@/components/sections/Internship'
import Landing from '@/components/sections/Landing'
import ProjectsBento from '@/components/sections/ProjectsBento'
import SkillsRadar from '@/components/sections/SkillsRadar'

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Cursor />
      <Sidebar />
      <SmoothScroll>
        <main className="editorial-main">
          <Landing />
          <About />
          <Internship />
          <SkillsRadar />
          <ProjectsBento />
          <Achievements />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  )
}
