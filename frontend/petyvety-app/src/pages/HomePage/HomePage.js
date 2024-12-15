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
        
        
      </div>

    );
  };

export default HomePage;
