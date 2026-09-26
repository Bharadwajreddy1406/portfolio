import Cursor from '@/components/effects/Cursor'
import Preloader from '@/components/effects/Preloader'
import Footer from '@/components/layout/Footer'
import Sidebar from '@/components/layout/Sidebar'
import SmoothScroll from '@/components/providers/SmoothScroll'
import About from '@/components/sections/About'
import BlogMarquee from '@/components/sections/BlogMarquee'
import Contact from '@/components/sections/Contact'
import Education from '@/components/sections/Education'
import Internship from '@/components/sections/Internship'
import Landing from '@/components/sections/Landing'
import ProjectsBento from '@/components/sections/ProjectsBento'
import SkillsRadar from '@/components/sections/SkillsRadar'
import { ENABLE_PRELOADER } from '@/config/features'

export default function HomePage() {
  return (
    <>
      {ENABLE_PRELOADER && <Preloader />}
      <Cursor />
      <Sidebar />
      <SmoothScroll>
        <main className="editorial-main">
          <Landing preloaderEnabled={ENABLE_PRELOADER} />
          <About />
          <Education />
          <Internship />
          <SkillsRadar />
          <ProjectsBento />
          <BlogMarquee />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  )
}
