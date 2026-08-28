import React from 'react';
import { motion } from 'motion/react';
import { restaurantData } from '../data/restaurantData';

export default function Intro() {
  return (
    <motion.section
      id="intro"
      className="container intro"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="section-title">{restaurantData.intro.title}</h2>
      <p>{restaurantData.intro.description}</p>
    </motion.section>
  );
}
