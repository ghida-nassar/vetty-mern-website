import React from 'react';
import './AboutUs.css';
import Header from '../../components/Header.js';

const AboutUs = () => {
  return (
    <>
    <Header/>
    <div className="about-us-page">
      <div className="about-us-overlay">
        <div className="about-us-title">
          <h1>About Us</h1>
        </div>
        <div className="about-us-boxes">
          <div className="about-us-box">
            <h2>Vetty Clinic</h2>
            <p>
              We combine compassionate care with expert veterinary services.
              Our clinic is dedicated to providing personalized and comprehensive
              care for pets of all kinds.
            </p>
          </div>
          <div className="about-us-box">
            <h2>Our Mission</h2>
            <p>
              At Vetty, our mission is to improve the quality of life for pets
              and their owners through preventative care, diagnostics, and tailored
              treatments.
            </p>
          </div>
          <div className="about-us-box">
            <h2>Our Services</h2>
            <p>
              From wellness exams to surgeries, our services are designed to meet
              your pet's health needs at every life stage. We're committed to using
              the latest treatments and technologies.
            </p>
          </div>
          <div className="about-us-box">
            <h2>Meet Our Team</h2>
            <p>
              Our team of veterinarians, technicians, and support staff share a passion
              for pet health. We believe in fostering trust and providing exceptional care.
            </p>
          </div>
        </div>
        <p className="about-us-thanks">Thank you for choosing Vetty. Stay tuned for our upcoming Vetty Shop, where we'll pamper your pet with the finest quality products, nutritious food, and fun toys, all thoughtfully recommended by our dedicated veterinarian.</p>
      </div>
    </div>
    </>
  );
};

export default AboutUs;
