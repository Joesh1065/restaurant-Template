import React, { useState } from 'react';
import { restaurantData } from '../data/restaurantData';

export default function HoursContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name (minimum 2 characters).';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (formData.phone.trim() && !/^[0-9+\-\s]{7,20}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please enter a brief message (minimum 10 characters).';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: 'error', text: 'Please fix the highlighted errors.' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatus({ type: '', text: 'Sending enquiry...' });

    // Simulate async API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({
        type: 'success',
        text: 'Thanks — your enquiry has been received! We will reply shortly.'
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1100);
  };

  return (
    <section id="contact-section" className="hours-contact container">
      <div className="two-col">
        <div>
          <h3>Opening Hours</h3>
          <table className="hours">
            <tbody>
              {restaurantData.hours.map((h, i) => (
                <tr key={i}>
                  <td>{h.days}</td>
                  <td>{h.time}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Location</h3>
          <address>
            {restaurantData.contact.address}<br />
            <a href={restaurantData.contact.phoneUrl}>{restaurantData.contact.phone}</a>
          </address>

          <div className="map" aria-hidden="true">
            <iframe
              title="Luna Bistro location"
              src={restaurantData.contact.mapEmbedUrl}
              loading="lazy"
            />
          </div>
        </div>

        <div id="contact-form-section">
          <h3>Contact & Reservation Enquiry</h3>
          <form id="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'err-name' : undefined}
              />
              <span className="error" id="err-name" aria-live="polite">
                {errors.name}
              </span>
            </div>

            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@domain.com"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'err-email' : undefined}
              />
              <span className="error" id="err-email" aria-live="polite">
                {errors.email}
              </span>
            </div>

            <div className="form-row">
              <label htmlFor="phone">Phone (optional)</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'err-phone' : undefined}
              />
              <span className="error" id="err-phone" aria-live="polite">
                {errors.phone}
              </span>
            </div>

            <div className="form-row">
              <label htmlFor="message">Message / Reservation Details</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                minLength={10}
                placeholder="Preferred date, time, party size..."
                value={formData.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'err-message' : undefined}
              />
              <span className="error" id="err-message" aria-live="polite">
                {errors.message}
              </span>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send Enquiry'}
              </button>
              {status.text && (
                <div
                  className={`form-status ${status.type}`}
                  aria-live="polite"
                  role="status"
                >
                  {status.text}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
