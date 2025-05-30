import React, { useEffect, useRef } from 'react';

const ENTRIES = [
  {
    title: 'Sun Devil Satellite Lab – Tempe, AZ',
    role: 'Software Team | January 2024 – Present',
    points: [
      'Sole Developer on Helmholtz cage sub-project to test magnetometer and IMU accuracy under controlled magnetic fields',
      'Programmed with Arduino using Adafruit libraries to integrate LIS3MDL and ICM20948 sensors',
      'Exposure to LoRa-based telemetry protocols used in satellite data transmission'
    ]
  },
  {
    title: 'Tutor.com – Remote',
    role: 'C++ Tutor | July 2024 – October 2024',
    points: [
      'Provided one-on-one tutoring to students in C++ fundamentals and OOP',
      'Helped students debug code, prep for exams, and solve algorithmic challenges',
      'Tailored support to a range of academic levels and project types'
    ]
  }
];

export default function Experience() {
  const containerRef = useRef(null);

  useEffect(() => {
    const entries = Array.from(
      containerRef.current.querySelectorAll('.timeline-entry')
    );

    const observer = new IntersectionObserver(
      (observations) => {
        observations.forEach((obs) => {
          const el = obs.target;
          const idx = entries.indexOf(el);
          const delay = idx * 100;
          el.style.setProperty('--delay', `${delay}ms`);

          if (obs.isIntersecting) {
            el.classList.add('animate-in');
          } else {
            el.classList.remove('animate-in');
          }
        });
      },
      {
        root: null,
        rootMargin: '-300px 0px -300px 0px',
        threshold: 0                
      }
    );

    entries.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

   return (
    <section id="experience">
      <h1 className="experience-title">Experience</h1>
      <div
        className="experience-content"
        ref={containerRef}
        style={{ padding: '4rem 0', margin: '0 auto', maxWidth: '900px' }}
      >
        {ENTRIES.map((entry, idx) => (
          <div key={idx} className="timeline-entry">
            <h2>{entry.title}</h2>
            <h3>{entry.role}</h3>
            {entry.points.map((pt, i) => (
              <p key={i}>{pt}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
