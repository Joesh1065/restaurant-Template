import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LightboxModal from './components/LightboxModal';
import AddReviewModal from './components/AddReviewModal';
import { restaurantData } from './data/restaurantData';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';

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
    <Router>
      <div className="app-root theme-light">
        <Header />

        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                reviews={reviews} 
                onOpenReviewModal={() => setIsReviewModalOpen(true)} 
                onImageClick={handleOpenLightbox} 
              />
            } 
          />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>

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
    </Router>
  );
}
