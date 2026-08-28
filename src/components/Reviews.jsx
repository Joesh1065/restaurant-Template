import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { restaurantData } from '../data/restaurantData';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reviews = restaurantData.reviews;
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reviews.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    startTimer();
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    startTimer();
  };

  const handleDotClick = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    startTimer();
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: (dir) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' },
    }),
  };

  return (
    <section id="reviews" className="reviews container" aria-label="Customer Reviews">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Customer Reviews
      </motion.h2>
      
      <div className="reviews-slider" aria-live="polite">
        <div className="slides-wrapper" style={{ minHeight: '160px', position: 'relative' }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.figure
              key={reviews[currentIndex].id}
              className="slide"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <blockquote>"{reviews[currentIndex].quote}"</blockquote>
              <figcaption>— {reviews[currentIndex].author}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="slider-controls">
          <motion.button
            className="slider-btn"
            onClick={handlePrev}
            aria-label="Previous review"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ‹
          </motion.button>

          <div className="slider-dots">
            {reviews.map((review, idx) => (
              <button
                key={review.id}
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => handleDotClick(idx)}
              />
            ))}
          </div>

          <motion.button
            className="slider-btn"
            onClick={handleNext}
            aria-label="Next review"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ›
          </motion.button>
        </div>
      </div>
    </section>
  );
}
