import { useEffect } from 'react';

export default function Landing() {
  useEffect(() => {
    window.particlesJS.load('particles-js', '/particles.json'
    );
  }, []);

  return (
    <section id="home" className="home-content">
      <div id="particles-js" className="absolute inset-0" />
      <h1>
        Hi, I’m <span className="highlight">Lewin</span>.
      </h1>
      <h2>I’m a student developer.</h2>
      <div className="btn-group">
        <a href="/LewinElepResume.pdf" className="btn" download>
          Download CV
        </a>

        <a href="#contact" className="btn">
          Contact Me
        </a>
      </div>
    </section>
  );
}
