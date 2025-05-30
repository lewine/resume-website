// src/components/Skills.jsx
import React, { useEffect } from 'react';

const SKILLS = [
  { name: 'Java',   icon: 'devicon-java-plain'    },
  { name: 'Python', icon: 'devicon-python-plain'  },
  { name: 'C++',    icon: 'devicon-cplusplus-plain' },
  { name: 'Node.js',icon: 'devicon-nodejs-plain'  },
  { name: 'Git',    icon: 'devicon-git-plain'     },
  { name: 'Arduino',icon: 'devicon-arduino-plain' },
];

export default function Skills() {
  useEffect(() => {
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => {
      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width)  * 100;
        const y = ((e.clientY - rect.top ) / rect.height) * 100;
        card.style.setProperty('--spotlight-x', `${x}%`);
        card.style.setProperty('--spotlight-y', `${y}%`);
      };
      const onMouseLeave = () => {
        card.style.setProperty('--spotlight-x', '50%');
        card.style.setProperty('--spotlight-y', '50%');
      };
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
      // clean up
      return () => {
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
      };
    });
  }, []);

  return (
    <section id="skills" className="skills-content">
      <h1>Skills</h1>
      <div className="skills-grid">
        {SKILLS.map(skill => (
          <div key={skill.name} className="skill-card">
            <i className={skill.icon} />
            <h2>{skill.name}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}
