import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

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
      <motion.header
        className="site-header"
        id="top"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container header-inner">
          <a
            href="#top"
            className="brand"
            aria-label="Luna Bistro - home"
            onClick={(e) => handleLinkClick(e, 'top')}
          >
            <motion.svg
              className="logo"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              aria-hidden="true"
              whileHover={{ rotate: 15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <circle cx="12" cy="12" r="10" fill="#0b3d91" />
              <path
                d="M12 6a6 6 0 0 0 0 12c3.3 0 6-2.7 6-6 0-3.3-2.7-6-6-6z"
                fill="#ffe5b4"
                opacity="0.95"
              />
            </motion.svg>
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

            {/* Desktop Menu */}
            <ul id="primary-menu" className="menu desktop-menu">
              {['about', 'menu', 'gallery', 'reviews', 'contact-section'].map((id) => (
                <li key={id}>
                  {id === 'menu' ? (
                    <Link to="/menu" onClick={() => setIsOpen(false)}>
                      Menu
                    </Link>
                  ) : (
                    <a href={`#${id}`} onClick={(e) => handleLinkClick(e, id)}>
                      {id === 'contact-section' ? 'Contact' : id.charAt(0).toUpperCase() + id.slice(1)}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Animated Drawer */}
            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  className="menu open"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                    {['about', 'menu', 'gallery', 'reviews', 'contact-section'].map((id) => (
                      <li key={id}>
                        {id === 'menu' ? (
                          <Link to="/menu" onClick={() => setIsOpen(false)}>
                            Menu
                          </Link>
                        ) : (
                          <a href={`#${id}`} onClick={(e) => handleLinkClick(e, id)}>
                            {id === 'contact-section' ? 'Contact' : id.charAt(0).toUpperCase() + id.slice(1)}
                          </a>
                        )}
                      </li>
                    ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </motion.header>
    </>
  );
}
