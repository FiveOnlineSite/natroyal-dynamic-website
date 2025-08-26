import React from "react";
import Slider from "react-slick";

const TextilesSlider = ({ settings, slides }) => {
  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div className="textiles-slider mt-5">
          <div className="row">
            <div key={index} className="textiles-element">
              <div className="textiles-container">
                <div className="textiles-image-container">
                  <img src={slide.image} alt="textiles" className="w-100" />
                </div>
                <div className="textiles-slider-content">
                  <h4>{slide.name}</h4>
                  {slide.lamination_coating ? (
                    <>
                      <div className="row textiles-content">
                        <div className="col-lg-6">
                          <h6>For Lamination</h6>
                        </div>
                        <div className="col-lg-6">
                          <p className="paragraph">
                            {slide.lamination_coating.lamination_text}
                          </p>
                        </div>
                      </div>

                      <div className="row textiles-content">
                        <div className="col-lg-6">
                          <h6>For Coating</h6>
                        </div>
                        <div className="col-lg-6">
                          <p className="paragraph">
                            {slide.lamination_coating.coating_text}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="row textiles-content textiles-text">
                      <p className="paragraph">{slide.text}</p>
                    </div>
                  )}

                  <div className="tags-div">
                    {slide.tags.map((tag, i) => (
                      <div className="single-tag">
                        <h6 key={i} className="tag">
                          {tag}
                        </h6>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TextilesSlider;
