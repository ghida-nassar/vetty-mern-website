import React, { useState } from 'react';
import './FAQPage.css';
import Header from '../../components/Header.js';

const faqs = [
  {
    question: 'How do I book an appointment for my pet?',
    answer: 'You can book an appointment by visiting our booking page or calling us directly at our clinic number.',
  },
  {
    question: 'What services do you offer for pets?',
    answer: 'We offer vaccinations, surgeries, dental care, wellness exams, and emergency services for your pets.',
  },
  {
    question: 'Do you provide dietary advice for pets?',
    answer: 'Yes, our veterinarian provides customized dietary recommendations based on your pet\'s health and age.',
  },
  {
    question: 'How often should my pet have a check-up?',
    answer: 'It is recommended to have a wellness check-up every 6 months to ensure your pet stays healthy.',
  },
  {
    question: 'What should I bring for my pet’s first visit?',
    answer: 'Please bring your pet’s medical history, any medications they are taking, and their vaccination records.',
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <Header/>
    <section className="faq-section">
      <div className="faq-left">
        <h2 className="faq-title">FAQ</h2>
        <p className="faq-description">
          Here are some common questions pet owners ask about our clinic and services. 
          We are here to help keep your pets happy and healthy.
        </p>
      </div>
      <div className="faq-right">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span className="faq-icon">+</span>
              <span>{faq.question}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default FAQPage;
