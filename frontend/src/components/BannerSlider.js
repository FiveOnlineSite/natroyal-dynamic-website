// import React, { useState } from "react";
// import Slider from "react-slick";
// import { NavLink } from "react-router-dom";

// const BannerSlider = ({ settings, slides }) => {
//   const [playingIndex, setPlayingIndex] = useState(null);

//   const handlePlay = (index) => {
//     setPlayingIndex(index);
//   };

//   const enhancedSettings = {
//     ...settings,
//     beforeChange: () => {
//       setPlayingIndex(null);
//     },
//   };

//   return (
//     <Slider {...enhancedSettings}>
//       {slides.map((slide, index) => (
//         <div key={index} className="slide-container">
//           {playingIndex === index ? (
//             <video
//               src={slide.videoUrl}
//               muted
//               autoPlay
//               onEnded={() => setPlayingIndex(null)}
//               className="video-element"
//             />
//           ) : (
//           <div className="poster-container">
//             <img src={slide.poster} alt="Poster" className="poster-image" />
//             <div className="banner-text">
//               <h1 className="banner-title">{slide.text}</h1>
//               <div className="d-flex">
//                 <NavLink to="/contact-us" className="custom-button">
//                   Get Started
//                 </NavLink>
//               </div>
//             </div>
//             {/* <div className="button-div">
//               <button
//                 className="play-button-div"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handlePlay(index);
//                 }}
//               >
//                 <div class="button-outer-circle has-scale-animation"></div>
//                 <div class="button-outer-circle has-scale-animation has-delay-short"></div>
//                 <div className="play-button">
//                   <img src="/images/icons/play (1).png" alt="play-icon" />
//                 </div>
//               </button>
//             </div> */}
//           </div>
//           {/* )} */}
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default BannerSlider;

import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import axios from "axios"

const BannerSlider = ({ settings, slides }) => {
  const enhancedSettings = {
    ...settings,
    beforeChange: () => {}, // Reset any states if needed
  };

  const [homeBanner, setHomeBanner] = useState([])

    useEffect(() => {
      const fetchHomeBanner = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
  
          const response = await axios({
            method: "GET",
            baseURL: `${apiUrl}/api/`,
            url: "home-banner",
          });
  
          setHomeBanner(response.data.banners);
          // console.log(response.data.news);
          console.log("filepath", response.data.banners.banner[0].filepath);
          // setHomeBanner(response.data.HomeBanner);
        } catch (error) {
          console.error("Error fetching Home Banner:", error);
        }
      };
  
      fetchHomeBanner();
    }, []);

  return (
    <Slider {...enhancedSettings}>
      {homeBanner.map((banners, index) => (
        <div key={index} className="slide-container">
          <div className="poster-container">
            {banners.type === "image" ? (
                            <img
                              src={banners.banner.filepath}
                              alt={banners.banner.alt || "banner-image"}
                              className="poster-image"
                              loading="lazy"
                            />
                          ) : banners.type === "video" ? (
                            <video
                              src={banners.banner.filepath}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              className="video-element"
                            />
                          ) : (
                            <p>No media available</p>
                          )}

            {/* Common Banner Content - Placed inside the same container */}
            <div className="banner-text">
              <h1 className="banner-title" style={{color: banners.heading_color}} >{banners.heading}</h1>
              {banners.button && (
              <div className="d-flex">
                <NavLink to={banners.button_url} className="custom-button">
                {banners.button}
                </NavLink>
              </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default BannerSlider;
