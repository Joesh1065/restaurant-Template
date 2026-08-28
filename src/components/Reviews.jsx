import React, { useState, useEffect, useRef } from 'react';
import { restaurantData } from '../data/restaurantData';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = restaurantData.reviews;
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
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
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    startTimer();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    startTimer();
  };

  const handleDotClick = (idx) => {
    setCurrentIndex(idx);
    startTimer();
  };

  return (
    <section id="reviews" className="reviews container" aria-label="Customer Reviews">
      <h2 className="section-title">Customer Reviews</h2>
      
      <div className="reviews-slider" aria-live="polite">
        <div className="slides-wrapper">
          <div
            className="slides"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <figure key={review.id} className="slide">
                <blockquote>"{review.quote}"</blockquote>
                <figcaption>— {review.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="slider-controls">
          <button
            className="slider-btn"
            onClick={handlePrev}
            aria-label="Previous review"
          >
            ‹
          </button>

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

          <button
            className="slider-btn"
            onClick={handleNext}
            aria-label="Next review"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
