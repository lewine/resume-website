import React, { useState, useRef, useEffect } from 'react';

function NavSection({ title, links }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function isMobile() {
      return window.innerWidth <= 768;
    }

    function handleTouchStart(e) {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target) &&
        isMobile()
      ) {
        setIsOpen(false);
      }
    }
    function handleScroll() {
      if (isOpen && isMobile()) {
        setIsOpen(false);
      }
    }

    if (isOpen && isMobile()) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  function handleMouseEnter() {
    if (window.innerWidth > 768) {
      setIsOpen(true);
    }
  }
  function handleMouseLeave() {
    if (window.innerWidth > 768) {
      setIsOpen(false);
    }
  }
  function handleClick() {
    if (window.innerWidth <= 768) {
      setIsOpen((prev) => !prev);
    }
  }

  return (
    <div
      className="nav-section"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="nav-item" onClick={handleClick}>
        {title}
      </span>
      {isOpen && (
        <ul className="dropdown-menu">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                onClick={() => {
                  if (window.innerWidth <= 768) {
                    setIsOpen(false);
                  }
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Navbar() {
  const navLinks = [
    { label: "Home",       href: "#home" },
    { label: "Experience", href: "#experience" },
    { label: "Skills",     href: "#skills" },
    { label: "Projects",   href: "#projects" },
    { label: "Contact Me", href: "#contact" },
  ];
  const socialLinks = [
    { label: "GitHub",   href: "https://github.com/lewine",   external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/lewin-elep/", external: true },
  ];

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <div className="navbar-links">
          <NavSection title="Navigation" links={navLinks} />
          <NavSection title="Social"     links={socialLinks} />
        </div>
      </nav>
    </header>
  );
}
