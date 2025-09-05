import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";

const groupByCategory = (array = []) => {
  return array.reduce((acc, item) => {
    const catId = item.category_id?._id;
    if (!catId) return acc;

    if (!acc[catId]) {
      acc[catId] = {
        category: item.category_id, // keep full category object
        items: [],
      };
    }
    acc[catId].items.push(item);
    return acc;
  }, {});
};

const OfferSlider = ({ plankSliders }) => {
  
 const OfferingsPrevArrow = (props) => {
   const { onClick } = props;
   return (
     <button className="slick-prev custom-arrow" onClick={onClick}>
       <img src="/images/icons/Group 905.png" alt="left-arrow" />
     </button>
   );
 };
 const OfferingsNextArrow = (props) => {
   const { onClick } = props;
   return (
     <button className="slick-next custom-arrow" onClick={onClick}>
       <img src="/images/icons/Group 906.png" alt="right-arrow" />
     </button>
   );
};

    const offersSettings = {
      dots: false,
      nextArrow: <OfferingsNextArrow />,
      prevArrow: <OfferingsPrevArrow />,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      centerMode: false,
      // autoplay: true,
      responsive: [
        {
          breakpoint: 950,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
  
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    
    const [plankSlider, setPlankSlider] = useState([]);
  
     useEffect(() => {
        const fetchPlankSlider = async () => {
          try {
            const apiUrl = process.env.REACT_APP_API_URL;
    
            // const response = await axios.get("/api/user/allUsers");
            const response = await axios({
              method: "GET",
              baseURL: `${apiUrl}/api/`,
              url: "plank-slider",
            });
    
            setPlankSlider(response.data.plankSliders);
            // console.log(response.data.news);
            console.log("Plank Sliders", response.data.plankSliders);
            // setPlankSlider(response.data.PlankSlider);
          } catch (error) {
            console.error("Error fetching Plank Sliders:", error);
          }
        };
    
        fetchPlankSlider();
      }, []);

       const grouped = plankSlider?.length ? groupByCategory(plankSlider) : {};


  return (
    <div className="plank-slider-wrapper">
      {Object.values(grouped).map(({ category, items }) => (
        <div className="row radiant-row mb-5" key={category._id}>
          <div className="col-lg-6">
            <h2 className="title new-title">
              <span className="yellow-title">{category.title}</span> -
              <span className="black-title"> {category.size}</span>
            </h2>
          </div>

          <Slider {...offersSettings}>
            {items.map((slide) => (
              <div key={slide._id} className="what-we-offer-slider">
                <div className="offer-element">
                  {/* Main image */}
                  {slide.image?.[0]?.filepath && (
                    <div className="offer-image-container">
                      <img src={slide.image[0].filepath} alt={slide.alt} />
                    </div>
                  )}

                  {/* QR & text */}
                  <div className="offer-slider-content d-flex mt-4">
                    {slide.qr?.[0]?.filepath && (
                      <div className="qr-img-div">
                        <img src={slide.qr[0].filepath} alt={slide.qr_alt} />
                      </div>
                    )}
                    <div className="offer-text">
                      <h6>{slide.name}</h6>
                      <p>{slide.code}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};


export default OfferSlider;
