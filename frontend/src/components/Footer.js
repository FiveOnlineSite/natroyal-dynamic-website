import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location]); // Dependency on location ensures it runs whenever the route changes

  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h2>Let’s Build Something Great Together</h2>
          </div>
          <div className="col-lg-6 d-flex justify-content-lg-end justify-content-start mt-lg-0 mt-5">
            <div className="quick-links">
              <ul>
                <li>
                  <NavLink to="/about-us">About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/our-divisions">Our Divisions</NavLink>
                </li>
                <li>
                  <NavLink to="/contact-us">Contact Us</NavLink>
                </li>
                {/* <li>
                  <NavLink to="/contact-us#inquire">Inquiry</NavLink>
                </li> */}
              </ul>
            </div>
          </div>
        </div>

        <div className="row corporate-office pb-5">
          <div className="col-lg-4 mt-lg-0 mt-4">
            <div className="footer-div pt-lg-4 pt-0">
              <h6>Corporate Office – Mumbai</h6>
              <NavLink
                to="https://maps.app.goo.gl/85RC6CoSMz19U3an8"
                target="_blank"
                className="m-0 address-para"
              >
                60 CD Shlok, Government Industrial Estate, Charkop, Kandivali
                West, Mumbai - 400067, INDIA
              </NavLink>
              <p className="d-flex mt-3">
                <b>Tel: </b>
                <span>
                  <NavLink
                    to="tel:+91-22-28603516"
                    className="mx-2 yellow-link d-inline-flex"
                  >
                    {" "}
                    +91-22-28603516
                  </NavLink>
                  /
                  <NavLink
                    to="tel:+91-22-28603514"
                    className="mx-2 yellow-link d-inline-flex"
                  >
                    {" "}
                    +91-22-28603514
                  </NavLink>
                </span>
              </p>{" "}
              <p className="d-flex">
                <b>Website : </b>
                <span className="d-flex">
                  <a
                    href="https://www.natroyalgroup.com/"
                    target="_blank"
                    className="d-flex ms-2 yellow-link"
                    rel="noreferrer"
                  >
                    {" "}
                    www.natroyalgroup.com
                  </a>
                </span>
              </p>{" "}
              <p className="d-flex">
                <b>Mail: </b>
                <span className="d-flex">
                  <NavLink
                    to="mailto:contact@natroyalgroup.com"
                    className="d-flex ms-2 yellow-link"
                  >
                    {" "}
                    contact@natroyalgroup.com
                  </NavLink>
                </span>
              </p>{" "}
            </div>
          </div>

          <div className="col-lg-4 px-lg-4 px-auto pt-lg-0 pt-4">
            <div className="footer-div pt-lg-4 pt-0">
              {/* <p>
                Plant for Coated Fabrics, Seating Components, and Knit Fabrics –
                Vadodara
              </p> */}
              <h6>Natroyal Industries Private Limited</h6>
              <NavLink
                to="https://maps.app.goo.gl/zNNRkD5UeBJJHEnR7"
                target="_blank"
                className="m-0 address-para"
              >
                Plot No. 318/319, Village Baska, Takula - Halol, District -
                Panchmahal, Gujarat - 389350, INDIA
              </NavLink>
              <p className="d-flex mt-3">
                <b>Tel: </b>
                <span>
                  <NavLink
                    to="tel:+91-2676-616100"
                    className="mx-2 yellow-link d-inline-flex"
                  >
                    {" "}
                    +91-2676-616100
                  </NavLink>
                  /
                  <NavLink
                    to="tel:+91-2676-616117"
                    className="mx-2 yellow-link d-inline-flex"
                  >
                    {" "}
                    +91-2676-616117
                  </NavLink>
                  /
                  <NavLink
                    to="tel:+91-2676-616118"
                    className="mx-2 yellow-link d-inline-flex"
                  >
                    {" "}
                    +91-2676-616118
                  </NavLink>
                </span>
              </p>{" "}
            </div>
          </div>

          <div className="col-lg-4 pt-lg-0 pt-4">
            {" "}
            <div className="footer-div pt-lg-4 pt-0">
              {/* <p>Flooring Manufacturing Facility – Vadodara</p>{" "} */}
              <h6>Royal Cushion Vinyl Products Ltd.</h6>{" "}
              <NavLink
                to="https://maps.app.goo.gl/whk8aryvUaS4TGQo9"
                target="_blank"
                className="m-0 address-para"
              >
                <p className="d-flex">
                  Plot no. 55, Village - Garadhia, Taluka - Savli,
                  <br />
                  District – Vadodara, Gujarat – 391520, INDIA
                </p>
              </NavLink>
              <p className="d-flex mt-3">
                <b>Tel: </b>
                <span>
                  <NavLink
                    to="tel:+91-8156004820"
                    className="mx-2 yellow-link d-inline-flex"
                  >
                    {" "}
                    +91-8156 004820
                  </NavLink>
                  {/* /
                  <NavLink
                    to="tel:+91-8156004821"
                    className="mx-2 yellow-link d-inline-flex"
                  >
                    {" "}
                    +91-8156 004821
                  </NavLink> */}
                </span>
              </p>{" "}
            </div>
          </div>
        </div>

        <div className="row copyright-row align-items-center">
          <div className="col-lg-6">
            <ul className="social-media">
              <li>
                <NavLink
                  to="https://www.facebook.com/NatroyalGroup/"
                  target="_blank"
                >
                  <i class="fa-brands fa-facebook-f fb-logo"></i>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://www.instagram.com/natroyalgroup/?hl=en"
                  target="_blank"
                >
                  <i class="fa-brands fa-instagram instagram-logo"></i>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://www.linkedin.com/company/natroyal-group"
                  target="_blank"
                >
                  <i class="fa-brands fa-linkedin-in linkedin-logo"></i>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://www.youtube.com/@NatroyalGroup"
                  target="_blank"
                >
                  <i class="fa-brands fa-youtube youtube-logo"></i>
                </NavLink>
              </li>
              <li>
                <NavLink to="https://x.com/NatroyalGroup" target="_blank">
                  <i class="fa-brands fa-x-twitter"></i>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-lg-6 d-flex justify-content-lg-end justify-content-start">
            <p className="paragraph">
              © 2025 Natroyal Group | All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
