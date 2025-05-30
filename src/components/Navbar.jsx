// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';

function NavSection({ title, links }) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  function handleMouseEnter() {
    clearTimeout(timerRef.current);
    setIsOpen(true);
  }

  function handleMouseLeave() {
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300); // 300ms delay before hiding
  }

  return (
    <div
      className="nav-section"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="nav-item">{title}</span>
      <ul className={`dropdown-menu${isOpen ? ' open' : ''}`}>
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-container">
        <div className="navbar-links">
          <NavSection
            title="Navigation"
            links={[
              { label: "Home", href: "#home" },
              { label: "Experience",   href: "#experience" },
              { label: "Skills",       href: "#skills" },
              { label: "Projects",     href: "#projects" },
              { label: "Contact Me",   href: "#contact" },
            ]}
          />
          <NavSection
            title="Social"
            links={[
              { label: "GitHub",   href: "https://github.com/lewine", external: true },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/lewin-elep/", external: true },
            ]}
          />
        </div>
      </nav>
    </header>
  );
}
