import React from "react";
import { NavLink } from "react-router-dom";

const Banner = ({ breadcrumbs, bannerImg, title, bannerVideo }) => {
  
  return (
    <section className="banner-section">
      <div className="row">
        <div className="banner-img p-0">
          {bannerImg ? (
            <img src={bannerImg} alt="banner" className="w-100" />
          ) : (
            <video
              src={`${bannerVideo}`}
              muted
              loop
              autoPlay
              className="w-100"
              height="100%"
              playsInline
              preload="metadata"
            ></video>
          )}

          <div className="banner-section-text">
            <div className="container px-lg-0 px-4">
              <h1 className="banner-title section-banner-title">{title}</h1>
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div
                    className="breadcrumb wow"
                    data-aos="fade-left" // Fade in as you scroll
                    data-aos-duration="1500"
                  >
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        {breadcrumbs.map((breadcrumb, index) => (
                          <li
                            key={index}
                            className={`breadcrumb-item ${
                              breadcrumb.active ? "active" : ""
                            }`}
                            aria-current={
                              breadcrumb.active ? "page" : undefined
                            }
                          >
                            {breadcrumb.active ? (
                              breadcrumb.label
                            ) : (
                              <NavLink to={breadcrumb.path}>
                                {breadcrumb.label}
                              </NavLink>
                            )}
                          </li>
                        ))}
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
