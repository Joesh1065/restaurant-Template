import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Reviews({ reviews, onOpenReviewModal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (reviews.length <= 1) return;
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

  const currentReview = reviews[currentIndex] || reviews[0];

  return (
    <section id="reviews" className="reviews container" aria-label="Customer Reviews">
      <div className="reviews-header">
        <div>
          <motion.h2
            className="section-title"
            style={{ textAlign: 'left', margin: '0 0 0.25rem' }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Guest Reviews & Ratings
          </motion.h2>
          <p className="section-subtitle" style={{ textAlign: 'left', margin: 0 }}>
            ★ 5.0 Average Rating based on guest experiences
          </p>
        </div>

        <motion.button
          type="button"
          className="btn btn-gold"
          onClick={onOpenReviewModal}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          ✍️ Write a Review
        </motion.button>
      </div>
      
      <div className="reviews-slider" aria-live="polite">
        <div className="slides-wrapper" style={{ minHeight: '180px', position: 'relative' }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {currentReview && (
              <motion.figure
                key={currentReview.id}
                className="slide"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="review-stars" aria-label={`${currentReview.rating || 5} out of 5 stars`}>
                  {Array.from({ length: currentReview.rating || 5 }).map((_, i) => (
                    <span key={i} className="star-icon">★</span>
                  ))}
                </div>
                <blockquote>"{currentReview.quote}"</blockquote>
                <figcaption>— {currentReview.author}</figcaption>
              </motion.figure>
            )}
          </AnimatePresence>
        </div>

        {reviews.length > 1 && (
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
        )}
      </div>
    </section>
  );
}
