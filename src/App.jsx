import React from 'react';
import Menu from './components/Menu';
import Hero from './components/Hero';
import About from './components/About';
import Certify from './components/Certify';
import Skills from './components/Skills';
import Projects from './components/Projects'
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div>
       <Menu />
       <Hero />
       <About />
       <Skills />
       <Projects />
       <Work />
       <Certify />
       <Contact />
       <Footer /> 
    </div>
  );
}

export default App;
