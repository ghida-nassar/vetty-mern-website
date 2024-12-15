import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import animal_login from '../../assets/images/animal-login.png';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, { email, password });

      if (response.status === 200) {
        
        const token = response.data.token;

        
        localStorage.setItem('token', token);

       
        navigate('/');  
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    }
  };

  
  const handleRedirect = () => {
    navigate('/signup');
  };

  return (
<div className="login-page">
  <div className="login-form">
    <div className="image-container-login">
      <img src={animal_login} alt="dogPhoto" className="animal-login" />
    </div>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account?{' '}
      <button onClick={handleRedirect}>Sign Up</button>
    </p>
  </div>
</div>

  );
  
};

export default LoginPage;
