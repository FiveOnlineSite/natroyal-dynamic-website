import React from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";

const SectionSlider = ({
  settings,
  slides,
  products,
  subdivision,
  clients,
}) => {
  return (
    <Slider {...settings}>
      {products &&
        slides.map((slide, index) => (
          <div key={index} className="element">
            <div className="image-container">
              <img src={slide.image} alt="product" className="product-image" />
              <NavLink to={slide.link} className="overlay-text">
                <div className="overlay-title">
                  <h6>{slide.title}</h6>
                  <div>
                    <img src="/images/icons/arrow-up-right.png" />
                  </div>
                </div>
                {/* <p>{slide.content}</p> */}
              </NavLink>
            </div>
          </div>
        ))}

      {subdivision
        &&
        slides.map((slide, index) => (
          <div key={index} className="element">
            <div className="subdivision-container">
              <img src={slide.icon} alt="icon" />
              <div className="subdivision-text">
                <h6>{slide.title}</h6>

                <p className="paragraph">{slide.content}</p>

                <a href="#" className="custom-button no-border-btn p-0">
                  Read More
                  <img
                    src="/images/icons/arrow-up-right.png"
                    className="ps-2"
                    alt="arrow"
                  />
                </a>
              </div>
            </div>
          </div>
        ))}

      {clients &&
        slides.map((slide, index) => (
          <div key={index} className="element">
            <div className="image-container justify-content-center">
              <img
                src={slide.image}
                alt="client"
                className="product-image"
                width={slide.width}
                height={slide.height}
              />
            </div>
          </div>
        ))}
    </Slider>
  );
};

export default SectionSlider;
