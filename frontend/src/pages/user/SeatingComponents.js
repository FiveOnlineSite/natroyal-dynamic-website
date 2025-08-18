import React, { useEffect } from "react";
import LandingLayout from "../../components/LandingLayout";
import BannerSlider from "../../components/BannerSlider";
import Clients from "../../components/Clients";
import ConnectSection from "../../components/ConnectSection";
import Layout from "../../components/Layout";
import { NavLink } from "react-router-dom";

const SeatingComponents = () => {
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

  const bannerSettings = {
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const bannerData = [
    // {
    //   videoUrl: "/videos/1475160_People_Family_3840x2160.mp4",
    //   // poster: "/images/banners/pexels-digitalbuggu-218535.png",
    //   text: "Your Trusted Partner for Innovative and End-to-End Seating Solutions",
    // },
    {
      // videoUrl: "/videos/vecteezy_large-room-in-tropical-style_2018008.mov",
      image: "/images/banners/915ef78d-373e-4a98-a10e-b0d0287e6f98.jpg",
      text: "Your Trusted Partner for Innovative and End-to-End Seating Solutions",
    },

    {
      // videoUrl: "/videos/vecteezy_large-room-in-tropical-style_2018008.mov",
      image: "/images/banners/pexels-ammy-k-106103999-12369543.png",
      text: "Premium Coated Fabrics – Durable, Stylish, and Made to Last!",
    },
    {
      // videoUrl: "/videos/1103522677-preview.mp4",
      image: "/images/banners/pexels-la-son-211137-4004373.png",
      text: " Comfort Meets Innovation – Explore Our Premium Seating Components!",
    },
    {
      // videoUrl: "/videos/1103522677-preview.mp4",
      image: "/images/banners/bigbannernew2.png",
      text: "Where Softness Meets Strength – Premium Knitted Fabrics for Every Need!",
    },
  ];

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
          "Seating Components Manufacturer in India | PU Foam, Metal Frames & Upholstery for Automotive & Auditorium",
        description:
          "Natroyal is a leading manufacturer of seating components in India – including metal seat frames, PU molded foam, and upholstery for metro, bus, car, cinema, and auditorium seating systems.",
        keyword:
          "seating components India, PU foam seat manufacturer, metal seat frame supplier, automotive seat components, auditorium seating parts, bus seat frames, car seat foam, upholstered seating solutions, metro seating manufacturers, trim covers for seats, molded foam supplier India, OEM seating solutions India",
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
      {/* <section className="landing-banner-section">
        <BannerSlider
          settings={bannerSettings}
          slides={bannerData}
        ></BannerSlider>
      </section> */}

      <section className="landing-banner-section">
        <div className="slide-container">
          <div className="poster-container">
            <video
              // src="/videos/WhatsApp Video 2025-03-28 at 16.22.51.mp4"
              src="https://res.cloudinary.com/dcmdihrzp/video/upload/v1751279368/WhatsApp_Video_2025-03-28_at_16.22.51_o93p1h.mp4"
              alt="Poster"
              className="poster-image"
              loop
              muted
              playsInline
              preload="metadata"
              autoPlay
            />

            {/* Common Banner Content - Placed inside the same container */}
            <div className="banner-text">
              <h1 className="banner-title">
                {" "}
                Your Trusted Partner for Innovative and End-to-End Seating
                Solutions
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
                <NavLink
                  className="nav-link"
                  to="/seating-components/railway-metro"
                >
                  Railway/Metro
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link"
                  to="/seating-components/driver-seats"
                >
                  Driver Seats
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/seating-components/bus">
                  Bus
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/seating-components/cinema">
                  Cinema
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="seating-components-section">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6">
              <img
                // src="/images/banners/design-to-delivery.png"
                src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277235/design-to-delivery_dqzp30.png"
                alt="seating-img"
                className="w-100"
              />
            </div>
            <div className="col-lg-6">
              <div className="seating-content">
                <h2 className="title new-title">
                  <span className="yellow-title"> Seats - </span> Design to
                  Delivery.
                </h2>

                <p className="paragraph gray-para">
                  Our seating components division is a leading manufacturer of
                  components for metro, bus, car, cinema, and auditorium seats.
                  The product line includes the fabrication of metal frames (MS,
                  Aluminium and SS), polyurethane (PU) foam, and upholstery/trim
                  covers. We also manufacture and supply fully assembled seats.
                </p>

                <p className="paragraph gray-para">
                  Our seating components division provides a one-stop solution
                  for customers, from design inception and prototype samples to
                  product development and commercial supplies. Our facilities
                  include a design centre, tool room, weld shop, and advanced
                  technology such as multi-axis bending machines, cutting and
                  sewing machines, and PU machines. We comply with the latest EN
                  standards for components (Frames, Trims, and PU). The plant is
                  located in Halol, near Vadodara, in the state of Gujarat,
                  India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seating-application-section">
        <div className="container">
          <div className="row">
            <h2 className="title new-title">
              <span className="yellow-title"> Applications </span> For
            </h2>
          </div>

          <div className="row">
            <div className="col-lg-6 mt-lg-0 mt-5">
              <NavLink to="/seating-components/railway-metro">
                <img
                  // src="/images/seating/railway-metro.png"
                  src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751355053/railway-metro_fzpded.png"
                  alt="seating-application"
                  className="seating-img"
                />

                <h4>Railway/Metro</h4>

                <p className="paragraph gray-para mt-4">
                  We specialize in manufacturing and supplying for the railways
                  and metro seat segment. Offering complete solutions from
                  design and proto sample development to testing, tooling, and
                  production. Our end-to-end capabilities ensure precision,
                  quality, and reliability at every stage.
                </p>
              </NavLink>
            </div>

            <div className="col-lg-6 mt-lg-0 mt-5">
              <NavLink to="/seating-components/driver-seats">
                <img
                  // src="/images/seating/natroyal vidhyjyot chair.jpg"
                  src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751355052/natroyal_vidhyjyot_chair_tlzrf0.jpg"
                  alt="seating-application"
                  className="seating-img"
                />

                <h4>Driver Seats</h4>

                <p className="paragraph gray-para mt-4">
                  Engineered for performance and comfort, our Railway and Metro
                  Driver Seats are built to meet the highest standards of fire
                  safety, ergonomics, and durability. With features like
                  adjustable lumbar support, shock absorption, and robust
                  construction, these seats ensure lasting comfort for drivers
                  on demanding routes.
                </p>
              </NavLink>
            </div>

            <div className="col-lg-6 mt-lg-5 mt-5">
              <NavLink to="/seating-components/bus">
                <img
                  // src="/images/seating/Bus.jpg"
                  src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751355040/Bus_odzjom.jpg"
                  className="bus-img"
                  alt="seating-application"
                />

                <h4>Bus</h4>

                <p className="paragraph gray-para mt-4">
                  We manufacture and supply seating solutions for the commercial
                  vehicle and bus segment. Delivering complete solutions from
                  design to production. Our expertise ensures superior comfort,
                  durability, and performance.
                </p>
              </NavLink>
            </div>

            <div className="col-lg-6 mt-lg-5 mt-5">
              <NavLink to="/seating-components/cinema">
                <img
                  // src="/images/seating/cinema-seats-still-life.png"
                  src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751355038/cinema-seats-still-life_panill.png"
                  alt="seating-application"
                  className="bus-img"
                />

                <h4>Cinema</h4>

                <p className="paragraph gray-para mt-4">
                  We specialize in manufacturing and supplying for the assembled
                  seat segment, catering to cinema and auditorium seating. From
                  design and prototyping to testing, tooling, and production, we
                  deliver end-to-end solutions. Our high-quality materials and
                  precision engineering ensure durability and comfort. Trusted
                  by industry leaders for seamless integration and on-time
                  delivery.
                </p>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <Clients />

      <ConnectSection />
    </Layout>
  );
};

export default SeatingComponents;
