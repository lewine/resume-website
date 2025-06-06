import React, { useState, useEffect } from 'react';

const PROJECTS = [
  {
    title: 'Login Abuse Detection and Defense Tool',
    subtitle: 'Personal Project',
    image: '/images/logintracker.png',   
    description: [],
    liveUrl: 'https://login-abuse-tracker-docker.onrender.com',
    codeUrl: 'https://github.com/lewine/login-abuse-tracker'
  },
  {
    title: 'Node.js Chatbot',
    subtitle: 'Personal Project',
    image: '/images/chatbot.png',    
    description: [],
    liveUrl: 'https://node-js-chatbot-b9k5.onrender.com',
    codeUrl: 'https://github.com/lewine/Node-JS-Chatbot'
  },
  {
    title: 'Custom Language Interpreter',
    subtitle: 'Class Project',
    image: null, 
    description: [
      'Developed a full interpreter in C++ for a custom language with variables, arithmetic, conditionals, loops (FOR, WHILE), and SWITCH-case logic',
      'Implemented a recursive descent parser and linked control flow graph using dynamically allocated InstructionNode structures',
      'Simulated memory, I/O streams, and execution flow, mimicking a real runtime engine, with error-resilient parsing logic'
    ],
    liveUrl: null,
    codeUrl: null
  }
];

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const count = PROJECTS.length;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const prev = () => setCurrent(c => (c - 1 + count) % count);
  const next = () => setCurrent(c => (c + 1) % count);
  const goTo = idx => setCurrent(idx);

  function handleTouchStart(e) {
    setTouchStartX(e.touches[0].clientX);
  }

  function handleTouchEnd(e) {
    if (touchStartX === null) return;
    const endX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - endX;
    const SWIPE_THRESHOLD = 50;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        next();
      } else {
        prev();
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
  }

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section id="projects" className="projects-section">
      <h1
        className="section-title"
        style={{ textAlign: 'center', margin: '0 auto', maxWidth: '900px' }}
      >
        Projects
      </h1>

      <div className="carousel-container">
        <button className="carousel-nav left" onClick={prev}>&larr;</button>
        <div
          className="carousel-viewport"
          
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {PROJECTS.map((p, i) => {
            const raw = (i - current + count) % count;
            const offset = raw > count / 2 ? raw - count : raw;
            const isCenter = offset === 0;

            const multiplier = isMobile ? 35 : 20;
            const multiplierY = isMobile ? 20 : 40;
            const multiplierScale = isMobile ? 0.7 : 0.5;

            const translateX = offset * multiplier; 
            const rotateY = isCenter ? 0 : offset < 0 ? multiplierY : -multiplierY;
            const scale = isCenter ? 1 : multiplierScale;
            const opacity = isCenter ? 1 : 0.5;
            const zIndex = isCenter ? 10 : 1;

            return (
              <div
                key={i}
                className="carousel-card split-horizontal"
                style={{
                  transform: `rotateY(${rotateY}deg) translateX(${translateX}vw) scale(${scale})`,
                  opacity,
                  zIndex,
                  width: '50vw',
                }}
                onClick={() => goTo(i)}
              >
                <div className="split-left">
                  <h2>{p.title}</h2>
                  <h3>{p.subtitle}</h3>
                  {p.image && (
                    <div className="project-image-preview">
                      <img src={p.image} alt={p.title} />
                    </div>
                  )}
                  {!p.liveUrl && !p.codeUrl && (
                    <ul>
                      {p.description.map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  )}
                  <div className="project-card-buttons">
                    {p.liveUrl && (
                      <button onClick={() => window.open(p.liveUrl, '_blank')}>
                        View Demo
                      </button>
                    )}
                    {p.codeUrl && (
                      <button onClick={() => window.open(p.codeUrl, '_blank')}>
                        View Code
                      </button>
                    )}
                    {!p.liveUrl && !p.codeUrl && (
                      <span className="no-demo-note">
                        Live demo & code unavailable due to academic integrity violation rules at Arizona State University.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="carousel-nav right" onClick={next}>&rarr;</button>
      </div>

      <div className="carousel-dots">
        {PROJECTS.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
