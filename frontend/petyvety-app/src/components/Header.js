import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { jwtDecode } from 'jwt-decode';
import LoginIcon from '@mui/icons-material/Login';


const Header = ({ onAppointmentClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token); // Decode the token to get expiration time
      return exp * 1000 < Date.now();  // Convert `exp` to milliseconds and compare
    } catch (e) {
      return true; // If the token is invalid, consider it expired
    }
  }; 

  // Check for authentication on component load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }; 

  const handleAccessRestricted = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      alert("Please log in to access this page.");
      navigate("/login");
    }
  };

  
  return (
    <header className="header">
      <div className="logo">
        <h1>Vetty</h1>
      </div>
      <nav className="navigation">
        <button className="menu-button" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={isMenuOpen ? "active" : ""}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    onAppointmentClick();
                    setIsMenuOpen(false);
                  }}
                  className="book-appointment-btn"
                >
                  Book Your Appointment
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="header-login">
                  <LoginIcon style={{ fontSize: 31 }} />
                </Link>
              </li>
              <li className='restricted-button-li'>
                
                <button
                  onClick={() => handleAccessRestricted("/appointment")}
                  className="restricted-btn"
                >
                  Book Your Appointment
                </button>
               
              </li>
              
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
