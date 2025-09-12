import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { NavLink } from "react-router-dom";

const Laboratory = () => {
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
          "Innovative Research & Product Development | Coated Fabrics & Vinyl Solutions – Natroyal India",
        description:
          "Natroyal’s R&D team leads innovation in coated fabrics, artificial leather, faux leather, and sustainable materials. Engineered for performance, safety, and durability across industries in India.",
        keyword:
          "coated fabrics R&D India, Natroyal product innovation, synthetic leather development, faux leather R&D, vinyl flooring innovation, sustainable material research India, industrial textile innovation, coated fabric research and development, eco-friendly manufacturing India, advanced materials innovation",
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
              src="/images/coated-fabrics/R&D 5.png"
              // src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286117/R_D_5_f6jjyy.png"
              alt="Poster"
              className="poster-image"
            />

            {/* Common Banner Content - Placed inside the same container */}
            <div className="banner-text">
              {/* <h1 className="banner-title">
                {" "}
                We are India’s leading manufacturers & exporters of Specifically
                Engineered Coated Fabrics
              </h1> */}
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

      <section className="about-knit-section">
        <div className="container">
          <div className="row align-items-start justify-content-center">
            <div className="col-lg-10 mt-lg-0 mt-4">
              {/* <h6 className="subtitle">
                Knit Fabric – Where Flexibility Meets Comfort<span></span>
              </h6> */}
              <h2 className="title new-title">
                <span className="yellow-title"> Laboratory Tested</span> for
                Consistency & Durability
              </h2>
              <p className="paragraph">
                Natroyal Industries is committed to supply best-in-class
                leatherette materials that meet OEM specifications. With decades
                of experience and an unwavering commitment to excellence, we
                have built a trusted reputation for delivering superior
                leatherette solutions that combine style, durability and
                environmental responsibility, establishing ourselves as a leader
                in the Indian leatherette industry.
              </p>
              <p className="paragraph">
                As a trusted, long-standing leader and OEM- approved supplier of
                high-quality leatherette (coated fabrics), we serve a wide range
                of OEMs both in India and international markets. Our
                automotive-grade leatherette and coated fabrics are known for
                their exceptional durability and unique properties, ensuring
                long-lasting performance and superior quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="laboratory-gallery-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mt-lg-0 mt-4">
              <img
                src="/images/laboratory/img7 1.png"
                alt="laboratory-img"
                className="w-100"
              />
              <p className="text-center">Wyzenbeek Abrasion Test</p>
            </div>
            <div className="col-lg-4 mt-lg-0 mt-3">
              <img
                src="/images/laboratory/img9 1.png"
                alt="laboratory-img"
                className="w-100"
              />
              <p className="text-center">Wire abrasion test</p>
            </div>
            <div className="col-lg-4 mt-lg-0 mt-3">
              <img
                src="/images/laboratory/img8 1.png"
                alt="laboratory-img"
                className="w-100"
              />
              <p className="text-center">
                Taber abrasion and Color Matching Booth
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2 mt-lg-5 mt-3">
              <img
                src="/images/laboratory/img10 1.png"
                alt="laboratory-img"
                className="w-100"
              />
              <p className="text-center">Tensile Tester</p>
            </div>
            <div className="col-lg-4 mt-lg-5 mt-3">
              <img
                src="/images/laboratory/img12 1.png"
                alt="laboratory-img"
                className="w-100"
              />
              <p className="text-center">Bally Flexing Test</p>
            </div>
            <div className="col-lg-4 mt-lg-5 mt-3">
              <img
                src="/images/laboratory/image007.png"
                alt="laboratory-img"
                className="w-100"
              />
              <p className="text-center">Pilot Coating Machine</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Laboratory;
