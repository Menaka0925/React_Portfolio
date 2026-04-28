import React, { useEffect } from 'react';
import { trackEvent } from './utils/analytics';
import Menu from './components/Menu';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects'
import Work from './components/Work';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    trackEvent("PAGE_VISIT", "Portfolio Home");
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen selection:bg-sky-500/30 selection:text-sky-200">
       <Menu />
       <main>
         <Hero />
         <About />
         <Work />
         <Projects />
         <Publications />
       </main>
       <Contact />
       <Footer /> 
    </div>
  );
}

export default App;
