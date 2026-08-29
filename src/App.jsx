import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Featured from './components/Featured';
import Menu from './components/Menu';
import About from './components/About';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import HoursContact from './components/HoursContact';
import Footer from './components/Footer';
import LightboxModal from './components/LightboxModal';
import AddReviewModal from './components/AddReviewModal';
import { restaurantData } from './data/restaurantData';

export default function App() {
  const [reviews, setReviews] = useState(restaurantData.reviews);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    imageSrc: '',
    imageAlt: ''
  });

  const handleOpenLightbox = (src, alt) => {
    setLightbox({
      isOpen: true,
      imageSrc: src,
      imageAlt: alt
    });
  };

  const handleCloseLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const handleAddReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <div className="app-root theme-light">
      <Header />

      <main id="main">
        <Hero />
        <Intro />
        <Featured />
        <Menu />
        <About />
        <Gallery onImageClick={handleOpenLightbox} />
        <Reviews
          reviews={reviews}
          onOpenReviewModal={() => setIsReviewModalOpen(true)}
        />
        <HoursContact />
      </main>

      <Footer />

      <LightboxModal
        isOpen={lightbox.isOpen}
        imageSrc={lightbox.imageSrc}
        imageAlt={lightbox.imageAlt}
        onClose={handleCloseLightbox}
      />

      <AddReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onAddReview={handleAddReview}
      />
    </div>
  );
}
