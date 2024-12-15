import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppointmentPage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import appointmentImage from '../../assets/images/app-photo.png';

const AppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [userName, setUserName] = useState('');
  const [petName, setPetName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate) {
      const fetchAvailableSlots = async () => {
        try {
          const mockAvailableSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'];
          setAvailableSlots(mockAvailableSlots);
        } catch (err) {
          setError('Error fetching available time slots.');
        }
      };
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the user is logged in by verifying the token
    const token = localStorage.getItem('token');
    console.log('Token:', token); 
    if (!token) {
      setError('User is not logged in. Please log in and try again.');
      return;
    }
  
    // Check if all the fields are filled
    if (!userName || !petName || !selectedDate || !selectedTime || !reason) {
      setError('Please fill in all the fields.');
      return;
    }
  
    console.log('Form Data:', {
      date: selectedDate,
      timeSlot: selectedTime,
      reason,
    });
  
    try {
      // API call to book the appointment
      console.log('API URL:', `${process.env.REACT_APP_API_BASE_URL}/api/v1/appointments`);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          date: selectedDate,
          timeSlot: selectedTime,
          reason,
        }),
      });
  
      console.log('Response Status:', response.status); 
      console.log('Response Headers:', response.headers); 
  
      const responseData = await response.json();
      console.log('Response Data:', responseData); 
  
      if (response.ok) {
        console.log('Appointment booked successfully');
        const newAppointment = responseData.data.appointment;

        navigate('/profile', {
          state: {newAppointment},
        }); 
      } else {
        setError(responseData.message || 'Failed to book the appointment. Please try again.');
      }
    } catch (err) {
      console.error('Error occurred during API call:', err);
      setError('An error occurred while booking the appointment.');
    }
  };
  
  return (
    <div className="appointment-page">
      <div className='top-appointment'>
        <img src={appointmentImage} alt={appointmentImage} className='appointment-img' />
        <h2>Book an Appointment</h2>
      </div>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Pet Name</label>
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            required
            placeholder="Enter your pet's name"
          />
        </div>

        <div className="form-group">
          <label>Reason for Appointment</label>
          <select onChange={(e) => setReason(e.target.value)} value={reason} required>
            <option value="">Select a reason</option>
            <option value="checkup">Checkup</option>
            <option value="vaccination">Vaccination</option>
            <option value="surgery">Surgery</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>

        <div className="form-group">
          <label>Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
            minDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            className='custom-datepicker'
          />
        </div>

        {availableSlots.length > 0 && (
          <div className="form-group">
            <label>Select Time Slot</label>
            <select
              onChange={(e) => setSelectedTime(e.target.value)}
              value={selectedTime}
              required
            >
              <option value="">Select a time</option>
              {availableSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        )}


        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentPage;

