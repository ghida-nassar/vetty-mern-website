import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import greeting from '../../assets/images/greetings2.jpg';


const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
    petName: '',
    petType: '',
    petAge: '',
    petMedicalHistory: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, passwordConfirm } = formData;

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      console.log('Form Data:', formData);
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/signup`, formData);

      if (response.status === 201) {
        const { token, data } = response.data;
        localStorage.setItem('token', token); 
        navigate('/profile', {state: { user: data.user } });

      }
    } catch (err) {
      console.error('Sign-up Error:', err.response || err); 
      setError(err.response?.data?.message || 'An error occurred during sign-up.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        
        <div className="form-section">
          <h2>Create Your Account</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <h3>User Information</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
  
            <h3>Pet Information</h3>
            <div className="form-group">
              <label>Pet Name</label>
              <input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Pet Type (e.g., Dog, Cat)</label>
              <input
                type="text"
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Pet Age</label>
              <input
                type="number"
                name="petAge"
                value={formData.petAge}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Medical History</label>
              <textarea
                name="petMedicalHistory"
                value={formData.petMedicalHistory}
                onChange={handleChange}
                required
              />
            </div>
  
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className='sign-up-button'>Sign Up</button>
          </form>
          
        </div>
  
        <div className="brand-section">
          <img
          src={greeting}
          alt="Doctor Illustration"
          className="greeting-icon"
          />
          <p>Already have an account?</p>
          <button onClick={() => navigate('/login')} className='signin-button'>Sign In</button>
        </div>
      </div>
    </div>
  );
  
};

export default SignUpPage;
