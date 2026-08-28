import React from 'react';
import { motion } from 'motion/react';
import { restaurantData } from '../data/restaurantData';

export default function Gallery({ onImageClick }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="gallery" className="gallery container">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Image Gallery
      </motion.h2>

      <motion.div
        className="grid gallery-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {restaurantData.gallery.map((img) => (
          <motion.button
            key={img.id}
            type="button"
            className="gallery-item"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Open image: ${img.alt}`}
            onClick={() => onImageClick(img.full, img.alt)}
          >
            <img
              loading="lazy"
              src={img.thumb}
              alt={img.alt}
              onError={(e) => {
                e.currentTarget.src =
                  'https://via.placeholder.com/600x400?text=' +
                  encodeURIComponent(img.alt);
              }}
            />
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}
