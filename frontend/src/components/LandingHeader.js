import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const [offcanvasVisible, setOffcanvasVisible] = useState(false);

  const toggleOffcanvas = () => {
    setOffcanvasVisible(!offcanvasVisible);
  };

  const closeOffcanvas = () => {
    setOffcanvasVisible(false);
  };

  const location = useLocation();

  return (
    <nav className="navbar landing-navbar">
      <div className="container-fluid d-flex">
        <div className="landing-menu d-flex">
          <NavLink className="navbar-brand" to="/">
            <img src="/images/icons/Natroyal 1.png" alt="logo" />
          </NavLink>

          <div className="landing-company d-flex">
            {location.pathname.includes("/vinyl-flooring", "/lvt") && (
              <NavLink to="/vinyl-flooring" className="company-div">
                <img
                  src="/images/icons/Royal House.png"
                  height={"75px"}
                  width={"120px"}
                  alt="company"
                />
              </NavLink>
            )}
            {location.pathname.includes("/lvt") && (
              <NavLink to="/lvt" className="company-div">
                <img
                  src="/images/icons/Royal House.png"
                  height={"75px"}
                  width={"120px"}
                  alt="company"
                />
              </NavLink>
            )}

            {location.pathname.includes("/royal-touch") && (
              <NavLink to="/" className="company-div">
                <img
                  src="/images/icons/Royal Touch.png"
                  height={"50px"}
                  width={"90px"}
                  alt="company"
                />
              </NavLink>
            )}

            {location.pathname.includes("/seating-components") && (
              <NavLink to="/seating-components" className="company-div">
                <img
                  src="/images/icons/Vijayjyot.png"
                  height={"32px"}
                  width={"120px"}
                  alt="company"
                />
              </NavLink>
            )}

            {location.pathname.includes("/royal-knit") && (
              <NavLink to="/royal-knit" className="company-div">
                <img
                  src="/images/icons/Royal Knit.png"
                  height={"50px"}
                  width={"90px"}
                  alt="company"
                />
              </NavLink>
            )}
          </div>
        </div>

        <button
          className="navbar-toggler d-flex align-items-center justify-content-center"
          type="button"
          onClick={toggleOffcanvas}
        >
          <img src="/images/icons/Group 1 (2).png" alt="navbar-toggle" />
          <h6>Menu</h6>
        </button>

        <div
          className={`offcanvas offcanvas-end ${
            offcanvasVisible ? "show" : ""
          }`}
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <a href="/" className="offcanvas-title" id="offcanvasNavbarLabel">
              <img src="/images/icons/Natroyal 1.png" alt="logo" />
            </a>
            <button
              type="button"
              className="btn-close"
              onClick={closeOffcanvas}
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  onClick={closeOffcanvas}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/about-us"
                  onClick={closeOffcanvas}
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/our-divisions"
                  onClick={closeOffcanvas}
                >
                  Our Divisions
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/contact-us#inquire"
                  onClick={closeOffcanvas}
                >
                  Inquiry
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/contact-us"
                  onClick={closeOffcanvas}
                >
                  Contact Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/lvt"
                  className="company-div mobile-company"
                  onClick={closeOffcanvas}
                >
                  <img
                    src="/images/icons/image 44.png"
                    height={"49.29px"}
                    width={"75px"}
                    alt="company"
                  />
                  <h6>LVT Flooring</h6>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/vinyl-flooring"
                  className="company-div mobile-company"
                  onClick={closeOffcanvas}
                >
                  <img
                    src="/images/icons/image 44.png"
                    height={"49.29px"}
                    width={"75px"}
                    alt="company"
                  />
                  <h6>Vinyl Flooring</h6>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/"
                  className="company-div mobile-company"
                  onClick={closeOffcanvas}
                >
                  <img
                    src="/images/icons/image 45.png"
                    height={"50px"}
                    width={"75px"}
                    alt="company"
                  />
                  <h6>Coated Fabrics</h6>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/seating-components"
                  className="company-div mobile-company"
                  onClick={closeOffcanvas}
                >
                  <img
                    src="/images/icons/image 46.png"
                    height={"32px"}
                    width={"120px"}
                    alt="company"
                  />
                  <h6>Seating Components</h6>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/royal-knit"
                  className="company-div mobile-company"
                  onClick={closeOffcanvas}
                >
                  <img
                    src="/images/icons/image 47.png"
                    height={"50px"}
                    width={"75px"}
                    alt="company"
                  />
                  <h6>Knit Fabrics</h6>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
