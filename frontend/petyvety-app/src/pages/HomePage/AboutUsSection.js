import React from "react";
import "./AboutUsSection.css"; // CSS for styling

const AboutUsSection = () => {
  const services = [
    {
      title: "Clinic",
      description:
        "You may call us family veterinarians. We care for most pets when an illness or injury arises. We are also responsible for preventive health, ensuring your furry companions stay happy and healthy.",
      icon: "👨‍⚕️", // Replace with an actual image if needed
    },
    {
      title: "Mission",
      description:
        "Care for pets who are critically ill or injured is essential. When serious conditions arise while your pet is in a clinic or hospital, specialized veterinary support is required to provide the necessary care and treatment.",
      icon: "🩺", // Replace with an actual image if needed
    },
    {
      title: "Services",
      description:
        "We're experts in the stomach and digestive system of animals. You might consult us for conditions like vomiting, diarrhea, or other gastrointestinal issues in your pet.",
      icon: "💉", // Replace with an actual image if needed
    },
    {
      title: "Team",
      description:
        "We use X-rays, ultrasound, and other imaging tests to diagnose conditions like fractures, internal injuries, or abnormalities in your pet's organs.",
      icon: "👩‍⚕️", // Replace with an actual image if needed
    },
  ];

  return (
    <section className="about-us-section">
      <div className="about-us-text">
        <h2>We provide</h2>
        <h3>Here is a little more About Our Hospital Services</h3>
        <p>
          We have several gift shops and hair salons on the hospital’s main campus. Our pharmacy provides prescription medication for patients and staff.
        </p>
        <ul>
          <li>✔ Expert Doctor</li>
          <li>✔ Mission</li>
          <li>✔ Best Services</li>
          <li>✔ Professional Team</li>
        </ul>
        <button className="about-us-btn">About Us</button>
      </div>
      <div className="about-us-cards">
        {services.map((service, index) => (
          <div
            className={`about-us-card ${
              index % 2 === 0 ? "card-offset-top" : "card-offset-bottom"
            }`}
            key={index}
          >
            <div className="card-icon">{service.icon}</div>
            <h4>{service.title}</h4>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUsSection;
