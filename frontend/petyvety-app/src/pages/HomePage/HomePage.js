// src/pages/HomePage.js
import React from 'react';
import PortfolioSection from './PortfolioSection';
import BookingSection from './BookingSection';
import AboutUsSection from './AboutUsSection';
import Footer from '../../components/Footer';
import Blogs from './BlogSlider';

const HomePage = () => {
    return (
      <div>
        <PortfolioSection />
        <BookingSection/>
        <AboutUsSection/>
        <Blogs/>
        <Footer/>
        
        {/* Additional sections for the homepage can be added here */}
      </div>

    );
  };
  

export default HomePage;
