import React from 'react';
import { Link } from 'react-router-dom';
import './PortfolioSection.css'; 
import doctorPhoto from '../../assets/images/doctor-photo-minimize.jpg'; 

const PortfolioSection = () => {
  return (
    <section className="portfolio-section">
      <div className="portfolio-content">
        <div className="text-content">
          <h2>Dr. Alex Johnson</h2>
          <p>
            Dr. Alex Johnson, a distinguished veterinarian with a passion for pet care, graduated from the University of Veterinary Medicine with honors. With over 10 years of experience, he's dedicated to providing the best care and ensuring the health and happiness of every pet.
          </p>
          <p>
            Trust your pet's health to someone who cares deeply and brings the best experience to ensure every animal's well-being.
          </p>
          <Link to="/portfolio" className="portfolio-button">
            Who We Are
          </Link>
        </div>
        <div className="image-container">
          <img src={doctorPhoto} alt="Dr. Alex Johnson" className="doctor-photo" />
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
