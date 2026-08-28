import React from 'react';
import { motion } from 'motion/react';
import { restaurantData } from '../data/restaurantData';

export default function About() {
  return (
    <section id="about" className="about container">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {restaurantData.about.title}
      </motion.h2>

      <div className="about-grid">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {restaurantData.about.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </motion.div>

        <motion.blockquote
          className="quote"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          "{restaurantData.about.quote}" — {restaurantData.about.quoteAuthor}
        </motion.blockquote>
      </div>
    </section>
  );
}
