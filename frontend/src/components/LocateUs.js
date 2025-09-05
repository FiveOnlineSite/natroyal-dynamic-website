import React from "react";
import { NavLink } from "react-router-dom";

const LocateUs = () => {
  return (
    <section className="locate-section">
      <div className="container">
        <div className="subdivision-div">
          <h6 className="subtitle text-center">
            Find Us Here <span></span>
          </h6>
          <h2 className="title new-title">
            {" "}
            <span className="yellow-title">Locate</span> Us
          </h2>

          <p className="paragraph">
            Visit us at our location for personalized assistance and to explore
            our products. We look forward to welcoming you!
          </p>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-lg-10 ">
            <div className="row justify-content-center">
              <div className="col-lg-6 ">
                <div className="location">
                  <div className="location-title">
                    <h5>Mumbai</h5>
                    <img src="/images/icons/image 64.png" alt="location" />
                  </div>

                  <p className="paragraph">
                    60 CD Shlok, Government Industrial Estate, Charkop,
                    Kandivali West, Mumbai 400 067.
                  </p>

                  <NavLink
                    to="https://maps.app.goo.gl/85RC6CoSMz19U3an8"
                    target="_blank"
                    className="custom-button no-border-btn p-0"
                  >
                    Get Direction
                    <img
                      src="/images/icons/arrow-up-right.png"
                      className="ps-2"
                      alt="arrow"
                    />
                  </NavLink>
                </div>
              </div>

              <div className="col-lg-6 mt-lg-0 mt-5">
                <div className="location">
                  <div className="location-title">
                    <h5>Vadodara</h5>
                    <img src="/images/icons/image 66.png" alt="location" />
                  </div>

                  <p className="paragraph">
                    Plot No 318/319, Halol Vadodara Road, Village Baska,taluka-
                    Halol, Panchmahals, Gujarat, 389350
                  </p>

                  <NavLink
                    to="https://maps.app.goo.gl/tPSLYmAjTbS8DGKC6"
                    target="_blank"
                    className="custom-button no-border-btn p-0"
                  >
                    Get Direction
                    <img
                      src="/images/icons/arrow-up-right.png"
                      className="ps-2"
                      alt="arrow"
                    />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocateUs;
