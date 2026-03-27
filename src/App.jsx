import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experiences from './components/Experiences'
import Projects from './components/Projects'
import Contacts from './components/Contacts'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experiences />
      <Projects />
      <Contacts />
      <Footer />
    </div>
  )
}

export default App