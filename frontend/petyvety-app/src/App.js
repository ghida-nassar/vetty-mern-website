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
  
  const [isAuthenticated, setIsAuthenticated] = useState(true); 
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


const HomePageWithHeader = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    if (isAuthenticated) {
      navigate('/appointment'); 
    } else {
      navigate('/login'); 
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


