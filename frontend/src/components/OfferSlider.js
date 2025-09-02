import React from "react";
import Slider from "react-slick";

const OfferSlider = ({ settings, slides }) => {
  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div className="what-we-offer-slider">
          <div className="row mt-lg-0 mt-md-0 mt-5">
            <div key={index} className="offer-element">
              <div className="offer-image-container">
                <img src={slide.image} alt="product" />
              </div>
              <div className="offer-slider-content d-flex mt-4">
                <div className="qr-img-div">
                  <img src={slide.qr} alt="qr-img" />
                </div>
                <div className="offer-text">
                  <h6>{slide.name}</h6>
                  <p>{slide.type}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default OfferSlider;
