import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Banner = ({ page }) => {

   const [banner, setBanner] = useState(null);
  
    useEffect(() => {
      const fetchBanner = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/banner/page${page}`);

          // response.data.banner (not banners[])
          setBanner(response.data.banner);
        } catch (error) {
          console.error("Error fetching Banner:", error);
        }
      };

      fetchBanner();
    }, [page]);
  
    if (!banner) return null;
  
  return (
    <section className="banner-section">
      <div className="row">
        <div className="banner-img p-0">
         { banner.type === "image" ? (
            <img src={banner.banner?.filepath} alt="banner" className="w-100" />
          ) : banner.type === "video" ? (
            <video
              src={banner.banner?.filepath}
              muted
              loop
              autoPlay
              className="w-100"
              height="100%"
              playsInline
              preload="metadata"
            ></video>
         ) : (
              <p>No media available for this page</p>
          )}

          <div className="banner-section-text">
            <div className="container px-lg-0 px-4">
              <h1 className="banner-title section-banner-title">{banner.heading}</h1>
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div
                    className="breadcrumb wow"
                    data-aos="fade-left" // Fade in as you scroll
                    data-aos-duration="1500"
                  >
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                         <li className="breadcrumb-item" aria-current="page">
                              <NavLink to="/">
                                  Home                              
                              </NavLink>
                          </li>
                         <li className="breadcrumb-item">
                              <NavLink to={banner.page}>
                               {banner.heading}
                              </NavLink>
                          </li>
                        
                      </ol>
                    </nav>
                  </div>
                </div>

                {/* <div className="col-lg-6 d-flex justify-content-lg-end justify-content-start">
                  <div className="d-flex">
                    <a href="#" className="custom-button banner-btn">
                      Get Started
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
