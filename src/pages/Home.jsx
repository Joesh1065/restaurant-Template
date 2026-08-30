import React from 'react';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Featured from '../components/Featured';
import Menu from '../components/Menu';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import HoursContact from '../components/HoursContact';

export default function Home({ reviews, onOpenReviewModal, onImageClick }) {
  return (
    <main id="main">
      <Hero />
      <Intro />
       <Featured />
       <About />
      <Gallery onImageClick={onImageClick} />
      <Reviews
        reviews={reviews}
        onOpenReviewModal={onOpenReviewModal}
      />
      <HoursContact />
    </main>
  );
}
