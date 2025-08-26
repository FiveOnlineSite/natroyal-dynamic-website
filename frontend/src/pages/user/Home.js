import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import BannerSlider from "../../components/BannerSlider";
import SectionSlider from "../../components/SectionSlider";
import Clients from "../../components/Clients";
import LocateUs from "../../components/LocateUs";
import { NavLink } from "react-router-dom";
import ConnectSection from "../../components/ConnectSection";
import { Helmet } from "react-helmet";
// import { NavLink } from "react-router-dom";

const Home = () => {
  const [activeTab, setActiveTab] = useState("pan-india");

  // const handleTabChange = (tab) => {
  //   setActiveTab(tab);
  // };

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
      // videoUrl: "/videos/8566376-uhd_3840_2160_30fps.mp4",
      videoUrl:
        "https://res.cloudinary.com/dcmdihrzp/video/upload/v1751276022/8566376-uhd_3840_2160_30fps_kgpnr1.mp4",
      // poster: "/images/banners/pexels-digitalbuggu-218535.png",
      // text: "Exquisite Luxury Vinyl Planks & Tiles for Every Space",
      text: "India’s Leading Manufacturer of Luxury Vinyl Tiles, PVC Flooring & Coated Fabrics",
      url: "/lvt-flooring",
    },

    {
      // videoUrl: "/videos/vecteezy_large-room-in-tropical-style_2018008.mov",
      // image: "/images/banners/pexels-ammy-k-106103999-12369543.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751276462/pexels-ammy-k-106103999-12369543_gdqrol.png",
      text: "Premium Coated Fabrics – Durable, Stylish, and Made to Last!",
      url: "/coated-fabrics",
    },
    {
      // videoUrl: "/videos/1103522677-preview.mp4",
      // image: "/images/banners/pexels-la-son-211137-4004373.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751276391/pexels-la-son-211137-4004373_jlrqgy.png",
      text: " Comfort Meets Innovation – Explore Our Premium Seating Components!",
      url: "/seating-components",
    },
    {
      // videoUrl: "/videos/1103522677-preview.mp4",
      // image: "/images/banners/right wall01.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751276407/right_wall01_pweagj.png",
      text: "Where Softness Meets Strength – Premium Knit Fabrics!",
      url: "knit-fabrics",
    },
  ];

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

  const productsSettings = {
    dots: false,
    nextArrow: <OfferingsNextArrow />,
    prevArrow: <OfferingsPrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 821,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const productsData = [
    {
      // image: "/images/banners/casual-girl-surfing-laptop-home.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277230/casual-girl-surfing-laptop-home_wvq8rv.png",
      title: "Vinyl Flooring",
      link: "/vinyl-flooring",
      // content:
      //   "Our PVC Vinyl Flooring offers durability for sectors like Education, Healthcare, Retail, and more.",
    },
    {
      // image:
      //   "/images/banners/beautiful-luxury-pillow-sofa-decoration-livingroom-interior-background.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277224/beautiful-luxury-pillow-sofa-decoration-livingroom-interior-background_br2lnv.png",
      title: "Luxury Vinyl Planks & Tiles (LVT)",
      link: "/lvt-flooring",
      // content:
      //   "LVT provide a durable, stylish, and low-maintenance flooring option ideal for various sectors like education, healthcare, and retail.",
    },
    {
      // image: "/images/banners/pexels-mikebirdy-1633602.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277308/pexels-mikebirdy-1633602_u9zcxu.png",
      title: "Coated Fabrics",
      link: "/coated-fabrics",
      // content:
      //   "Coated fabrics offer durability, water resistance, and versatility for applications like upholstery and outdoor furniture.",
    },

    {
      // image: "/images/banners/seating-component.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277331/seating-component_si3llt.png",
      title: "Seating Components",
      link: "/seating-components",
      // content:
      //   "Seating components provide comfort, durability, and support for various furniture applications.",
    },
    {
      // image: "/images/banners/left wall.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277267/left_wall_otyu1f.png",
      title: "Knit Fabrics",
      link: "/knit-fabrics",
      // content:
      //   "Knit fabrics offer flexibility, breathability, and softness for a wide range of textile applications.",
    },
  ];

  const subdivisionSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: false,
    autoplay: false,

    responsive: [
      {
        breakpoint: 821,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
    ],
  };

  const subdivisionData = [
    {
      icon: "/images/icons/image 59.png",
      title: "Education",
      content:
        "Our Education Vinyl Flooring sparks creativity and focus, with vibrant colors that inspire both students and facilitators.",
    },
    {
      icon: "/images/icons/image 62.png",
      title: "Healthcare",
      content:
        "Our flooring promotes patient recovery, offers caregiver comfort, and is designed for barefoot use and wet areas.",
    },
    {
      icon: "/images/icons/image 63.png",
      title: "Transport",
      content:
        "Our durable Transport Vinyl Flooring offers safety, comfort, and hygiene with premium ranges like Gripper, Suprema RS, and Sonata.",
    },
    {
      icon: "/images/icons/images (4) 1.png",
      title: "Residential",
      content:
        "Our Residential Vinyl Flooring combines durability and style, featuring soft textures and warm tones that create a comfortable and inviting living space.",
    },
    {
      icon: "/images/icons/download (9) 1.png",
      title: "Offices/Retail",
      content:
        "Our Vinyl Flooring for offices and retail spaces offers durability, easy maintenance, and a sleek, professional look that enhances both functionality and aesthetics.",
    },
    {
      icon: "/images/icons/download (11) 1 (1).png",
      title: "Sports",
      content:
        "Our Vinyl Flooring for sports provides excellent durability, impact resistance, and slip resistance, making it ideal for sports facilities and gym environments.",
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
          "Natroyal Group | LVT, PVC Flooring, Coated Fabrics, Knit Fabrics, Seating Components",
        description:
          "Explore Natroyal Group – India’s top manufacturer of Luxury Vinyl Tiles (LVT), PVC vinyl flooring, coated fabrics, knit fabrics, and seating components. Trusted globally since 1954.",
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
    <>
      <Layout>
        <section className="home-banner-section" id="hero">
          <BannerSlider
            settings={bannerSettings}
            slides={bannerData}
          ></BannerSlider>
        </section>

        <section className="about-us-section" id="about">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              {/* <div className="col-lg-6 about-img-div">
              <div className="border-box-1"></div>
              <div className="border-box-2"></div>
              <img
                src="/images/banners/beautiful-woman-using-laptop.png"
                alt="about-img"
              />
              <img
                src="/images/banners/interior-view-boat.png"
                alt="about-img"
              />

              <img
                src="/images/banners/pexels-ammy-k-106103999-9552475.png"
                alt="about-img"
              />
              <img
                src="/images/banners/pexels-karolina-grabowska-6276068.png"
                alt="about-img"
              />
            </div> */}
              <div className="col-lg-12 mt-lg-0 mt-5">
                <h6 className="subtitle">
                  About Us <span></span>
                </h6>
                {/* <h2 className="title">
                  {" "}
                  <span className="yellow-title">Natroyal Group:</span> Leaders
                  in Coated Fabrics, Flooring, Knit Fabrics, and Seating
                  Components
                </h2> */}

                <h2 className="title">
                  {" "}
                  <span className="yellow-title">
                    Trusted Since 1954 –{" "}
                  </span>{" "}
                  Innovation in Every Layer
                </h2>

                <div className="row mt-3">
                  <div className="col-lg-10">
                    <p className="paragraph">
                      {/* Since 1954, Natroyal Group has been a leader in
                      manufacturing and exporting Luxury Vinyl Plank & Tile, PVC
                      vinyl flooring, coated fabrics, knit fabrics, and seating
                      components—earning trust through decades of expertise and
                      innovation. */}
                      Natroyal Group has been at the forefront of material
                      innovation, offering high-performance solutions in
                      synthetic leather, knit fabrics, and PVC vinyl flooring
                      for diverse industries across India and the world.
                    </p>
                  </div>

                  {/* <div className="col-lg-6">
                  <div className="row justify-content-around">
                    <div className="col-lg-6 experience mb-lg-0 mb-4">
                      <h2>60+</h2>
                      <p>
                        Years <br /> Experience
                      </p>
                    </div>

                    <div className="col-lg-6 mt-lg-0 mt-3 d-flex align-items-center">
                      <NavLink
                        to="/about-us"
                        className="custom-button border-btn"
                      >
                        Read More
                        <img
                          src="/images/icons/arrow-up-right.png"
                          className="ps-2"
                          alt="arrow"
                        />
                      </NavLink>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="key-milestones-section pt-0" id="why-us">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                {/* <h2 className="title new-title">
                  {" "}
                  <span className="yellow-title">Key</span> Milestones
                </h2> */}

                <h2 className="title new-title">
                  {" "}
                  <span className="yellow-title">Why Choose </span> Natroyal?
                </h2>

                <div className="milestones-content">
                  <ul>
                    <li className="paragraph gray-para">
                      First company in India to develop transfer coating
                      technology in 1978.
                    </li>
                    <li className="paragraph gray-para mt-2">
                      First company to start a transfer coating line in India
                    </li>
                    <li className="paragraph gray-para mt-2">
                      First company to develop an award-winning heat management
                      leathercloth product
                    </li>
                    <li className="paragraph gray-para mt-2">
                      First coated fabric company to have backward integration
                      with knitting machines
                    </li>

                    <li className="paragraph gray-para mt-2">
                      First company to have five roll calendar and four roll
                      calendar machine for vinyl flooring
                    </li>
                    <li className="paragraph gray-para mt-2">
                      First company to develop international standards transport
                      flooring in India
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="row milestones-row">
                  <div className="col-lg-6">
                    <div className="counter-div right-border">
                      <img
                        src="/images/icons/testament.png"
                        alt="icon"
                        width="80px"
                        height="80px"
                      />

                      <h2>60 +</h2>

                      <h6>Year of Group Legacy</h6>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="counter-div left-border">
                      <img
                        src="/images/icons/costumer (1).png"
                        alt="icon"
                        width="80px"
                        height="80px"
                      />
                      <h2>100 +</h2>

                      <h6>Global Clients</h6>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="counter-div">
                      <img
                        src="/images/icons/settings.png"
                        alt="icon"
                        width="80px"
                        height="80px"
                      />
                      <h2>3,50,000 +</h2>

                      <h6>sq. ft of Manufacturing Facility</h6>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="counter-div">
                      <img
                        src="/images/icons/self-development.png"
                        alt="icon"
                        width="80px"
                        height="80px"
                      />
                      <h2>500 +</h2>

                      <h6>Skilled Employees</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mt-3 text-end">
                <NavLink to="/about-us" className="custom-button border-btn">
                  Read More
                  <img
                    src="/images/icons/arrow-up-right.png"
                    className="ps-2"
                    alt="arrow"
                  />
                </NavLink>
              </div>
            </div>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <h6 className="subtitle">
                  Innovative Manufacturing <span></span>
                </h6>
                {/* <h2 className="title new-title">
                  <span className="yellow-title">Product</span> Verticals
                </h2> */}

                <h2 className="title new-title">
                  <span className="yellow-title">Our</span> Product Categories
                </h2>
              </div>

              {/* <div className="col-lg-6 offset-lg-2 offset-0">
              <p className="paragraph">
                We lead in manufacturing and exporting PVC Vinyl Flooring (Royal
                House), Coated Fabrics (National’s Royal Touch), Knitted Fabrics
                (Royal Knit), and Seating Components (Vijayjyot), setting
                industry standards with quality and innovation.
              </p>
            </div> */}
            </div>
          </div>
          <div className="row products-row mt-4">
            {/* <div className="col-lg-3 col-md-6 col-12">
              <div className="image-container">
                <img
                  src="/images/banners/image 55.png"
                  alt="product-image"
                  className="w-100 product-image"
                />
                <a href="#" className="overlay-text">
                  <div className="overlay-title">
                    <h6>Coated Fabric</h6>
                    <div>
                      <img src="/images/icons/arrow-up-right.png" />
                    </div>
                  </div>
                  <p>
                    Our PVC Vinyl Flooring offers durability for sectors like
                    Education, Healthcare, Retail, and more
                  </p>
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-md-0 mt-5">
              <div className="image-container">
                <img
                  src="/images/banners/Mask group (8).png"
                  alt="product-image"
                  className="w-100 product-image"
                />
                <a href="#" className="overlay-text">
                  <div className="overlay-title">
                    <h6>Coated Fabric</h6>
                    <div>
                      <img src="/images/icons/arrow-up-right.png" />
                    </div>
                  </div>
                  <p>
                    Our PVC Vinyl Flooring offers durability for sectors like
                    Education, Healthcare, Retail, and more
                  </p>
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-5">
              <div className="image-container">
                <img
                  src="/images/banners/Mask group (9).png"
                  alt="product-image"
                  className="w-100 product-image"
                />

                <a href="#" className="overlay-text">
                  <div className="overlay-title">
                    <h6>Coated Fabric</h6>
                    <div>
                      <img src="/images/icons/arrow-up-right.png" />
                    </div>
                  </div>
                  <p>
                    Our PVC Vinyl Flooring offers durability for sectors like
                    Education, Healthcare, Retail, and more
                  </p>
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-5">
              <div className="image-container">
                <img
                  src="/images/banners/Mask group (8).png"
                  alt="product-image"
                  className="w-100 product-image"
                />
                <a href="#" className="overlay-text">
                  <div className="overlay-title">
                    <h6>Coated Fabric</h6>
                    <div>
                      <img src="/images/icons/arrow-up-right.png" />
                    </div>
                  </div>
                  <p>
                    Our PVC Vinyl Flooring offers durability for sectors like
                    Education, Healthcare, Retail, and more
                  </p>
                </a>
              </div>
            </div> */}

            <SectionSlider
              settings={productsSettings}
              slides={productsData}
              products={true}
              subdivision={false}
              clients={false}
            ></SectionSlider>
          </div>
        </section>

        {/* <section className="subdivision-section">
        <div className="container">
          <div className="subdivision-div">
            <h6 className="subtitle text-center">
              Applications <span></span>
            </h6>
            <h2 className="title new-title text-center">Our Subdivision</h2>

            <p className="paragraph">
              Natroyal Group offers versatile product solutions for various
              industries and applications
            </p>
          </div>

          <div className="row mt-4">
            <SectionSlider
              settings={subdivisionSettings}
              slides={subdivisionData}
              products={false}
              subdivision={true}
              clients={false}
            ></SectionSlider>
          </div>
        </div>
      </section> */}

        {/* <section className="map-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <h6 className="subtitle text-center">
                We Are Set At <span></span>
              </h6>
              <h2 className="title new-title">Nationwide & Beyond</h2>

              <p className="paragraph">
                With a presence in 10+ countries, we are trusted globally for
                delivering exceptional quality, innovative solutions, and
                unmatched reliability.
              </p>

              <div className="map-tabs">
                <button
                  className={`tab-link ${
                    activeTab === "pan-india" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("pan-india")}
                >
                  Pan India <i className="lni lni-arrow-angular-top-right"></i>
                </button>
                <button
                  className={`tab-link ${
                    activeTab === "other-countries" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("other-countries")}
                >
                  Other Countries{" "}
                  <i className="lni lni-arrow-angular-top-right"></i>
                </button>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="tab-content">
                {activeTab === "pan-india" && (
                  <div
                    className={`tab-pane ${
                      activeTab === "pan-india" ? "show active" : ""
                    }`}
                  >
                    <div className="row">
                      <div className="col-lg-12 indian-map-col">
                        <div
                          className="single-map-container india-map"
                          data-aos="fade-left"
                          data-aos-duration="1500"
                        >
                          <img
                            src="/images/maps/indian-map.png"
                            alt="pan-india"
                          />
                          <div
                            className="location-div"
                            style={{ position: "absolute" }}
                          >
                            <div className="map-pin-container">
                              <div className="map-pin"></div>
                              <div className="map-div">
                                <h6>Mumbai</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "other-countries" && (
                  <div
                    className={`tab-pane ${
                      activeTab === "other-countries" ? "show active" : ""
                    }`}
                  >
                    <div className="row">
                      <div className="col-lg-12 global-map-col">
                        <div
                          className="single-map-container world-map"
                          data-aos="fade-left"
                          data-aos-duration="1500"
                        >
                          <img
                            src="/images/maps/The_World_map 1.png"
                            alt="other-countries"
                          />
                          <div
                            className="location-div"
                            style={{ position: "absolute" }}
                          >
                            <div className="map-pin-container">
                              <div className="map-pin"></div>
                              <div className="map-div">
                                <h6>Africa</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section> */}

        <section className="map-section" id="global">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <h6 className="subtitle text-center">
                  Your Trust, Our Reach <span></span>
                </h6>
                {/* <h2 className="title new-title">
                  <span className="yellow-title">Nationwide </span>& Beyond!
                </h2> */}

                <h2 className="title new-title">
                  <span className="yellow-title">Global Reach, </span>Local
                  Expertise
                </h2>

                <p className="paragraph">
                  {/* With a presence in 10+ countries, we are trusted globally for
                  delivering exceptional quality, innovative solutions, and
                  unmatched reliability. */}
                  We are a trusted faux leather exporter from India, delivering
                  quality materials to customers in the USA, Europe, Middle
                  East, and Asia-Pacific
                </p>
              </div>
              <div className="col-lg-6 offset-lg-1 offset-0">
                <div className="row mt-lg-0 mt-md-5 mt-5">
                  <div className="col-lg-12 col-12">
                    <div className="map-tabs">
                      <div className="tab-link d-flex align-items-center justify-content-start">
                        <h5>Pan India </h5>
                        {/* <i className="lni lni-arrow-angular-top-right ms-3"></i> */}
                      </div>

                      <div className="row mt-4">
                        <div className="col-lg-6 col-6">
                          <div className="single-location">
                            <i className="fa-solid fa-location-dot"></i>
                            <h5>Mumbai, Maharashtra</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-6">
                          <div className="single-location">
                            <i className="fa-solid fa-location-dot"></i>
                            <h5>Vadodara (Baroda), Gujarat</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-12  mt-5">
                    <div className="map-tabs">
                      <div className="tab-link d-flex align-items-center justify-content-start">
                        <h5>Other Countries</h5>
                        {/* <i className="lni lni-arrow-angular-top-right ms-3"></i> */}
                      </div>

                      <div className="row mt-4">
                        <div className="col-lg-6 col-6">
                          <div className="single-location">
                            <i className="fa-solid fa-location-dot"></i>
                            <h5>Europe</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-6">
                          <div className="single-location">
                            <i className="fa-solid fa-location-dot"></i>
                            <h5>USA</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-6">
                          <div className="single-location">
                            <i className="fa-solid fa-location-dot"></i>
                            <h5>South America</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-6">
                          <div className="single-location">
                            <i className="fa-solid fa-location-dot"></i>
                            <h5>Middle East</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-6">
                          <div className="single-location">
                            <i className="fa-solid fa-location-dot"></i>
                            <h5>Africa</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-6">
                          <div className="single-location">
                            <i className="fa-solid fa-location-dot"></i>
                            <h5>South East Asia</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <LocateUs /> */}

        <ConnectSection />
        <Clients />
      </Layout>
    </>
  );
};

export default Home;
