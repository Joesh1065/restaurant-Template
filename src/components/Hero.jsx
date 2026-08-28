import React from 'react';
import { motion } from 'motion/react';
import { restaurantData } from '../data/restaurantData';

export default function Hero() {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="hero" className="hero" aria-label="Hero">
      <div className="container hero-inner">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="title" variants={itemVariants}>
            {restaurantData.name} — {restaurantData.tagline}
          </motion.h1>
          <motion.p className="lead" variants={itemVariants}>
            {restaurantData.subtitle}
          </motion.p>
          <motion.div className="hero-cta" variants={itemVariants}>
            <motion.a
              className="btn btn-primary"
              href="#contact-form-section"
              onClick={(e) => handleScroll(e, 'contact-form-section')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Reserve a Table
            </motion.a>
            <motion.a
              className="btn btn-outline"
              href="#menu"
              onClick={(e) => handleScroll(e, 'menu')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              View Menu
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-media"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <img
            src={restaurantData.heroImage}
            alt="Chef plating modern Indian dish at Luna Bistro"
            loading="eager"
            onError={(e) => {
              e.currentTarget.src =
                'https://via.placeholder.com/900x600?text=Luna+Bistro+Modern+Dining';
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
