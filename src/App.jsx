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

export default function App() {
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
        <Reviews />
        <HoursContact />
      </main>

      <Footer />

      <LightboxModal
        isOpen={lightbox.isOpen}
        imageSrc={lightbox.imageSrc}
        imageAlt={lightbox.imageAlt}
        onClose={handleCloseLightbox}
      />
    </div>
  );
}
