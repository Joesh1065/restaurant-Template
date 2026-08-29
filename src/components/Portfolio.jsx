import React, { useState } from 'react';
import { motion } from 'motion/react';

const PROJECT_DATA = {
  title: 'Restaurant Website Template',
  description:
    'A premium, fully responsive restaurant web application built with modern React architecture. Designed for Luna Bistro — featuring immersive dining experiences with interactive menus, photo galleries, and seamless reservation flows.',
  liveUrl: 'https://joesh1065.github.io/restaurant-Template/',
  codeUrl: 'https://github.com/Joesh1065/restaurant-Template',
  previewImage:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85&auto=format&fit=crop',
  technologies: [
    'React 18',
    'Vite',
    'Framer Motion',
    'CSS3',
    'Responsive Design',
    'Accessibility',
  ],
  features: [
    'Interactive tabbed menu with category filtering',
    'Image gallery with accessible lightbox modal',
    'Auto-sliding customer reviews carousel',
    'Contact form with real-time field validation',
    'SEO-optimized with Schema.org structured data',
    'Automated GitHub Pages CI/CD deployment',
  ],
};

export default function Portfolio() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="portfolio" className="portfolio-section container">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">Our Work</h2>
        <p className="section-subtitle">
          Crafted with precision by{' '}
          <span className="portfolio-brand">JP Visual Works</span>
        </p>
      </motion.div>

      <motion.article
        className="portfolio-card"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {/* Browser-style preview */}
        <motion.div className="portfolio-preview" variants={itemVariants}>
          <div className="browser-chrome">
            <div className="browser-dots">
              <span className="dot-red" />
              <span className="dot-yellow" />
              <span className="dot-green" />
            </div>
            <div className="browser-url">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>joesh1065.github.io/restaurant-Template</span>
            </div>
          </div>
          <div className="browser-viewport">
            {/* Show iframe on larger screens, fallback image on smaller */}
            <iframe
              src={PROJECT_DATA.liveUrl}
              title="Restaurant Website Template — Live Preview"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              className={`portfolio-iframe ${iframeLoaded ? 'loaded' : ''}`}
              onLoad={() => setIframeLoaded(true)}
            />
            <img
              src={PROJECT_DATA.previewImage}
              alt="Restaurant Website Template preview — elegant dining interior"
              className="portfolio-fallback-img"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Project details */}
        <motion.div className="portfolio-body" variants={itemVariants}>
          <div className="portfolio-header">
            <span className="portfolio-tag">Featured Project</span>
            <h3 className="portfolio-title">{PROJECT_DATA.title}</h3>
            <p className="portfolio-desc">{PROJECT_DATA.description}</p>
          </div>

          {/* Tech tags */}
          <div className="tech-tags">
            {PROJECT_DATA.technologies.map((tech) => (
              <span key={tech} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>

          {/* Key features */}
          <ul className="feature-list">
            {PROJECT_DATA.features.map((feature) => (
              <li key={feature}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feature-check"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="portfolio-actions">
            <motion.a
              className="btn btn-primary portfolio-btn"
              href={PROJECT_DATA.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </motion.a>
            <motion.a
              className="btn btn-outline portfolio-btn"
              href={PROJECT_DATA.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              View Code
            </motion.a>
          </div>
        </motion.div>
      </motion.article>
    </section>
  );
}
