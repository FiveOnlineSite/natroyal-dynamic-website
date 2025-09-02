import React from "react";
import LandingLayout from "../../components/LandingLayout";
import BannerSlider from "../../components/BannerSlider";
import OffersSection from "../../components/OffersSection";
import Layout from "../../components/Layout";

const RoyalHouse = () => {
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
      videoUrl: "/videos/8566376-uhd_3840_2160_30fps.mp4",
      // poster: "/images/banners/pexels-digitalbuggu-218535.png",
      text: "Exquisite Luxury Vinyl Planks & Tiles for Every Space",
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

  return (
    <Layout>
      <section className="landing-banner-section">
        <BannerSlider
          settings={bannerSettings}
          slides={bannerData}
        ></BannerSlider>
      </section>

      <section className="vinyl-about-section">
        <div className="container">
          <div className="col-lg-12">
            <div className="row offer-row">
              <div className="col-lg-6">
                <img
                  src="/images/landing-banners/image (19).png"
                  alt="about-img"
                />
              </div>
              <div className="col-lg-6">
                <div className="vinyl-about-content">
                  <h6 className="subtitle gray-subtitle">
                    About Us <span></span>
                  </h6>
                  <h2 className="title white-title">
                    Royal Cushion Vinyl Products Ltd.
                  </h2>
                  <p className="paragraph gray-para">
                    Royal Cushion Vinyl Products Ltd. has two plants spread
                    across 130 acres of land, at Garadia, Halol, Gujarat, for
                    manufacturing of Vinyl Floorings of different types for
                    various end-users and Rigid Films. RCVPL caters to customers
                    in over 40 countries worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OffersSection />
    </Layout>
  );
};

export default RoyalHouse;
