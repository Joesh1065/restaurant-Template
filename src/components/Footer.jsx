import React from 'react';
import { restaurantData } from '../data/restaurantData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="brand-foot">
          <svg
            width="36"
            height="36"
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
          <div>{restaurantData.name} — {restaurantData.tagline}</div>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="footer-links">
            <li>
              <a href="#menu" onClick={(e) => handleLinkClick(e, 'menu')}>
                Menu
              </a>
            </li>
            <li>
              <a href="#portfolio" onClick={(e) => handleLinkClick(e, 'portfolio')}>
                Portfolio
              </a>
            </li>
            <li>
              <a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery')}>
                Gallery
              </a>
            </li>
            <li>
              <a href="#contact-section" onClick={(e) => handleLinkClick(e, 'contact-section')}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="copyright">
          © {currentYear} {restaurantData.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
