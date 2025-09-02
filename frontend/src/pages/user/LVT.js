import React, { useEffect } from "react";
import LandingLayout from "../../components/LandingLayout";
import BannerSlider from "../../components/BannerSlider";
import OffersSection from "../../components/OffersSection";
import { NavLink } from "react-router-dom";
import VideosSlider from "../../components/VideosSlider";
import ConnectSection from "../../components/ConnectSection";
import Clients from "../../components/Clients";
import Layout from "../../components/Layout";

const LVT = () => {
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
      // videoUrl: "/videos/16641601-uhd_3840_2160_30fps.mp4",
      videoUrl:
        "https://res.cloudinary.com/dcmdihrzp/video/upload/v1751279345/19228171-uhd_3840_2160_30fps_bgqjgg.mp4",
      // poster: "/images/banners/pexels-digitalbuggu-218535.png",
      text: "Timeless Beauty. Lasting Durability. Luxury Vinyl Plank & Tile Flooring!",
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

  // const solutionData = [
  //   {
  //     icon: "/images/icons/Service Icon.png",
  //     text: "Unmatched Quality",
  //   },
  //   {
  //     icon: "/images/icons/Service Icon (1).png",
  //     text: "Unmatched Quality",
  //   },
  //   {
  //     icon: "/images/icons/Service Icon (1).png",
  //     text: "Unmatched Quality",
  //   },
  //   {
  //     icon: "/images/icons/Service Icon (1).png",
  //     text: "Unmatched Quality",
  //   },
  //   {
  //     icon: "/images/icons/Service Icon (1).png",
  //     text: "Unmatched Quality",
  //   },
  //   {
  //     icon: "/images/icons/Service Icon (1).png",
  //     text: "Unmatched Quality",
  //   },
  //   {
  //     icon: "/images/icons/Service Icon (1).png",
  //     text: "Unmatched Quality",
  //   },
  //   {
  //     icon: "/images/icons/Service Icon (1).png",
  //     text: "Unmatched Quality",
  //   },
  // ];

  const videosSettings = {
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: false,
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

  const videosData = [
    {
      video: "https://www.youtube.com/embed/_EVp4RgnJgA",
      // thumbnail: "/images/lvt/maxresdefault.jpg",
      thumbnail:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279735/maxresdefault_alkmrl.jpg",
    },
    {
      video: "https://www.youtube.com/embed/dCXXL92mLgw",
      // thumbnail: "/images/lvt/dCXXL92mLgw-HD.jpg",
      thumbnail:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279735/dCXXL92mLgw-HD_mikko0.jpg",
    },
    {
      video: "https://youtu.be/9UKHbfJGr_8?si=RVddF3MUA9V7oKus",
      // thumbnail: "/images/lvt/9UKHbfJGr_8-HD.jpg",
      thumbnail:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279735/9UKHbfJGr_8-HD_nnkstn.jpg",
    },
    {
      video: "https://youtu.be/mgQFKgkcQOc",
      // thumbnail: "/images/lvt/mgQFKgkcQOc-HD.jpg",
      thumbnail:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279735/mgQFKgkcQOc-HD_rwvys3.jpg",
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
          "Natroyal LVT Flooring | Indian Manufacturer & Exporter to USA & UK",
        description:
          "Natroyal is a leading Indian manufacturer and global exporter of LVT Flooring, Luxury Vinyl Tiles, and Vinyl Planks. Exporting to the USA and UK, we offer durable, stylish, and easy-to-install flooring for residential and commercial interiors.",
        keyword:
          "LVT flooring India, Indian LVT flooring manufacturer, Luxury Vinyl Tile India, vinyl plank supplier India, LVT flooring exporter to USA, vinyl flooring USA importer, water-resistant vinyl planks USA, LVT flooring UK, vinyl tiles UK distributor, luxury vinyl plank UK, anti-slip vinyl flooring, wood-look vinyl tiles, commercial vinyl flooring, residential vinyl flooring, Natroyal vinyl exporter, luxury flooring manufacturer India",
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
            <video
              // src="/videos/19228171-uhd_3840_2160_30fps.mp4"
              src="https://res.cloudinary.com/dcmdihrzp/video/upload/v1751279345/19228171-uhd_3840_2160_30fps_bgqjgg.mp4"
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
                Timeless Beauty. Lasting Durability. Luxury Vinyl Plank & Tile
                Flooring!
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
      {/* <section className="landing-banner-section">
        <BannerSlider
          settings={bannerSettings}
          slides={bannerData}
        ></BannerSlider>
      </section> */}

      <section className="product-category-section">
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-lg-6">
              <h6 className="subtitle gray-subtitle">
                Stylish & Durable Flooring
                <span></span>
              </h6>
              <h2 className="title new-title">
                <span className="yellow-title">About </span> {""}
                Luxury Vinyl Plank & Tile
              </h2>

              <p className="paragraph">
                LUXURA and RADIANT are the ultimate solutions for those seeking
                both beauty and practicality. Perfectly engineered to replicate
                the richness of Hardwood, Marble and Stone, our LVT ranges in 2
                mm and 1.5 mm deliver exceptional performance, even in
                challenging environments.
              </p>

              <p className="paragraph">
                Upgrade your home or business with the timeless appeal of LUXURA
                and RADIANT. With easy installation, unmatched durability and a
                range of stunning designs, it's the flooring choice that
                combines style and practicality like never before.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="row">
                {/* <div className="col-lg-6 col-md-6 col-12 px-lg-3 px-md-3 px-auto mt-lg-0 mt-md-0 mt-3">
                  <div className="category-img-container">
                    <img
                      src="/images/banners/Image 19.png"
                      alt="products-img"
                    />
                    <h4>RADIANT</h4>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 mt-5 px-lg-3 px-md-3 px-auto">
                  <div className="category-img-container">
                    <img
                      src="/images/banners/Image (20).png"
                      alt="products-img"
                    />
                    <h4>LUXURA</h4>
                  </div>
                </div> */}

                <img
                  // src="/images/banners/LVT-Brochure-1.jpg"
                  src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277271/LVT-Brochure-1_zbzwge.jpg"
                  alt="about-lvt"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <OffersSection />

      <section className="transform-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <h6 className="subtitle gray-subtitle">
                What We Offer
                <span></span>
              </h6>
              <h2 className="title new-title">
                <span className="yellow-title">We Transform Spaces with</span>{" "}
                {""}
                Luxury Vinyl Plank & Tile (LVT) Flooring!
              </h2>

              <p className="paragraph">
                Create stunning spaces with high-end vinyl flooring
              </p>

              <div className="d-flex my-5">
                <NavLink
                  to="/docs/LVT-Brochure.pdf"
                  target="_blank"
                  className="custom-button"
                >
                  Download Brochure
                </NavLink>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1 offset-0">
              <div className="transform-img-container">
                <img
                  // src="/images/lvt/LVT 1.jpg"
                  src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279738/LVT_1_hxf2v2.jpg"
                  alt="transform-img"
                  className="w-100"
                />
                {/* <div className="transform-text-container">
                  <h4>Create stunning spaces with high-end vinyl flooring</h4>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="perfect-flooring-section">
        <div className="container">
          <div className="col-lg-9">
            {/* <h6 className="subtitle gray-subtitle">
              Lorem Ipsum
              <span></span>
            </h6> */}
            <h2 className="title new-title">
              <span className="yellow-title">Natroyal has the perfect</span>{" "}
              {""}
              flooring solution for you!
            </h2>
          </div>

          <div className="col-lg-12">
            <div className="row mt-4 align-items-center justify-content-center">
              {/* {solutionData.map((solution, index) => ( */}
              <div className="col-lg-3 col-md-4 col-12">
                <div className="solutions-div">
                  <div className="sc_icons_icon sc_icon_type_svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="61"
                      height="84"
                      viewBox="0 0 61 84"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_45_1480)">
                        <path
                          d="M31.3986 0.5C34.6831 1.19707 36.7482 4.11504 39.3823 5.91445C42.3254 7.92461 47.0409 6.49805 50.2604 8.2002C54.7969 10.5832 53.6425 15.3492 54.3417 19.5316C54.9596 23.2277 60.1303 25.6918 60.6669 29.7607C61.236 34.1701 57.9189 36.1965 55.6425 39.3252C52.7156 43.3293 55.5937 49.3436 51.3173 52.683C49.2035 54.3365 46.6018 54.142 44.0815 54.4662L53.0246 76.1078C53.1222 77.275 52.1303 78.0207 50.9921 77.7938L43.2035 75.6863C41.8051 77.7613 40.8295 80.3227 39.4799 82.3815C39.1222 82.9164 38.9433 83.1434 38.3742 83.4676H37.3986C36.8945 83.0947 36.5856 82.7867 36.2766 82.2356C34.5368 79.0258 33.5124 74.7785 31.7888 71.4715C31.1872 69.899 33.0408 68.9588 33.9677 70.2719L37.9026 79.7229C38.2766 79.8039 38.1628 79.6742 38.2604 79.5121C39.2522 77.9721 40.1465 75.3945 41.236 74.049C42.3254 72.7035 42.7482 73.044 43.4636 73.1088C44.1791 73.1736 49.675 75.0703 49.9352 74.8596L41.236 54.758C40.6669 54.8229 40.1791 55.066 39.7075 55.3416C37.7075 56.5574 35.74 58.9242 33.7075 60.2211L24.3904 82.3815C24.1791 82.9488 23.7726 83.1758 23.2685 83.4514H22.2929C21.7888 83.1109 21.5124 82.7057 21.1872 82.2031C20.6343 81.344 17.9189 75.9133 17.5774 75.7512L17.0571 75.7025L9.52866 77.7775C8.63435 77.9234 7.62622 76.9994 7.70752 76.1078L16.7807 54.4338C13.3986 54.0934 10.2116 54.2555 8.13028 51.143C5.85386 47.7549 7.60996 42.843 5.46361 39.6981C3.675 37.1529 0.292883 34.7213 0.0164604 31.3818C-0.308743 27.2805 3.07337 25.092 5.21971 22.1416C7.87012 18.4941 5.52866 13.1445 8.63435 9.65918C12.1465 5.71992 17.8701 8.45957 21.7238 5.6875C25.5774 2.91543 26.1791 1.22949 29.2848 0.5H31.3986ZM29.9026 2.98027C27.2197 3.30449 24.2278 7.48691 21.6425 8.68652C19.0571 9.88613 12.7319 8.91348 10.5856 11.1182C8.43922 13.3229 9.31727 18.1051 8.69939 20.7475C7.8376 24.3787 2.39044 27.5074 2.45548 30.8955C2.52053 34.2836 7.31727 37.0719 8.4067 39.8926C9.49613 42.7133 7.93516 50.3162 12.5205 51.5158C15.8051 52.375 19.61 51.4348 22.6181 53.4449C24.3091 54.5635 27.675 58.2109 29.4148 58.5027C33.4311 59.1836 36.0002 54.2068 39.3823 52.7965C42.3579 51.5482 48.1303 52.5857 50.1953 50.4459C52.2604 48.3061 51.2848 42.8916 52.3091 40.0709C53.5287 36.699 58.5693 34.0729 58.2441 30.2471C58.0165 27.6371 53.5774 24.476 52.4717 21.8984C51.1059 18.7535 52.4717 12.9014 49.7888 10.7939C47.675 9.10801 42.488 9.91856 39.6587 8.89727C36.5043 7.7625 33.3335 2.55879 29.9026 2.98027ZM30.5856 61.1289C29.8051 60.9506 29.0896 60.9506 28.3091 60.7236C25.8539 60.0266 23.3823 56.8816 21.2034 55.4875C20.6018 55.0984 19.9839 54.6932 19.2197 54.8229L10.9108 74.9082L17.2197 73.1574C17.6587 73.1088 18.2766 73.2223 18.6669 73.4168C20.0327 74.0815 22.3254 79.7715 22.6994 79.7715L30.5856 61.1289Z"
                          fill="#EAAE50"
                        ></path>
                        <path
                          d="M29.0892 11.5722C48.894 9.77278 57.7396 37.2341 40.1298 47.3822C20.7802 58.5191 1.12172 33.4083 16.5201 17.3595C17.5933 16.2409 21.138 13.4689 22.5851 13.1771C24.0323 12.8853 24.6827 13.939 24.0648 14.9927C23.4469 16.0464 21.0567 16.7759 20.3575 17.2947C4.66643 28.9179 18.4876 53.6882 36.764 46.296C53.8209 39.4064 48.9916 13.3392 29.0567 14.1335C28.1623 14.1659 26.9754 14.247 26.8615 13.0636C26.7477 11.8802 28.1461 11.6695 29.1054 11.5884L29.0892 11.5722Z"
                          fill="#EAAE50"
                        ></path>
                        <path
                          d="M37.2195 21.9309C40.8943 21.3149 43.0894 25.3839 40.6829 28.3018C37.1545 32.5653 31.9187 36.6342 28.0488 40.6708C26.6504 41.3678 25.3821 41.3192 24.0813 40.4762C22.7805 39.6333 17.8537 34.5917 17.4634 33.7811C16.4553 31.7385 17.3496 29.2096 19.5447 28.4639C22.7805 27.3616 24.0976 30.3444 26.2602 31.9331L35.3008 22.9522C35.8049 22.5469 36.5691 22.0444 37.2032 21.9471L37.2195 21.9309ZM37.7073 24.3626C37.4471 24.4112 37.3008 24.5895 37.0894 24.7354C33.8374 27.1508 30.6829 31.7223 27.4146 34.3809C24.1463 37.0395 26.6341 35.1104 25.9675 35.0294C25.3008 34.9483 22.6504 31.771 21.6585 31.0577C20.6667 30.3444 19.252 31.0901 19.5772 32.4842L25.4797 38.4337C25.9187 38.7255 26.2602 38.7903 26.748 38.5634L39.0732 26.3727C39.6098 25.3839 38.8943 24.1194 37.7236 24.3626H37.7073Z"
                          fill="#EAAE50"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_45_1480">
                          <rect
                            width="60.7317"
                            height="83"
                            fill="white"
                            transform="translate(0 0.5)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h5 className="mt-4">Unmatched Quality</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div className="solutions-div">
                  <div className="sc_icons_icon sc_icon_type_svg">
                    <svg
                      width="112"
                      height="63"
                      viewBox="0 0 112 63"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <g clip-path="url(#clip0_1_1364)">
                        {" "}
                        <path
                          d="M13.1386 60.108L13.912 54.6496C-1.15333 52.4637 7.40624 33.4733 3.46767 23.9229C2.2653 21.0083 -0.483898 20.2926 0.54299 16.0704C1.55688 11.9067 3.83163 12.6549 6.48334 11.0935C8.04317 10.1697 10.4154 7.3982 12.3977 6.08403C24.7723 -2.13926 42.8534 -1.94409 54.9876 6.70859C56.7034 7.93167 58.3087 9.91593 59.8035 10.8658C62.7347 12.7394 66.0883 12.4662 66.2053 17.3715C66.2898 20.8717 64.522 20.9562 63.3651 23.1487C60.7719 28.0605 62.3512 38.5999 61.8963 44.3185C61.4673 49.7378 58.2632 54.3699 52.5243 54.6496L53.6682 59.9453L71.7622 60.0494C77.5401 53.1663 78.5215 42.6074 74.8234 34.4752C74.3684 33.4798 72.6786 30.4091 71.7492 30.1359C70.8588 29.8756 69.7279 30.0903 68.5841 29.7911C64.1581 28.6395 65.2889 22.1208 69.8579 22.2249C81.6541 23.0901 94.9322 21.1384 106.546 22.2249C111.278 22.6672 112.695 27.6962 108.782 29.5634C105.617 31.0792 105.351 28.5289 102.764 32.9073C99.0852 39.1268 98.8968 47.246 101.366 53.96C101.88 55.3587 103.96 59.8217 105.377 60.0949C106.579 60.3292 110.66 59.5745 111.018 60.6935C111.219 61.0838 110.758 62.0532 110.44 62.0532H1.24491C1.12793 62.0532 0.510493 61.2595 0.27002 61.0708L0.854956 60.1015H13.1386V60.108ZM15.5304 31.1703L50.984 31.0532C52.5698 24.5084 50.8475 15.2246 57.9707 11.5098C46.4865 0.254861 26.5337 -1.24797 13.2426 7.71698C11.5463 8.862 10.2009 10.4884 8.45913 11.3212C9.17405 12.3036 10.2724 12.5247 11.2018 13.4486C15.2639 17.4626 14.237 26.0437 15.5304 31.1703ZM5.22248 13.351C1.01744 14.3203 1.21892 21.7304 6.30786 21.8866C12.8721 22.0882 11.9947 11.7896 5.22248 13.351ZM58.6467 13.351C54.4416 14.3203 54.6431 21.7304 59.732 21.8866C66.2963 22.0882 65.4189 11.7896 58.6467 13.351ZM54.0842 20.2926C53.6357 24.2156 53.5252 28.2427 52.8493 32.1396C51.9134 37.5069 51.127 41.5795 44.9072 42.1455C39.0318 42.679 27.7815 42.6725 21.8932 42.165C11.4423 41.2672 14.068 27.6767 12.3522 20.2926C11.6828 20.6374 11.5073 21.4507 10.8054 22.0557C9.18055 23.4609 7.53623 24.0465 5.33947 23.8058C7.50373 30.5587 5.87241 37.7867 6.51584 44.6763C6.98379 49.7247 9.85647 52.6003 14.8999 53.0687C26.5402 54.1552 39.7532 52.2555 51.5624 53.0882C62.5917 52.1319 59.5826 41.1827 59.9335 33.3627C60.018 31.4761 60.187 29.0494 60.369 27.1627C60.473 26.0307 60.9604 24.9247 61.0969 23.7992C58.0812 24.04 55.8325 22.6087 54.0842 20.2861V20.2926ZM108.581 27.6181C109.01 27.1888 109.205 25.8291 109.016 25.2435L108.191 24.4889L68.2786 24.5539C67.0047 26.2259 67.6872 28.0996 69.8709 28.1126C81.7451 27.3514 94.8217 29.1015 106.553 28.1191C107.157 28.067 108.158 28.054 108.587 27.6181H108.581ZM102.439 30.0513H74.3619C80.6078 38.8601 79.8733 51.156 74.3619 60.108H102.439C96.739 51.13 96.0111 38.8601 102.439 30.0513ZM15.8683 32.7837C15.9918 35.8935 16.9797 39.5237 20.4438 40.1092C25.0518 40.8834 40.3836 40.7012 45.3296 40.2198C48.6572 39.901 50.7175 36.7587 50.815 33.5904C50.828 33.109 50.75 33.083 50.3796 32.7837H15.8683ZM20.5413 54.6431L16.2388 54.8188L14.6919 60.1015L18.1366 60.0429C18.2211 59.0345 20.9963 55.092 20.5348 54.6431H20.5413ZM46.285 60.108L43.2953 54.7082C37.2055 55.1506 29.7638 53.908 23.8365 54.6236C21.8672 54.8643 21.2887 58.5791 20.1514 60.108H46.2785H46.285ZM50.5355 54.6821L45.895 54.6431C47.1234 57.6032 47.7018 61.0513 51.7379 60.1015L50.529 54.6756L50.5355 54.6821Z"
                          fill="#EAAE50"
                        ></path>{" "}
                        <path
                          d="M26.0007 26.9289L24.4019 26.6947C23.895 22.7457 24.0315 19.1285 22.5691 15.3356C22.1337 14.2036 19.053 9.78618 19.378 9.36331C20.1969 8.27684 21.9907 10.5929 22.4261 11.1849C25.4483 15.3161 26.1177 21.9455 26.0007 26.9289Z"
                          fill="#EAAE50"
                        ></path>{" "}
                        <path
                          d="M45.7 9.36981L46.6164 11.0613C43.8022 13.8913 42.9378 18.2242 42.4374 22.0951C42.2814 23.2922 43.0353 27.5534 41.027 26.9224C40.1171 26.1807 40.3966 24.6844 40.4421 23.6109C40.6436 18.8552 42.1839 12.7073 45.7 9.36981Z"
                          fill="#EAAE50"
                        ></path>{" "}
                      </g>{" "}
                      <defs>
                        {" "}
                        <clipPath id="clip0_1_1364">
                          {" "}
                          <rect
                            width="110.787"
                            height="62"
                            fill="white"
                            transform="translate(0.27002 0.0600586)"
                          ></rect>{" "}
                        </clipPath>{" "}
                      </defs>{" "}
                    </svg>
                  </div>
                  <h5 className="mt-4">Innovative & Stylish Designs</h5>
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-12">
                <div className="solutions-div">
                  <div className="sc_icons_icon sc_icon_type_svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="61"
                      height="84"
                      viewBox="0 0 61 84"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_45_1480)">
                        <path
                          d="M31.3986 0.5C34.6831 1.19707 36.7482 4.11504 39.3823 5.91445C42.3254 7.92461 47.0409 6.49805 50.2604 8.2002C54.7969 10.5832 53.6425 15.3492 54.3417 19.5316C54.9596 23.2277 60.1303 25.6918 60.6669 29.7607C61.236 34.1701 57.9189 36.1965 55.6425 39.3252C52.7156 43.3293 55.5937 49.3436 51.3173 52.683C49.2035 54.3365 46.6018 54.142 44.0815 54.4662L53.0246 76.1078C53.1222 77.275 52.1303 78.0207 50.9921 77.7938L43.2035 75.6863C41.8051 77.7613 40.8295 80.3227 39.4799 82.3815C39.1222 82.9164 38.9433 83.1434 38.3742 83.4676H37.3986C36.8945 83.0947 36.5856 82.7867 36.2766 82.2356C34.5368 79.0258 33.5124 74.7785 31.7888 71.4715C31.1872 69.899 33.0408 68.9588 33.9677 70.2719L37.9026 79.7229C38.2766 79.8039 38.1628 79.6742 38.2604 79.5121C39.2522 77.9721 40.1465 75.3945 41.236 74.049C42.3254 72.7035 42.7482 73.044 43.4636 73.1088C44.1791 73.1736 49.675 75.0703 49.9352 74.8596L41.236 54.758C40.6669 54.8229 40.1791 55.066 39.7075 55.3416C37.7075 56.5574 35.74 58.9242 33.7075 60.2211L24.3904 82.3815C24.1791 82.9488 23.7726 83.1758 23.2685 83.4514H22.2929C21.7888 83.1109 21.5124 82.7057 21.1872 82.2031C20.6343 81.344 17.9189 75.9133 17.5774 75.7512L17.0571 75.7025L9.52866 77.7775C8.63435 77.9234 7.62622 76.9994 7.70752 76.1078L16.7807 54.4338C13.3986 54.0934 10.2116 54.2555 8.13028 51.143C5.85386 47.7549 7.60996 42.843 5.46361 39.6981C3.675 37.1529 0.292883 34.7213 0.0164604 31.3818C-0.308743 27.2805 3.07337 25.092 5.21971 22.1416C7.87012 18.4941 5.52866 13.1445 8.63435 9.65918C12.1465 5.71992 17.8701 8.45957 21.7238 5.6875C25.5774 2.91543 26.1791 1.22949 29.2848 0.5H31.3986ZM29.9026 2.98027C27.2197 3.30449 24.2278 7.48691 21.6425 8.68652C19.0571 9.88613 12.7319 8.91348 10.5856 11.1182C8.43922 13.3229 9.31727 18.1051 8.69939 20.7475C7.8376 24.3787 2.39044 27.5074 2.45548 30.8955C2.52053 34.2836 7.31727 37.0719 8.4067 39.8926C9.49613 42.7133 7.93516 50.3162 12.5205 51.5158C15.8051 52.375 19.61 51.4348 22.6181 53.4449C24.3091 54.5635 27.675 58.2109 29.4148 58.5027C33.4311 59.1836 36.0002 54.2068 39.3823 52.7965C42.3579 51.5482 48.1303 52.5857 50.1953 50.4459C52.2604 48.3061 51.2848 42.8916 52.3091 40.0709C53.5287 36.699 58.5693 34.0729 58.2441 30.2471C58.0165 27.6371 53.5774 24.476 52.4717 21.8984C51.1059 18.7535 52.4717 12.9014 49.7888 10.7939C47.675 9.10801 42.488 9.91856 39.6587 8.89727C36.5043 7.7625 33.3335 2.55879 29.9026 2.98027ZM30.5856 61.1289C29.8051 60.9506 29.0896 60.9506 28.3091 60.7236C25.8539 60.0266 23.3823 56.8816 21.2034 55.4875C20.6018 55.0984 19.9839 54.6932 19.2197 54.8229L10.9108 74.9082L17.2197 73.1574C17.6587 73.1088 18.2766 73.2223 18.6669 73.4168C20.0327 74.0815 22.3254 79.7715 22.6994 79.7715L30.5856 61.1289Z"
                          fill="#EAAE50"
                        ></path>
                        <path
                          d="M29.0892 11.5722C48.894 9.77278 57.7396 37.2341 40.1298 47.3822C20.7802 58.5191 1.12172 33.4083 16.5201 17.3595C17.5933 16.2409 21.138 13.4689 22.5851 13.1771C24.0323 12.8853 24.6827 13.939 24.0648 14.9927C23.4469 16.0464 21.0567 16.7759 20.3575 17.2947C4.66643 28.9179 18.4876 53.6882 36.764 46.296C53.8209 39.4064 48.9916 13.3392 29.0567 14.1335C28.1623 14.1659 26.9754 14.247 26.8615 13.0636C26.7477 11.8802 28.1461 11.6695 29.1054 11.5884L29.0892 11.5722Z"
                          fill="#EAAE50"
                        ></path>
                        <path
                          d="M37.2195 21.9309C40.8943 21.3149 43.0894 25.3839 40.6829 28.3018C37.1545 32.5653 31.9187 36.6342 28.0488 40.6708C26.6504 41.3678 25.3821 41.3192 24.0813 40.4762C22.7805 39.6333 17.8537 34.5917 17.4634 33.7811C16.4553 31.7385 17.3496 29.2096 19.5447 28.4639C22.7805 27.3616 24.0976 30.3444 26.2602 31.9331L35.3008 22.9522C35.8049 22.5469 36.5691 22.0444 37.2032 21.9471L37.2195 21.9309ZM37.7073 24.3626C37.4471 24.4112 37.3008 24.5895 37.0894 24.7354C33.8374 27.1508 30.6829 31.7223 27.4146 34.3809C24.1463 37.0395 26.6341 35.1104 25.9675 35.0294C25.3008 34.9483 22.6504 31.771 21.6585 31.0577C20.6667 30.3444 19.252 31.0901 19.5772 32.4842L25.4797 38.4337C25.9187 38.7255 26.2602 38.7903 26.748 38.5634L39.0732 26.3727C39.6098 25.3839 38.8943 24.1194 37.7236 24.3626H37.7073Z"
                          fill="#EAAE50"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_45_1480">
                          <rect
                            width="60.7317"
                            height="83"
                            fill="white"
                            transform="translate(0 0.5)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h5 className="mt-4">Eco-Friendly Solutions</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div className="solutions-div">
                  <div className="sc_icons_icon sc_icon_type_svg">
                    <svg
                      width="56"
                      height="73"
                      viewBox="0 0 56 73"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M18.2526 4.27421C18.7061 3.40475 19.6131 -0.611353 21.2211 0.796353C22.829 2.20406 22.0044 4.02579 22.2106 4.72965C23.6124 9.82223 26.7046 14.5008 31.4047 17.0678C36.1049 19.6348 37.5891 18.6411 40.805 20.0488C60.5539 28.9505 59.6056 64.6813 38.826 71.3472C34.5794 72.7135 24.2721 72.5479 19.6131 72.2581C11.8208 71.7199 5.59514 65.3852 2.66785 58.5537C-1.90861 48.1201 -0.671728 33.8774 6.95571 25.1828C9.4707 22.326 12.4804 20.2972 16.0674 18.9723C12.7691 16.4053 10.5839 12.5134 9.92422 8.37312C9.26455 4.23281 10.5014 6.05455 12.8927 6.17876C15.284 6.30297 13.8822 4.89526 14.4595 4.02579C15.0367 3.15633 17.0981 4.31562 18.2113 4.31562L18.2526 4.27421ZM19.1184 18.4341H29.3845C28.4775 17.4818 27.323 16.8608 26.3748 15.9499C24.437 14.1282 22.8703 11.6854 21.6746 9.32539L20.0254 5.06087C19.3658 7.83488 17.6753 5.88893 15.9025 5.88893C15.5726 6.38577 15.284 8.0833 14.7068 8.29031C14.1296 8.49733 12.7691 8.16611 12.0269 8.00049C12.2743 11.3541 14.2533 14.7906 16.8095 16.9436C17.1394 17.192 18.7885 18.3513 19.0359 18.4341H19.1184ZM19.407 70.2708C20.9737 70.395 22.7053 70.188 24.2721 70.2708C23.2001 69.3599 21.922 68.6974 20.8088 67.7866C14.8718 62.9838 11.4085 54.786 10.9962 47.2092C10.5839 39.6325 14.913 25.4726 24.2721 20.7527C24.4782 20.5456 24.2721 20.4628 24.0247 20.4628C23.0764 20.3386 21.1798 20.38 20.1491 20.4628C7.28554 21.1667 1.38974 36.0718 2.00818 47.3748C2.62662 58.6779 8.72857 69.3185 19.407 70.2708ZM31.817 20.4628C9.84177 22.119 6.29604 60.127 26.3748 68.8217C40.6813 75.0321 52.2256 60.7481 53.0089 47.4991C53.7511 35.0367 46.0824 19.3863 31.817 20.4628Z"
                        fill="#EAAE50"
                      ></path>{" "}
                    </svg>
                  </div>
                  <h5 className="mt-4">Easy to Install and Maintain</h5>
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-12">
                <div className="solutions-div">
                  <div>
                    <img
                      src="/images/icons/fire-resistant.jpg"
                      alt="water"
                      width="64px"
                      height="64px"
                    />
                  </div>
                  <h5 className="mt-4">Fire Resistant</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div className="solutions-div">
                  <div>
                    <img
                      src="/images/icons/water.jpg"
                      alt="water"
                      width="64px"
                      height="64px"
                    />
                  </div>
                  <h5 className="mt-4">Water Resistant</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div className="solutions-div">
                  <div>
                    <img
                      src="/images/icons/termite.jpg"
                      alt="water"
                      width="64px"
                      height="64px"
                    />
                  </div>
                  <h5 className="mt-4">Anti Termite</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div className="solutions-div">
                  <div>
                    <img
                      src="/images/icons/env.jpg"
                      alt="water"
                      width="64px"
                      height="64px"
                    />
                  </div>
                  <h5 className="mt-4">Environment Friendly</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div className="solutions-div">
                  <div>
                    <img
                      src="/images/icons/fungal.jpg"
                      alt="water"
                      width="64px"
                      height="64px"
                    />
                  </div>
                  <h5 className="mt-4">Anti Fungal</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div className="solutions-div">
                  <div>
                    <img
                      src="/images/icons/bacteria.jpg"
                      alt="water"
                      width="64px"
                      height="64px"
                    />
                  </div>
                  <h5 className="mt-4">Anti Bacteria</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="leading-innovator-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <img
                // src="/images/lvt/LVT.jpg"
                src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751279738/LVT_goihet.jpg"
                alt="leading-innovator-img"
                className="w-100"
              />
            </div>
            <div className="col-lg-6 offset-lg-1 mt-lg-0 mt-5">
              <h6 className="subtitle gray-subtitle">
                Who We Are
                <span></span>
              </h6>
              <h2 className="title new-title">
                {" "}
                <span className="yellow-title">Leading Innovators</span> {""}
                in Quality Flooring!
              </h2>

              <p className="paragraph gray-para">
                Natroyal Group is a pioneer in India, manufacturing and
                supplying luxury vinyl planks and tiles for various industries,
                including education, healthcare, residential, hospitality,
                office/retail, and transportation sectors.
              </p>
            </div>
            {/* <div className="col-lg-2 mt-lg-0 mt-5">
              <div className="row">
                <div className="col-lg-12 col-md-6">
                  <div className="px-5 py-4 brands-box">
                    <img
                      src="/images/icons/Royal Knit.png"
                      height={"59.29px"}
                      width={"100px"}
                      alt="company"
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-6">
                  <div className="px-5 py-4 brands-box">
                    <img
                      src="/images/icons/Royal Touch.png"
                      height={"59.29px"}
                      width={"100px"}
                      alt="company"
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-6">
                  <div className="px-5 py-4 brands-box">
                    <img
                      src="/images/icons/Royal House.png"
                      height={"59.29px"}
                      width={"100px"}
                      alt="company"
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-6">
                  <div className="px-5 py-4 brands-box">
                    <img
                      src="/images/icons/Vijayjyot.png"
                      height={"40.29px"}
                      width={"140px"}
                      alt="company"
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="videos-section">
        <div className="container">
          <h6 className="subtitle gray-subtitle">
            Memorable Moments, Unforgettable Experiences <span></span>
          </h6>
          <h2 className="title new-title">
            {" "}
            <span className="yellow-title">Events</span>{" "}
          </h2>
          <VideosSlider settings={videosSettings} slides={videosData} />
        </div>
      </section>

      <ConnectSection />

      <Clients />
    </Layout>
  );
};

export default LVT;
