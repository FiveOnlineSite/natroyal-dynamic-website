import React from "react";
import SectionSlider from "./SectionSlider";

const Clients = () => {
  const clientsSetting = {
    dots: false,
    arrows: false,
    infinite: true, // Enables infinite scrolling
    speed: 3000, // Duration of one complete slide transition in ms
    slidesToShow: 5, // Number of slides visible
    autoplay: true, // Enables autoplay
    autoplaySpeed: 0, // Sets the delay between autoplay transitions (0 for continuous)
    pauseOnHover: false, // Prevents stopping on hover
    centerMode: false,
    draggable: true, // Enables dragging
    swipeToSlide: true, // Smooth swipe to the closest slide
    cssEase: "linear", // Smooth and continuous animation

    responsive: [
      {
        breakpoint: 821,
        settings: {
          slidesToShow: 3,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          swipeToSlide: true,
        },
      },
    ],
  };

  const clientsData = [
    {
      // image: "/images/clients/image 4.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751366778/image_4_mnsqah.png",
      // image: "/images/clients/aaymv3vju 1.png",
      height: "50.93px",
      width: "170px",
    },
    {
      // image: "/images/clients/image 5.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751366781/image_5_gtuccv.png",
      // height: "50.93px",
      // image: "/images/clients/download (1) 1.png",
      height: "65.93px",
      width: "100%",
    },
    {
      // image: "/images/clients/image 6.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751366783/image_6_u35jqn.png",
      // image: "/images/clients/download (2) 1.png",
      height: "50.93px",
      width: "170px",
    },
    {
      // image: "/images/clients/image 7.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751366784/image_7_s63kvu.png",
      height: "50.93px",
      width: "100%",
    },

    {
      // image: "/images/clients/image 8.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751366786/image_8_skdmee.png",
      // image: "/images/clients/download (12) 1.png",
      height: "50.93px",
      width: "100%",
    },
    {
      // image: "/images/clients/image 9.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751366787/image_9_oxdgcp.png",
      height: "50.93px",
      width: "170px",
    },
    {
      // image: "/images/clients/image 10.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751366777/image_10_uti8cc.png",
      height: "50.93px",
      width: "170px",
    },
    {
      // image: "/images/clients/image 4.png",
      // image: "/images/clients/aaymv3vju 1.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751366778/aaymv3vju_1_eyyftw.png",
      height: "50.93px",
      width: "170px",
    },
    {
      // image: "/images/clients/image 5.png",
      // height: "50.93px",
      // image: "/images/clients/download (1) 1.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751366777/download_1_1_xojhdz.png",
      height: "65.93px",
      width: "100%",
    },
    {
      // image: "/images/clients/image 6.png",
      // image: "/images/clients/download (2) 1.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751366778/download_2_1_gfpgnf.png",
      height: "50.93px",
      width: "170px",
    },
    {
      // image: "/images/clients/image 8.png",
      // image: "/images/clients/download (12) 1.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751366778/download_12_1_mciscw.png",
      height: "50.93px",
      width: "100%",
    },
    {
      // image: "/images/clients/Titagarh_Wagons_Logo.svg.png",
      image:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751366791/Titagarh_Wagons_Logo.svg_eer7km.png",
      height: "60.93px",
      width: "100%",
    },
  ];

  return (
    <div>
      <section className="clients-section" id="industries">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h6 className="subtitle">
                Trusted by Industry Leaders <span></span>
              </h6>
              {/* <h2 className="title new-title">
                <span className="yellow-title">Our</span> {""} Clients
              </h2> */}
              <h2 className="title new-title">
                <span className="yellow-title">Industries </span> We Serve
              </h2>
            </div>

            <div className="col-lg-6">
              <p className="paragraph">
                {/* We are proud to work with a diverse range of esteemed clients
                across various industries. Their trust in our products and
                services reflects our commitment to excellence and customer
                satisfaction. */}
                From two-wheeler seat covers to public transport upholstery, our
                solutions are designed to meet strict performance and aesthetic
                requirements across sectors.
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <SectionSlider
            settings={clientsSetting}
            slides={clientsData}
            products={false}
            subdivision={false}
            clients={true}
          ></SectionSlider>
          {/* <ContinuousSlider /> */}
        </div>
      </section>
    </div>
  );
};

export default Clients;
