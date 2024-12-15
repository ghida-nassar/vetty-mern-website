import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer-wave">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffff" 
            d="M0,160L48,186.7C96,213,192,267,288,256C384,245,480,171,576,149.3C672,128,768,160,864,186.7C960,213,1056,235,1152,213.3C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      
      <div className="footer-content">
       
        <div className="footer-section about-us">
          <h3>About</h3>
          <ul>
            <li>
              <Link to="/about" className="link">About Us</Link>
            </li>
            <li>
              <Link to="/portfolio" className="link">Portfolio</Link>
            </li>
            <li>
              <Link to="/faqs" className="link">FAQ's</Link>
            </li>
          </ul>
        </div>

        
        <div className="footer-section contact-us">
           <h3>Contact Us</h3>
           <div className="social-icons">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="social-icon" />
             </a>
             <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="social-icon" />
             </a>
           </div>
         </div>

      </div>

      
      <div className="footer-bottom">
        <p>Version 1.0.0 | © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;


