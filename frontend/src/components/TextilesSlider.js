import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const TextilesSlider = ({ settings }) => {

  const [textile, setTextile] = useState([])

  useEffect(() => {
        const fetchTextile = async () => {
          try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${apiUrl}/api/textiles/with-tags`);
            const textile = response.data.textiles;
                      
            setTextile(textile);
          } catch (error) {
            console.error("Error fetching textile content:", error);
          } 
        };
        
        fetchTextile();
        }, []);
  
  return (
    <Slider {...settings}>
      {textile && textile.map((slide) => (
        <div className="textiles-slider mt-5">
          <div className="row">
            <div key={slide._id} className="textiles-element">
              <div className="textiles-container">
                {slide.image?.[0]?.filepath && (
                  <div className="textiles-image-container">
                  <img src={slide.image?.[0]?.filepath} alt={slide.alt} className="w-100" />
                </div>
                )}
                
                <div className="textiles-slider-content">
                  <h4>{slide.title}</h4>
                  {slide.lamination_content && slide.coating_content ? (
                    <>
                     {slide.lamination_content && (
                       <div className="row textiles-content">
                        <div className="col-lg-6">
                          <h6>For Lamination</h6>
                        </div>
                        <div className="col-lg-6">
                          <div className="paragraph" dangerouslySetInnerHTML={{__html: slide.lamination_content}}>
                            
                          </div>
                        </div>
                      </div>
                     )}
                     
                     {slide.coating_content && (
                      <div className="row textiles-content">
                        <div className="col-lg-6">
                          <h6>For Coating</h6>
                        </div>
                        <div className="col-lg-6">
                          <div className="paragraph" dangerouslySetInnerHTML={{__html: slide.coating_content}}>
                          </div>
                        </div>
                      </div>
                     )}
                    </>
                  ) : (
                    <div className="row textiles-content textiles-text">
                      <div className="paragraph" dangerouslySetInnerHTML={{__html: slide.content}}></div>
                    </div>
                  )}

                  <div className="tags-div">
                    {slide.tags && slide.tags.map((tag) => (
                      <div className="single-tag">
                        <h6 key={tag._id} className="tag">
                          {tag.tag}
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
