import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function AddReviewModal({ isOpen, onClose, onAddReview }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validate = () => {
    const errs = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = 'Please enter your name.';
    }
    if (!quote.trim() || quote.trim().length < 10) {
      errs.quote = 'Please enter a review (at least 10 characters).';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const newReview = {
      id: `r-${Date.now()}`,
      rating,
      quote: quote.trim(),
      author: role.trim() ? `${name.trim()} — ${role.trim()}` : name.trim(),
    };

    onAddReview(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setRole('');
      setQuote('');
      setRating(5);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Write a Customer Review"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="review-modal-card"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button
              ref={closeButtonRef}
              className="lb-close"
              aria-label="Close review modal"
              onClick={onClose}
            >
              ✕
            </button>

            <h3 className="review-modal-title">Share Your Dining Experience</h3>
            <p className="review-modal-subtitle">Leave a review and star rating for Luna Bistro</p>

            {submitted ? (
              <motion.div
                className="review-success-msg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                ✨ Thank you! Your review has been added.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Star Picker */}
                <div className="star-picker-row">
                  <label className="star-label">Your Rating:</label>
                  <div className="stars-input" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = star <= (hoverRating || rating);
                      return (
                        <button
                          key={star}
                          type="button"
                          className={`star-btn ${active ? 'active' : ''}`}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          aria-label={`Rate ${star} out of 5 stars`}
                        >
                          ★
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="rev-name">Your Name</label>
                  <input
                    id="rev-name"
                    type="text"
                    placeholder="e.g. Vikram Seth"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-row">
                  <label htmlFor="rev-role">Tag / Role (Optional)</label>
                  <input
                    id="rev-role"
                    type="text"
                    placeholder="e.g. Food Lover / Verified Guest"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="rev-quote">Your Review</label>
                  <textarea
                    id="rev-quote"
                    rows={4}
                    placeholder="Tell us about the flavors, atmosphere, service, or your favorite dishes..."
                    value={quote}
                    onChange={(e) => {
                      setQuote(e.target.value);
                      if (errors.quote) setErrors((prev) => ({ ...prev, quote: '' }));
                    }}
                    aria-invalid={!!errors.quote}
                  />
                  {errors.quote && <span className="error">{errors.quote}</span>}
                </div>

                <div className="form-actions">
                  <motion.button
                    type="submit"
                    className="btn btn-gold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Review
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
