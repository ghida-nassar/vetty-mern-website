
import React from "react";
import Slider from "react-slick";
import "./BlogSlider.css";

import water from "../../assets/images/water-icon.jpg";
import cleanliness from "../../assets/images/cleanliness-icon.png";
import checkup from "../../assets/images/checkup-icon.png";
import exercises from "../../assets/images/exercises-icon.png";
import dental from "../../assets/images/dental-icon.jpg";
import diet from "../../assets/images/diet-icon.png";
import environment from "../../assets/images/env-icon.png";
import toys from "../../assets/images/toys-icon.png";
import training from "../../assets/images/training-icon.jpg";

const BlogSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,  
    slidesToScroll: 1,  
    swipeToSlide: true,  
  };

  const slides = [
    [
      { icon: water, description: "Ensure your pet stays hydrated, especially during hot days." },
      { icon: cleanliness, description: "Regular grooming keeps your pet's coat healthy and clean." },
      { icon: checkup, description: "Annual checkups help catch potential health issues early." },
    ],
    [
      { icon: exercises, description: "Keep your pet active with daily exercise or playtime." },
      { icon: dental, description: "Proper dental care is essential for your pet's overall health." },
      { icon: diet, description: "Feed your pet a balanced and nutritious diet." },
    ],
    [
      { icon: environment, description: "Provide a comfortable and safe environment for your pet." },
      { icon: toys, description: "Pets need mental stimulation, try interactive toys." },
      { icon: training, description: "Proper training helps your pet behave better." },
    ],
  ];

  return (
    <div className="blog-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <div className="cards-container">
              {slide.map((card, idx) => (
                <div key={idx} className="card">
                  <img src={card.icon} alt={`Tip ${idx + 1}`} className="card-icon" />
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogSlider;

