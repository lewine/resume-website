import React, { useEffect } from 'react';
import Landing from './components/Landing';
import Navbar  from './components/Navbar';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './index.css';

function App() {
  useEffect(() => {
    if (window.particlesJS?.load) {
      window.particlesJS.load(
        'global-particles',
        '/particles-stars.json',
        () => console.log('✨ global stars loaded')
      );
    }
  }, []);

  return (
    <>
      <div id="global-particles" className="absolute inset-0 pointer-events-none"
/>

      <Navbar />
      <Landing />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

export default App;
