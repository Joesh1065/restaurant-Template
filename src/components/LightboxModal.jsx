import React, { useEffect, useRef } from 'react';

export default function LightboxModal({ isOpen, imageSrc, imageAlt, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus close button on open
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

  if (!isOpen) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Expanded image preview"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="lightbox-content">
        <button
          ref={closeButtonRef}
          className="lb-close"
          aria-label="Close image preview"
          onClick={onClose}
        >
          ✕
        </button>
        <img src={imageSrc} alt={imageAlt || 'Gallery preview'} />
      </div>
    </div>
  );
}
