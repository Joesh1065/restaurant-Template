import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header" id="top">
        <div className="container header-inner">
          <a
            href="#top"
            className="brand"
            aria-label="Luna Bistro - home"
            onClick={(e) => handleLinkClick(e, 'top')}
          >
            <svg
              className="logo"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" fill="#0b3d91" />
              <path
                d="M12 6a6 6 0 0 0 0 12c3.3 0 6-2.7 6-6 0-3.3-2.7-6-6-6z"
                fill="#ffe5b4"
                opacity="0.95"
              />
            </svg>
            <span className="brand-text">Luna Bistro</span>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <button
              className={`nav-toggle ${isOpen ? 'open' : ''}`}
              aria-controls="primary-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="hamburger-line line-1"></span>
              <span className="hamburger-line line-2"></span>
              <span className="hamburger-line line-3"></span>
            </button>
            <ul id="primary-menu" className={`menu ${isOpen ? 'open' : ''}`}>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>
                  About
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => handleLinkClick(e, 'menu')}>
                  Menu
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery')}>
                  Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => handleLinkClick(e, 'reviews')}>
                  Reviews
                </a>
              </li>
              <li>
                <a href="#contact-section" onClick={(e) => handleLinkClick(e, 'contact-section')}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
