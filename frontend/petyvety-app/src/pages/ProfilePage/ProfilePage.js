import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import greetingImage from "../../assets/images/greetings2.jpg";
import homeIcon from "../../assets/images/home-icon.png";
import { format } from 'date-fns'

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, newAppointment } = location.state || {};
  const [userData, setUserData] = useState({});
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const formatDate = (isoDate) => format(new Date(isoDate), 'yyyy-MM-dd');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("User Data Response: ", response.data);
          setUserData(response.data.data.user);
        } catch (error) {
          console.error("Failed to fetch user data:", error?.response || error.message);
        }
      }
    };

    const fetchPetsData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/pets`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPets(response.data.data.pets);
        } catch (error) {
          console.error("Failed to fetch pets data:", error);
        }
      }
    };

    const fetchAppointmentsData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
    
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/appointments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
    
        let fetchedAppointments = Array.isArray(response.data.data.appointments)
          ? response.data.data.appointments
          : [];

          const enhancedAppointments = fetchedAppointments.map((appointment) => {
            
            const pet = pets.find((pet) => pet._id === appointment.pet);
            return {
              ...appointment,
              fullname: userData.fullname, // Add user's fullname
              petName: pet?.petName || "Unknown Pet", // Fetch pet name from pet info
            };
          });
    
        // Save to local storage
        localStorage.setItem("appointments", JSON.stringify(enhancedAppointments));
    
        setAppointments(enhancedAppointments);
      } catch (error) {
        console.error("Failed to fetch appointments, loading from cache...");
        const cachedAppointments = localStorage.getItem("appointments");
        if (cachedAppointments) {
          setAppointments(JSON.parse(cachedAppointments));
        }
      }
    };
    
       

    fetchUserData();
    fetchPetsData();
    fetchAppointmentsData();
  }, [newAppointment, userData, pets]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    navigate("/login"); // Redirect to the login page
  };

  const navigateHome = () => {
    navigate('/');
  };

  const navigateBooking = () => {
    navigate('/appointment');
  };

  return (
    <div className="profile-page">
      <div className="back-button">
        <button className="home-button" onClick={navigateHome}>
          <img src={homeIcon} alt="Home Icon" className="home-icon" />
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
        <button className='profile-app-button' onClick={navigateBooking}>
          Book now
        </button>
      </div>   

      <div className="greeting-section">
        <div>
          <h1>
            Hello {userData?.fullname || ""}, from <span>Dr. Alex Johnson</span>
          </h1>
          <p>Have a nice day!</p>
        </div>
        <img src={greetingImage} alt="Doctor Illustration" className="greeting-icon" />
      </div>

      <div className="info-section">
        <div className="info-card">
          <h2>User Information</h2>
          <p>
            <strong>Name:</strong> {userData?.fullname || "Not provided"}
          </p>
          <p>
            <strong>Email:</strong> {userData?.email || "Not provided"}
          </p>
          <p>
            <strong>Phone:</strong> {userData?.phoneNumber || "Not provided"}
          </p>
        </div>

        <div className="info-card">
          <h2>Pet Information</h2>
          {pets.map((pet, index) => (
            <div key={index}>
              <p>
                <strong>Name:</strong> {pet?.petName || "N/A"}
              </p>
              <p>
                <strong>Age:</strong> {pet?.petAge || "N/A"}
              </p>
              <p>
                <strong>Type:</strong> {pet?.petType || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="appointments-section">
        <h2>My Appointments</h2>

        <div className="appointment-labels">
          <span>Name</span>
        
          <span>Date</span>
          <span>Time</span>
          <span>Reason</span>
        </div>

        <div className="appointments-list">
          {appointments.map((appointment, index) => (
            <div key={index} className="appointment-card">
              <div className="appointment-detail">{appointment?.fullname || "N/A"}</div>
              <div className="appointment-detail">{formatDate(appointment?.date) || "N/A"}</div>
              <div className="appointment-detail">{appointment?.timeSlot || "N/A"}</div>
              <div className="appointment-detail">{appointment.reason || "No reason provided"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
