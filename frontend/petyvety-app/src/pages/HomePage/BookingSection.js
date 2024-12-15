import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingSection.css'; // Import the CSS file for styling
import girlServices from "../../assets/images/girl-services.jpg";
import { jwtDecode } from 'jwt-decode';

const BookingSection = () => {
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token); // Decode the token to get expiration time
      return exp * 1000 < Date.now(); // Convert `exp` to milliseconds and compare
    } catch (e) {
      return true; // If the token is invalid, treat it as expired
    }
  };

  const handleButtonClick = () => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      navigate('/login'); // Redirect to login page if no token or token is expired
    } else {
      navigate('/appointment'); // Redirect to appointment page if the token is valid
    }
  };

  return (
    <section className="booking-section">
      <div className="booking-content">
        <h2>Book the Best Experience </h2>
        <p>
          Our clinic provides top-notch care tailored to your pet's needs. From
          routine check-ups to emergency services, we ensure your pet's health and happiness.
        </p>
        <ul>
          <li>✔     Convenient Online Booking</li>

          <li>✔     Expert Veterinary Care</li>

          <li>✔     Personalized Attention for Your Pet</li>
        </ul>
        <button onClick={handleButtonClick} className="booking-button">
          Book Appointment
        </button>
      </div>
      <div>
        <img
          src={girlServices} // Replace with your actual image URL
          alt="Happy pet with a vet"
          className='girl-image'
        />
      </div>
    </section>
  );
};

export default BookingSection;
