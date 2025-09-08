import React, { useEffect } from "react";
import LandingLayout from "../../components/LandingLayout";
import BannerSlider from "../../components/BannerSlider";
import ConnectSection from "../../components/ConnectSection";
import Clients from "../../components/Clients";
import TextilesSlider from "../../components/TextilesSlider";
import { NavLink, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import LandingBanner from "../../components/LandingBanner";
import axios from "axios";
import { useState } from "react";

const RoyalKnit = () => {

  const location = useLocation();
      const currentPath = location.pathname;

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="slick-prev custom-arrow" onClick={onClick}>
        <img src="/images/icons/Group 5 (1).png" alt="left-arrow" />
      </button>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="slick-next custom-arrow" onClick={onClick}>
        <img src="/images/icons/Group 6 (1).png" alt="right-arrow" />
      </button>
    );
  };

  const OfferingsPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="slick-prev custom-arrow" onClick={onClick}>
        <img src="/images/icons/Group 905.png" alt="left-arrow" />
      </button>
    );
  };

  const OfferingsNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="slick-next custom-arrow" onClick={onClick}>
        <img src="/images/icons/Group 906.png" alt="right-arrow" />
      </button>
    );
  };



  const textilesSettings = {
    dots: false,
    nextArrow: <OfferingsNextArrow />,
    prevArrow: <OfferingsPrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: false,
    // autoplay: true,
    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
          "Knit Fabric Manufacturer in India | Circular & Warp Knitted Fabrics Exporter to USA, UK, Germany & South Africa",
        description:
          "Natroyal is a leading knit fabric manufacturer in India, exporting circular and warp-knitted fabrics, headliners, lamination, and high-tenacity fabrics to the USA, UK, Germany, and South Africa.",
        keyword:
          "knit fabric manufacturer India, circular knitted fabric exporter, warp knit fabric supplier, headliner fabrics, circular knitted fabrics, warp knitted fabrics, fire retardant fabrics, water repellent fabrics, anti-bacterial fabrics, recycled fabrics, high tenacity fabrics, automotive lamination fabrics, knitted textiles for USA, UK, Germany, South Africa, industrial knit fabrics, apparel knit fabric India, upholstery knit fabric, automotive knit fabrics, knitted polyester fabric, global fabric exporters India",
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


    const [knitAbout, setKnitAbout] = useState([])

  useEffect(() => {
      const fetchKnitAbout = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/knit-about`);
          const knitAboutData = response.data.knitAbout;
  
          setKnitAbout(knitAboutData);
        } catch (error) {
          console.error("Error fetching knit about:", error);
        } 
      };
  
      fetchKnitAbout();
    }, []);

  return (
    <Layout>

      <LandingBanner page={currentPath}/>

      <section className="about-knit-section">
        <div className="container">
          <div className="row align-items-start justify-content-center">
             {knitAbout && knitAbout.map((about) => (
            <div className="col-lg-10 mt-lg-0 mt-4">
              <h6 className="subtitle">
                {about.subtitle}<span></span>
              </h6>
              <h2 className="title">
                <span className="yellow-title"> {about.title1}</span> {about.title2}
              </h2>

              <div
                className="paragraph"
                dangerouslySetInnerHTML={{ __html: about.content }}
              ></div>
              
            </div>
             ))}
          </div>
        </div>
      </section>

      <section className="production-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img
                // src="/images/banners/Products For Lamination 2.png"
                src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277323/Products_For_Lamination_2_lt7kkt.png"
                alt="about-knit-img"
                className="w-100"
              />
            </div>
            <div className="col-lg-6 mt-lg-0 mt-4">
              <div className="about-knit-content">
                <div className="company-points">
                  <h5>
                    <span className="yellow-title"> Our </span> Production
                    Facilities / Capacity{" "}
                  </h5>
                  <div className="company-point">
                    <i className="lni lni-arrow-right"></i>
                    <p>
                      High speed Circular knitting machines (German & American
                      make)
                    </p>
                  </div>
                  <div className="company-point">
                    <i className="lni lni-arrow-right"></i>
                    <p>
                      All Circular knitting machines are equipped with fabric
                      scanners
                    </p>
                  </div>
                  <div className="company-point">
                    <i className="lni lni-arrow-right"></i>
                    <p>High speed Wrap knitting machines of Karl Mayer make</p>
                  </div>
                  <div className="company-point">
                    <i className="lni lni-arrow-right"></i>
                    <p>
                      Customised Heat-set machines with dry & wet processing
                    </p>
                  </div>
                  <div className="company-point">
                    <i className="lni lni-arrow-right"></i>
                    <p>
                      Steaming on Heat-set machines provides more uniformity in
                      heat-setting of fabrics
                    </p>
                  </div>
                  <div className="company-point">
                    <i className="lni lni-arrow-right"></i>
                    <p>
                      Continuous process on Heat-set machine minimises defects
                    </p>
                  </div>
                  <div className="company-point">
                    <i className="lni lni-arrow-right"></i>
                    <p>Well established laboratory & testing equipment</p>
                  </div>
                  <div className="company-point">
                    <i className="lni lni-arrow-right"></i>
                    <p>Current production capacity is 300 tons per month</p>
                  </div>
                  <div className="company-point mb-3">
                    <i className="lni lni-arrow-right"></i>
                    <p>
                      Exporting to the USA, Europe, African and Asian countries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="usp-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mt-lg-0 mt-4 order-lg-1 order-2">
              <div className="about-knit-content">
                <div className="company-points">
                  <h5>
                    <span className="yellow-title"> Our</span> USP
                  </h5>
                  <div className="company-point">
                    <i className="lni lni-arrow-right"></i>
                    <p>Roll Length: Upto 10,000 mtrs.</p>
                  </div>
                  <div className="company-point">
                    <i className="lni lni-arrow-right"></i>
                    <p>Roll Diameter: Upto 1.5 mtrs.</p>
                  </div>

                  <div className="company-point mb-5">
                    <i className="lni lni-arrow-right"></i>
                    <p>Roll Width: Upto 240 cms.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 order-lg-2 order-1">
              <img
                // src="/images/banners/Roll Image[1][1].jpg"
                src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277330/Roll_Image_1_1_yllw8t.jpg"
                alt="about-knit-img"
                className="w-100"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="advanced-technical-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="advanced-title-div d-flex flex-column align-items-center justify-content-center">
              <h6 className="subtitle text-center">
                Cutting-Edge Textile Technologies<span></span>
              </h6>
              <h2 className="title text-center">
                <span className="yellow-title"> Advanced</span> Technical
                Textiles
              </h2>
            </div>

            <TextilesSlider settings={textilesSettings} />
          </div>
        </div>
      </section>

      <section className="knit-application-section">
        <div className="container">
          <div className="row">
            <div className="custom-col">
              <div className="knit-application-div">
                <div className="knit-img-div">
                  <img src="/images/icons/car.png" alt="icons" />
                </div>
                <h6>Automotive Industry</h6>
              </div>
            </div>
            <div className="custom-col">
              <div className="knit-application-div">
                <div className="knit-img-div">
                  <img src="/images/icons/layers.png" alt="icons" />
                </div>
                <h6>Coating & Lamination</h6>
              </div>
            </div>
            <div className="custom-col">
              <div className="knit-application-div">
                <div className="knit-img-div">
                  <img src="/images/icons/first-aid-kit.png" alt="icons" />
                </div>
                <h6>Health Care</h6>
              </div>
            </div>
            <div className="custom-col">
              <div className="knit-application-div">
                <div className="knit-img-div">
                  <img src="/images/icons/hanger.png" alt="icons" />
                </div>
                <h6>Protective Clothing</h6>
              </div>
            </div>
            <div className="custom-col">
              <div className="knit-application-div">
                <div className="knit-img-div">
                  <img src="/images/icons/shoe.png" alt="icons" />
                </div>
                <h6>Footwear Industry</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConnectSection />

      <Clients />
    </Layout>
  );
};

export default RoyalKnit;
