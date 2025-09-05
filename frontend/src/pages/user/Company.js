import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import { NavLink, useLocation } from "react-router-dom";
import Clients from "../../components/Clients";
import axios from "axios";

const Company = () => {

  const [division, setDivision] = useState([])

  const location = useLocation();
      const currentPath = location.pathname;

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
          "Natroyal Group Divisions | Coated Fabrics, Vinyl Flooring, Knit Fabrics & Seating Systems",
        description:
          "Explore Natroyal Group’s core divisions: Coated Fabrics, Knit Fabrics, LVT, Vinyl Flooring, and Seating Components. Engineered for industries like automotive, railways, interiors & more",
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

  
  useEffect(() => {
    const fetchDivision = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/division`);
        const DivisionData = response.data.divisions;

        setDivision(DivisionData);
       } catch (error) {
        console.error("Error fetching division:", error);
      } 
    };

    fetchDivision();
  }, []);

  return (
    <Layout>
      <Banner page={currentPath}/>

      <section className="company-section">
        <div className="container-fluid">
          
          {division &&
            division.map((division, index) => (
          <div className="row company-row" key={division._id}>
            <div className="col-lg-12">
              <div className="row mt-5 align-items-center justify-content-center">
                <div
                  className={`col-lg-6 company-bg ${
                    index % 2 !== 0 ? "order-lg-2" : "order-lg-1"
                  }`}
                >
                  <div className="company-img">
                    <img
                      // src="/images/banners/jurre-houtkamp-610ZXDQRt0Y-unsplash.png"
                      src={division.image[0]?.filepath}
                      alt="company-img"
                    />
                    <div className="logo-gray-div">
                      <img src={division.logo[0]?.filepath} alt="logo" />
                      {/* <h2>LVT</h2> */}
                    </div>
                  </div>
                </div>
                <div className={`col-lg-6 ps-lg-5 ps-lg-0 ps-auto pt-lg-0 pt-5 ${
                    index % 2 !== 0 ? "order-lg-1" : "order-lg-2"
                  }`}
                >
                  <div className="companies-content">
                    {/* <h6 className="subtitle">
                      Vinyl Plank & Tiles <span></span>
                    </h6> */}
                    <h2 className="title">
                      <span className="yellow-title">{division.title1}</span> {division.title2}
                    </h2>

                    <p className="paragraph mb-5" dangerouslySetInnerHTML={{ __html: division.content }}>
                    </p>

                    <NavLink
                      to={division.button_url}
                      target="_blank"
                      className="custom-button border-btn"
                    >
                     {division.button}
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
          ))}
        </div>
      </section>

      <Clients />
    </Layout>
  );
};

export default Company;
