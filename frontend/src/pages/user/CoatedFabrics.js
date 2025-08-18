import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { NavLink } from "react-router-dom";
import Clients from "../../components/Clients";
import ConnectSection from "../../components/ConnectSection";

const CoatedFabrics = () => {
  useEffect(() => {
    const fetchMetaTag = async () => {
      // Canonical URL logic
      const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute("href", canonicalUrl);
      } else {
        linkCanonical = document.createElement("link");
        linkCanonical.rel = "canonical";
        linkCanonical.href = canonicalUrl;
        document.head.appendChild(linkCanonical);
      }

      // 💡 Set static meta tags BEFORE the fetch
      const defaultMeta = {
        title:
          "Faux Leather & Artificial Leather Manufacturer | Premium Coated Fabrics for Automotive & Upholstery – Natroyal",
        description:
          "Discover premium faux leather, artificial leather, and coated fabrics for automotive, marine, furniture, and contract upholstery. Natroyal is a trusted supplier to clients in India, USA, and UK. Durable, stylish, and sustainable solutions.",
        keyword:
          "faux leather manufacturer, artificial leather supplier, coated fabric manufacturer India, synthetic leather, PVC leather, PU leather, marine vinyl fabric, automotive upholstery material, leatherette fabric, faux leather for car seats, artificial leather rolls, contract upholstery fabric, vinyl coated textiles, eco-friendly leather substitute",
      };

      // Add meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", defaultMeta.description);

      // Add meta keywords
      let metaKeyword = document.querySelector('meta[name="keywords"]');
      if (!metaKeyword) {
        metaKeyword = document.createElement("meta");
        metaKeyword.name = "keywords";
        document.head.appendChild(metaKeyword);
      }
      metaKeyword.setAttribute("content", defaultMeta.keyword);

      document.title = defaultMeta.title;
    };
    console.log(document.querySelector('meta[name="description"]').content);
    fetchMetaTag();
  }, []);

  return (
    <Layout>
      <section className="landing-banner-section">
        <div className="slide-container">
          <div className="poster-container">
            <img
              // src="/images/coated-fabrics/Royal-Touch-Coated-Fabrics.jpg"
              src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286120/Royal-Touch-Coated-Fabrics_cnxbzo.jpg"
              alt="Poster"
              className="poster-image"
            />

            {/* Common Banner Content - Placed inside the same container */}
            <div className="banner-text">
              <h1 className="banner-title">
                {" "}
                We are India’s leading manufacturers & exporters of Specifically
                Engineered Coated Fabrics
              </h1>
              {/* <div className="d-flex">
                <NavLink to="/contact-us" className="custom-button">
                  Get Started
                </NavLink>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="applications-section">
        <div className="container">
          <div className="row">
            <ul className="application-tabs d-flex align-items-center justify-content-center">
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/coated-fabrics">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/awards-and-recognition">
                  Awards & Recognition
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/research-and-development">
                  Research & Development (R&D)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="application-section">
        <div className="container">
          <h2 className="title new-title text-center">
            <span className="yellow-title"> We manufacture,</span> supply and
            export
          </h2>
          <div className="row applications-row mt-5">
            <div className="col-lg-6">
              <NavLink to="/coated-fabrics/automotive">
                <div className="single-application">
                  <img
                    // src="/images/coated-fabrics/Group 1 (2).png"
                    src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751347690/Group_1_2_i0ipxm.png"
                    alt="coated"
                  />{" "}
                  <div className="application-content">
                    <h5>Automotive</h5>
                    {/* <p className="application-para">
                      Natroyal leads in performance-coated fabrics for cars,
                      buses, and motorcycles. We are India's first to develop
                      phase-change material for heat management.
                    </p> */}
                  </div>
                  <div className="application-overlay">
                    <div className="application-border">
                      <NavLink to="/coated-fabrics/automotive">
                        View More
                      </NavLink>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-lg-6">
              <NavLink to="/coated-fabrics/truck">
                <div className="single-application">
                  <img
                    // src="/images/coated-fabrics/Truck.jpg"
                    src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286126/Truck_eo8d7o.jpg"
                    alt="coated"
                  />{" "}
                  <div className="application-content">
                    <h5>Truck</h5>
                    {/* <p className="application-para">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </p> */}
                  </div>
                  <div className="application-overlay">
                    <div className="application-border">
                      <NavLink to="/coated-fabrics/truck">View More</NavLink>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-lg-6">
              <NavLink to="/coated-fabrics/tractor">
                <div className="single-application">
                  <img
                    //  src="/images/coated-fabrics/Tractor.jpg"
                    src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286122/Tractor_ljpxrf.jpg"
                    alt="coated"
                  />{" "}
                  <div className="application-content">
                    <h5>Tractor</h5>
                    {/* <p className="application-para">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </p> */}
                  </div>
                  <div className="application-overlay">
                    <div className="application-border">
                      <NavLink to="/coated-fabrics/tractor">View More</NavLink>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-lg-6">
              <NavLink to="/coated-fabrics/golf-cart">
                <div className="single-application">
                  <img
                    // src="/images/coated-fabrics/Golf cart - Final.jpg"
                    src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286094/Golf_cart_-_Final_eqszll.jpg"
                    alt="coated"
                  />{" "}
                  <div className="application-content">
                    <h5>Golf Cart</h5>
                    {/* <p className="application-para">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </p> */}
                  </div>
                  <div className="application-overlay">
                    <div className="application-border">
                      <NavLink to="/coated-fabrics/golf-cart">
                        View More
                      </NavLink>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-lg-6">
              <NavLink to="/coated-fabrics/marine-recreational-vehicles">
                <div className="single-application">
                  <img
                    // src="/images/coated-fabrics/Marine DP.png"
                    src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286111/Marine_DP_hvfisw.png"
                    alt="coated"
                  />{" "}
                  <div className="application-content">
                    <h5>Marine & Recreational Vehicles</h5>
                    {/* <p className="application-para">
                      Our coated fabrics for the marine industry have been
                      designed based on extensive research, for them to easily
                      endure the harsh conditions present on both commercial as
                      well as recreational vessels.
                    </p> */}
                  </div>
                  <div className="application-overlay">
                    <div className="application-border">
                      <NavLink to="/coated-fabrics/marine-recreational-vehicles">
                        View More
                      </NavLink>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-lg-6 col-12">
              <NavLink to="/coated-fabrics/residential-contract-furnishing">
                <div className="single-application">
                  <img
                    // src="/images/coated-fabrics/Residential & Contract Furnishing.jpg"
                    src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286121/Residential_Contract_Furnishing_afz1y4.jpg"
                    alt="application"
                  />

                  <div className="application-content">
                    <h5>Residential & Contract Furnishing</h5>

                    {/* <p className="application-para">
                      Natroyal has been a pioneer in the business of supplying
                      performance-based coated fabrics for the home, office &
                      contract furnishing.
                    </p> */}
                  </div>

                  <div className="application-overlay">
                    <div className="application-border">
                      <NavLink to="/coated-fabrics/residential-contract-furnishing">
                        View More
                      </NavLink>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-lg-6">
              <NavLink to="/coated-fabrics/two-wheelers">
                <div className="single-application">
                  <img
                    // src="/images/coated-fabrics/Group 2 (1).png"
                    src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751347690/Group_2_1_eataug.png"
                    alt="coated"
                  />{" "}
                  <div className="application-content">
                    <h5>Two Wheelers</h5>
                    {/* <p className="application-para">
                      Natroyal offers innovative two-wheeler seat covers,
                      including heat-management and stylish options like Seat
                      Tops, Bamboo Tops, and Emboss Tops in various prints.
                    </p> */}
                  </div>
                  <div className="application-overlay">
                    <div className="application-border">
                      <NavLink to="/coated-fabrics/two-wheelers">
                        View More
                      </NavLink>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-lg-6">
              <NavLink to="/coated-fabrics/healthcare">
                <div className="single-application">
                  <img
                    // src="/images/coated-fabrics/Hospital Bed AI.png"
                    src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286096/Hospital_Bed_AI_buthbi.png"
                    alt="coated"
                  />{" "}
                  <div className="application-content">
                    <h5>Healthcare</h5>
                    {/* <p className="application-para">
                      We pioneered SITRA, Intertek, and Valtris UK-certified
                      healthcare products in India, including washable aprons,
                      curtains, and pillow covers, reducing medical waste.
                    </p> */}
                  </div>
                  <div className="application-overlay">
                    <div className="application-border">
                      <NavLink to="/coated-fabrics/healthcare">
                        View More
                      </NavLink>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-lg-6">
              <NavLink to="/coated-fabrics/fashion">
                <div className="single-application">
                  <img
                    // src="/images/coated-fabrics/Apparel.jpeg"
                    src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286093/Apparel_hoyuqb.jpg"
                    alt="coated"
                  />{" "}
                  <div className="application-content">
                    <h5>Fashion – Apparel, Belts & Bags</h5>

                    {/* <p className="application-para">
                      Coated fabrics possess a variety of functional qualities,
                      making them the ideal material for fashion products.
                      Natroyal provides best-in-class coated fabrics for a wide
                      range of fashion accessories including apparel, belts &
                      bags.
                    </p> */}
                  </div>
                  <div className="application-overlay">
                    <div className="application-border">
                      <NavLink to="/coated-fabrics/fashion">View More</NavLink>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-lg-6">
              <NavLink to="/coated-fabrics/footwear">
                <div className="single-application">
                  <img
                    // src="/images/coated-fabrics/Footwear 1.jpg"
                    src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286094/Footwear_1_hz3sae.jpg"
                    alt="coated"
                  />{" "}
                  <div className="application-content">
                    <h5>Footwear</h5>
                    {/* <p className="application-para">
                      With a special range of coated fabrics that have been
                      meticulously designed to fulfill the distinct requirements
                      of the footwear industry, Natroyal has emerged as a
                      leading brand in the market for all our footwear products.
                    </p> */}
                  </div>
                  <div className="application-overlay">
                    <div className="application-border">
                      <NavLink to="/coated-fabrics/footwear">View More</NavLink>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2 className="title new-title">
                {" "}
                <span className="yellow-title"> Features of</span> Automotive
                Leatherette/Coated Fabrics
              </h2>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-2 col-md-4 col-6">
              <div className="features-div">
                <img src="/images/icons/Asset 3Logo 1.png" alt="icons" />
                <h6>Heavy Metals Free</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="features-div">
                <img src="/images/icons/Asset 8Logo.png" alt="icons" />
                <h6>Anti-Fogging</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="features-div">
                <img src="/images/icons/Asset 11Logo.png" alt="icons" />
                <h6>Anti-Microbial</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="features-div">
                <img src="/images/icons/Asset 11Logo.png" alt="icons" />
                <h6>Cold Crack Resistant</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="features-div">
                <img src="/images/icons/Asset 17Logo.png" alt="icons" />
                <h6>Flame Retardant</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="features-div">
                <img src="/images/icons/Asset 5Logo.png" alt="icons" />
                <h6>Abrasion Resistant</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="features-div">
                <img src="/images/icons/Asset 7Logo.png" alt="icons" />
                <h6>High Flexing</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="features-div">
                <img src="/images/icons/Asset 12Logo.png" alt="icons" />
                <h6>Salt Water Resistant</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="features-div">
                <img src="/images/icons/Asset 15Logo.png" alt="icons" />
                <h6>UV Resistant</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="features-div">
                <img src="/images/icons/Asset 16Logo.png" alt="icons" />
                <h6>Weather Resistant</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="features-div">
                <img src="/images/icons/Asset 4Logo.png" alt="icons" />
                <h6>Mildew Resistant</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="features-div">
                <img src="/images/icons/Asset 6Logo.png" alt="icons" />
                <h6>Alcohol Resistant</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="features-div">
                <img src="/images/icons/Asset 10Logo.png" alt="icons" />
                <h6>Pink Stain Resistant</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="features-div">
                <img src="/images/icons/Asset 13Logo.png" alt="icons" />
                <h6>Color Fastness</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="business-section">
        <div className="container">
          <h2 className="title new-title">
            {" "}
            <span className="yellow-title"> We are a </span>export-ready
            business
          </h2>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-4">
              <div className="business-points">
                <img
                  src="/images/icons/Group 869 1.png"
                  alt="icons"
                  className="mb-3"
                />
                <h5>Star rated export</h5>{" "}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-4">
              <div className="business-points">
                <img
                  src="/images/icons/Group 868 1.png"
                  alt="icons"
                  className="mb-3"
                />
                <h5>3-4 Weeks time</h5>{" "}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-4">
              <div className="business-points">
                <img
                  src="/images/icons/Group 867 1.png"
                  alt="icons"
                  className="mb-3"
                />
                <h5>60+ Years of legacy</h5>{" "}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-4">
              <div className="business-points">
                <img
                  src="/images/icons/Group 866 1.png"
                  alt="icons"
                  className="mb-3"
                />
                <h5>International quality</h5>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Clients />

      <ConnectSection />
    </Layout>
  );
};

export default CoatedFabrics;
