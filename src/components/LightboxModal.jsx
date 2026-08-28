import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LightboxModal({ isOpen, imageSrc, imageAlt, onClose }) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded image preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className="lightbox-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button
              ref={closeButtonRef}
              className="lb-close"
              aria-label="Close image preview"
              onClick={onClose}
            >
              ✕
            </button>
            <img src={imageSrc} alt={imageAlt || 'Gallery preview'} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
