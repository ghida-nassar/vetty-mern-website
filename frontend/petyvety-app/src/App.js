import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage/HomePage';
import PortfolioPage from './pages/PortfolioPage/PortfolioPage';
import AboutPage from './pages/AboutUs/AboutUs';
import LoginPage from './pages/LoginPage/LoginPage';
import AppointmentPage from './pages/AppointmentPage/AppointmentPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FAQPage from './pages/FAQPage/FAQPage';
const App = () => {
  // Simulating user authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(true); // bde raje3a false
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePageWithHeader isAuthenticated={isAuthenticated} />}
        />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/profile" element={
    isAuthenticated ? (
      <ProfilePage />
    ) : (
      <Navigate to="/login" replace />
    )
  } />
        <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(false)} />} />
        <Route
          path="/appointment"
          element={
            isAuthenticated ? (
              <AppointmentPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

// Wrapper for displaying Header only on the Home page
const HomePageWithHeader = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  // Handle Appointment button click
  const handleAppointmentClick = () => {
    if (isAuthenticated) {
      navigate('/appointment'); // Navigate to appointment page if logged in
    } else {
      navigate('/login'); // Redirect to login page if not logged in
    }
  };
  return (
    <>
      <Header onAppointmentClick={handleAppointmentClick} />
      <HomePage />
    </>
  );
};

export default App;


