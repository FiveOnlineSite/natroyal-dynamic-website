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

import React from "react";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";

const BannerSlider = ({ settings, slides }) => {
  const enhancedSettings = {
    ...settings,
    beforeChange: () => {}, // Reset any states if needed
  };

  return (
    <Slider {...enhancedSettings}>
      {slides.map((slide, index) => (
        <div key={index} className="slide-container">
          <div className="poster-container">
            {slide.videoUrl ? (
              // If video exists, show video
              <video
                src={`${slide.videoUrl}`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="video-element"
              />
            ) : (
              // If no video, show poster
              <img src={slide.image} alt="Poster" className="poster-image" />
            )}

            {/* Common Banner Content - Placed inside the same container */}
            <div className="banner-text">
              <h1 className="banner-title">{slide.text}</h1>
              <div className="d-flex">
                <NavLink to={slide.url} className="custom-button">
                  Get Started
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default BannerSlider;
