import Achievements from '@/components/Achievements'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Cursor from '@/components/Cursor'
import Landing from '@/components/Landing'
import Internship from '@/components/Internship'
import ProjectsBento from '@/components/ProjectsBento'
import Sidebar from '@/components/Sidebar'
import SkillsRadar from '@/components/SkillsRadar'
import SmoothScroll from '@/components/SmoothScroll'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'

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
