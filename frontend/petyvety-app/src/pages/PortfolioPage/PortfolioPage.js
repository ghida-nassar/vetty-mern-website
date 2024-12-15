import React from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import "./PortfolioPage.css";
import doctorImg from '../../assets/images/doctor-photo1.jpg';
import homeImage from '../../assets/images/home-icon.png';

const PortfolioPage = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token); // Decode the token to get expiration time
      return exp * 1000 < Date.now();  // Convert `exp` to milliseconds and compare
    } catch (e) {
      return true; // If token is invalid, treat it as expired
    }
  };

  const handleAppointmentClick = () => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      navigate("/login");
    } else {
      navigate("/appointment");
    }
  };


  return (
    <div className="doctor-profile-container">
      <header className="doctor-header">
      <button className="home-button-portfolio" onClick={navigateHome}>
          <img src={homeImage} alt="Home Icon" className="home-icon" />
      </button>
        <h1>Dr. Alex Johnson</h1>
      </header>

      <section className="doctor-main-content">
        
        <div className="doctor-card">
          <img
            src={doctorImg}
            alt="Veterinary Doctor"
            className="doctor-image"
          />
          <div className="doctor-details">
            <h2>Dr. Alex Johnson</h2>
            <p>Veterinary Medicine Specialist</p>
            <p>Small Animals & Exotic Pets</p>
            <div className="doctor-contact">
              <p>📞 (+123) 456 789</p>
              <p>📧 vet.john@domain.com</p>
              <p>🏠 123 Pet Lane, Petville</p>
            </div>
            <div className="doctor-social-icons">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </div>
            <button onClick={handleAppointmentClick}>Get Appointment</button>
          </div>
        </div>

        
        <div className="doctor-info">
          <h2>About Our Dr.</h2>
          <p>
          Dr. Alex Johnson is a highly experienced veterinarian with over 10 years
            of expertise in treating a wide variety of animals. He specializes
            in small animal surgery, exotic pet care, and preventative health
            programs for pets of all ages. His compassionate approach ensures
            both pets and their owners feel cared for.
          </p>

          
          <h3>Education</h3>
          <div className="table-container">
           <table>
             <thead>
               <tr>
                 <th>Year</th>
                 <th>Degree</th>
                 <th>Institute</th>
               </tr>
             </thead>
             <tbody>
              <tr>
                <td>2010</td>
                <td>DVM (Doctor of Veterinary Medicine)</td>
                <td>University of Veterinary Sciences</td>
              </tr>
              <tr>
               <td>2015</td>
               <td>Master's in Veterinary Surgery</td>
               <td>Animal Health College</td>
             </tr>
            </tbody>
           </table>
         </div>
                    
          <h3>Services Offered</h3>
          <ul>
            <li>Routine checkups and vaccinations</li>
            <li>Emergency care and surgeries</li>
            <li>Dental health for pets</li>
            <li>Nutrition and dietary consultations</li>
            <li>Behavioral training and rehabilitation</li>
          </ul>

          
          <h3>What Our Clients Say</h3>
          <blockquote>
            "Dr. Johnson was amazing with my rescue dog! His gentle care and
            professional advice helped us so much."
          </blockquote>
          <blockquote>
            "The best veterinarian I've ever visited. He treated my exotic
            parrot with so much expertise and care."
          </blockquote>

          
          <h3>Pet Care Tips</h3>
          <ul>
            <li>
              <a href="#">5 Essential Tips for Healthy Pets</a>
            </li>
            <li>
              <a href="#">Signs Your Pet Needs a Vet Visit</a>
            </li>
            <li>
              <a href="#">Top Diet Plans for Senior Pets</a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;






