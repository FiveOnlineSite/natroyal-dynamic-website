import React, { useEffect } from "react";
import LandingLayout from "../../components/LandingLayout";
import BannerSlider from "../../components/BannerSlider";
import Clients from "../../components/Clients";
import ConnectSection from "../../components/ConnectSection";
import Layout from "../../components/Layout";
import { NavLink, useLocation } from "react-router-dom";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import ApplicationsModal from "../../components/ApplicationsModal";

const VinylFlooring = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location]); // Dependency on location ensures it runs whenever the route changes

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
    {
      videoUrl: "/videos/7945422-hd_1920_1080_25fps.mp4",
      // poster: "/images/banners/pexels-digitalbuggu-218535.png",
      text: "Elegant. Durable. Water-Resistant. Transform Your Space with Premium Vinyl Flooring!",
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

  const applicationTabsData = [
    {
      category: "Education",
      url: "/vinyl-flooring/education",
      items: [
        // { name: "Moonwalk", url: "/moonwalk" },
        // { name: "Accord", url: "/accord" },
        // { name: "Mirakle", url: "/mirakle" },
        // { name: "Symphony", url: "/symphony" },
        // { name: "Startrek", url: "/startrek" },
        { name: "Royal Star", url: "/royal-star" },
        { name: "Tiger", url: "/tiger" },
        { name: "LVT", url: "/lvt-flooring" },
        { name: "Royal Classic", url: "/royal-classic" },
        { name: "Majesty", url: "/majesty" },
        { name: "Tuff", url: "/tuff" },
        // { name: "Elegant", url: "/elegant" },
        // { name: "Dazzle", url: "/dazzle" },

        // { name: "Avengers", url: "/avengers" },
      ],
    },
    {
      category: "Health Care",
      url: "/vinyl-flooring/healthcare",
      items: [
        { name: "Orbit", url: "/orbit" },
        { name: "Royal Star", url: "/royal-star" },
        { name: "Tuff", url: "/tuff" },
        { name: "LVT", url: "/lvt-flooring" },
        { name: "Tiger", url: "/tiger" },
      ],
    },
    // {
    //   category: "Wet Areas",
    //   url: "/vinyl-flooring/wet-areas",
    //   items: [{ name: "Aqua RS", url: "/aqua-rs" }],
    // },
    {
      category: "Residential",
      url: "/vinyl-flooring/residential",
      items: [
        { name: "Majesty Pro", url: "/majesty-pro" },
        { name: "Opera", url: "/opera" },
        { name: "Royal Classic", url: "/royal-classic" },
        { name: "LVT", url: "/lvt-flooring" },
        { name: "Majesty", url: "/majesty" },
        { name: "Printed Flooring", url: "/printed-flooring" },
      ],
    },
    {
      category: "Offices/Retail",
      url: "/vinyl-flooring/offices-retail",
      items: [
        { name: "Orbit", url: "/orbit" },
        { name: "Suprema RS", url: "/suprema-rs" },
        { name: "Standard RS", url: "/standard-rs" },
        { name: "LVT", url: "/lvt-flooring" },
        { name: "Majesty Pro", url: "/majesty-pro" },
        { name: "Majesty", url: "/majesty" },
        { name: "Royal Classic", url: "/royal-classic" },
        { name: "Tiger", url: "/tiger" },
      ],
    },
    {
      category: "Hospitality",
      url: "/vinyl-flooring/hospitality",
      items: [
        { name: "Tuff", url: "/tuff" },
        { name: "Sonata", url: "/sonata" },
        { name: "Suprema RS", url: "/suprema-rs" },
        { name: "Standard RS", url: "/standard-rs" },
        { name: "Eco Plus V", url: "/eco-plus-v" },
        { name: "Royal Star", url: "/royal-star" },
        { name: "Tiger", url: "/tiger" },
      ],
    },
    {
      category: "Transport",
      url: "/vinyl-flooring/transport",
      items: [
        { name: "Sonata", url: "/sonata" },
        { name: "Suprema RS", url: "/suprema-rs" },
        { name: "Standard RS", url: "/standard-rs" },
        { name: "Eco Plus V", url: "/eco-plus-v" },
        { name: "Gripper", url: "/gripper" },
      ],
    },
    // {
    //   category: "Sports",
    //   url: "/vinyl-flooring/sports",
    //   items: [{ name: "Avengers", url: "/avengers" }],
    // },
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
          "Vinyl Flooring Manufacturer in India | Durable PVC Vinyl Flooring by Natroyal",
        description:
          "Natroyal is a leading vinyl flooring manufacturer in India offering premium PVC vinyl flooring solutions. Ideal for homes, offices, hospitals, retail and commercial spaces. Durable, anti-skid, and easy to maintain.",
        keyword:
          "vinyl flooring India, PVC vinyl flooring India, vinyl flooring manufacturer India, vinyl floor supplier India, residential vinyl flooring, commercial vinyl flooring India, anti-skid vinyl flooring, waterproof vinyl flooring India, PVC flooring for homes, vinyl flooring for offices, best vinyl flooring company India, Natroyal vinyl flooring",
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
              // src="/videos/7945422-hd_1920_1080_25fps.mp4"
              src="https://res.cloudinary.com/dcmdihrzp/video/upload/v1751279373/7945422-hd_1920_1080_25fps_m8wz8a.mp4"
              loop
              autoPlay
              mute
              playsInline
              preload="metadata"
              className="poster-image"
            />

            {/* Common Banner Content - Placed inside the same container */}
            <div className="banner-text">
              <h1 className="banner-title">
                {" "}
                Elegant. Durable. Water-Resistant. Transform Your Space with
                Premium Vinyl Flooring!
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

      <section className="applications-section vinyl-applications-section">
        <div className="container">
          <div className="row">
            <ul className="application-tabs d-lg-flex align-items-center justify-content-center d-none">
              {applicationTabsData.map((tab, index) => (
                <li key={index} className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href={tab.url}
                    role="button"
                  >
                    {tab.category}
                  </a>
                  <ul className="dropdown-menu">
                    {tab.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a className="dropdown-item" href={item.url}>
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="vinyl-flooring-section">
        <div className="container">
          <div className="row">
            <h2 className="title new-title text-center">
              <span className="yellow-title">Vinyl</span>
              {""} Flooring
            </h2>

            {/* <p className="paragraph gray-para text-center">
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y
              archivos de texto. Lorem Ipsum ha sido el texto de relleno
              estándar de las industrias desde el año 1500, cuando un impresor 
            </p> */}
          </div>

          <div className="row mt-3 vinyl-flooring-row">
            <div className="col-lg-6 mt-5 px-3">
              <NavLink to="/vinyl-flooring/education">
                <img
                  // src="/images/vinyl/Education2.png"
                  src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751282589/Education2_acfh1y.png"
                  alt="vinyl"
                  className="w-100"
                />
                <div className="vinyl-detail-div d-flex align-items-start mt-3">
                  <div className="vinyl-img-div">
                    <img src="/images/icons/image 59.png" alt="vinyl-icons" />
                  </div>
                  <div className="vinyl-content">
                    <h5>Education</h5>
                    <p className="paragraph gray-para mt-3">
                      Our Education Vinyl Flooring sparks creativity and focus,
                      with vibrant colors that inspire both students and
                      facilitators, fostering a dynamic and engaging
                      learning environment.
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-lg-6 mt-5 px-3">
              <NavLink to="/vinyl-flooring/healthcare">
                <img
                  // src="/images/vinyl/Healthcare Vinyl.png"
                  src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751282591/Healthcare_Vinyl_tgxstk.png"
                  alt="vinyl"
                  className="w-100"
                />
                <div className="vinyl-detail-div d-flex align-items-start mt-3">
                  <div className="vinyl-img-div">
                    <img src="/images/icons/image 62.png" alt="vinyl-icons" />
                  </div>
                  <div className="vinyl-content">
                    <h5>Health Care</h5>
                    <p className="paragraph gray-para mt-3">
                      Our flooring creates a healthy environment, enhancing
                      patient healing. Designed for bare feet and wet areas, it
                      provides comfort and safety for patients and caregivers.
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>
            {/* <div className="col-lg-6 mt-5 px-3">
              <NavLink to="/vinyl-flooring/wet-areas">
                <img
                  src="/images/vinyl/wet-area-banner.png"
                  alt="vinyl"
                  className="w-100"
                />
                <div className="vinyl-detail-div d-flex align-items-start mt-3">
                  <div className="vinyl-img-div">
                    <img src="/images/icons/wet-floor.png" alt="vinyl-icons" />
                  </div>
                  <div className="vinyl-content">
                    <h5>Wet Areas</h5>
                    <p className="paragraph gray-para mt-3">
                      Our Healthcare Vinyl Flooring ensures safety and hygiene
                      in wet areas, promoting healing and comfort for
                      patients and caregivers.
                    </p>
                  </div>
                </div>
              </NavLink>
            </div> */}
            <div className="col-lg-6 mt-5 px-3">
              <NavLink to="/vinyl-flooring/residential">
                <img
                  // src="/images/vinyl/Residential Vinyl.jpg"
                  src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751282603/Residential_Vinyl_kgszcq.jpg"
                  alt="vinyl"
                  className="w-100"
                />
                <div className="vinyl-detail-div d-flex align-items-start mt-3">
                  <div className="vinyl-img-div">
                    <img
                      src="/images/icons/residential.png"
                      alt="vinyl-icons"
                    />
                  </div>
                  <div className="vinyl-content">
                    <h5>Residential</h5>
                    <p className="paragraph gray-para mt-3">
                      Our premium vinyl floor coverings offer diverse designs,
                      from wood to geometric patterns. Easy to maintain and
                      install, they're perfect for effortless interior updates.
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-lg-6 mt-5 px-3">
              <NavLink to="/vinyl-flooring/offices-retail">
                <img
                  // src="/images/vinyl/Office Vinyl.jpg"
                  src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751282602/Office_Vinyl_eda58f.jpg"
                  alt="vinyl"
                  className="w-100"
                />
                <div className="vinyl-detail-div d-flex align-items-start mt-3">
                  <div className="vinyl-img-div">
                    <img src="/images/icons/workspace.png" alt="vinyl-icons" />
                  </div>
                  <div className="vinyl-content">
                    <h5>Offices / Retail</h5>
                    <p className="paragraph gray-para mt-3">
                      Our premium flooring combines aesthetics with
                      practicality, meeting design demands. It also delivers
                      high-performance durability.
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-lg-6 mt-5 px-3">
              <NavLink to="/vinyl-flooring/hospitality">
                <img
                  // src="/images/vinyl/Hospitality Vinyl.jpg"
                  src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751282594/Hospitality_Vinyl_w9wglm.jpg"
                  alt="vinyl"
                  className="w-100"
                />
                <div className="vinyl-detail-div d-flex align-items-start mt-3">
                  <div className="vinyl-img-div">
                    <img src="/images/icons/hospital.png" alt="vinyl-icons" />
                  </div>
                  <div className="vinyl-content">
                    <h5>Hospitality</h5>
                    <p className="paragraph gray-para mt-3">
                      Our flooring combines aesthetics and practicality for
                      offices, retail, and hospitality. Meeting design demands
                      and high-performance requirements.
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>{" "}
            <div className="col-lg-6 mt-5 px-3">
              <NavLink to="/vinyl-flooring/transport">
                <img
                  // src="/images/vinyl/Transport Vinyl.jpg"
                  src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751282604/Transport_Vinyl_rm88z4.jpg"
                  alt="vinyl"
                  className="w-100"
                />
                <div className="vinyl-detail-div d-flex align-items-start mt-3">
                  <div className="vinyl-img-div">
                    <img src="/images/icons/truck.png" alt="vinyl-icons" />
                  </div>
                  <div className="vinyl-content">
                    <h5>Transport</h5>
                    <p className="paragraph gray-para mt-3">
                      Our transport vinyl flooring ensures safety and comfort
                      for passengers. Offering international-standard options
                      like Gripper and Suprema RS.
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>
            {/* <div className="col-lg-6 mt-5 px-3">
              <NavLink to="/vinyl-flooring/sports">
                <img
                  src="/images/vinyl/Avenger-Banner.jpg"
                  alt="vinyl"
                  className="w-100"
                />
                <div className="vinyl-detail-div d-flex align-items-start mt-3">
                  <div className="vinyl-img-div">
                    <img src="/images/icons/sports.png" alt="vinyl-icons" />
                  </div>
                  <div className="vinyl-content">
                    <h5>Sports</h5>
                    <p className="paragraph gray-para mt-3">
                      Our sports vinyl flooring ensures safety and performance
                      for athletes. Offering international-standard options like
                      Champion, Turbo, and Sprint.
                    </p>
                  </div>
                </div>
              </NavLink>
            </div> */}
          </div>
        </div>
      </section>

      <Clients />

      <ConnectSection />

      <ApplicationsModal />
    </Layout>
  );
};

export default VinylFlooring;
