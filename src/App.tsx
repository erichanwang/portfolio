import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Experiences } from './components/Experiences';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Research } from './components/Research';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Archive } from './pages/Archive';

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <Projects />
      <Skills />
      <Certifications />
      <Research />
      <Experiences />
      <Contact />
      <Footer />
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[--bg-base] text-[--text-primary] font-body bg-grid">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
