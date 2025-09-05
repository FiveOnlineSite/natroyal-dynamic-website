import React from "react"
import Slider from "react-slick"

const TestimonialSlider = ({settings, slides}) => {
  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div className="testimonial-slider mt-5">
          <div className="row justify-content-center">
            <div className='col-lg-10'>
            <div key={index} className="testimonial-element">
              <div className="testimonial-container d-flex flex-column align-items-center">
                <div className="testimonial-image-container">
               <img src='/images/icons/double-invited-comma.png' alt='comma'/>
               </div>
                <div className="testimonial-slider-content mt-5">
                  
                  <h6>{slide.content}</h6>

                 <div className='testimonial-name mt-5'>
                    <h6><span>{slide.name}</span>,{" "}{slide.designation}</h6>
                 </div>
                </div>
              </div>
            </div>
            </div>
           
          </div>
        </div>
      ))}
    </Slider>
  )
}

export default TestimonialSlider
