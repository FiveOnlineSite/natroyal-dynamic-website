import React, { useEffect } from "react";
import LandingLayout from "../../components/LandingLayout";
import BannerSlider from "../../components/BannerSlider";
import OffersSection from "../../components/OffersSection";
import { NavLink, useLocation } from "react-router-dom";
import VideosSlider from "../../components/VideosSlider";
import ConnectSection from "../../components/ConnectSection";
import Clients from "../../components/Clients";
import Layout from "../../components/Layout";
import { useState } from "react";
import axios from "axios";
import LandingBanner from "../../components/LandingBanner";

const LVT = () => {

  const location = useLocation()
  const currentPath = location.pathname
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

  const [lvtAbout, setLvtAbout] = useState([])

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

   useEffect(() => {
      const fetchLvtAbout = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/lvt-about`);
          const LvtAboutData = response.data.lvtAbout[0];
          
          setLvtAbout(LvtAboutData)
          
          console.log(LvtAboutData);
        } catch (error) {
          console.error("Error fetching lvt about data:", error);
        } 
      };
  
      fetchLvtAbout();
    }, []);

    const [offer, setOffer] = useState("")

    useEffect(() => {
        const fetchOffer = async () => {
          try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${apiUrl}/api/what-we-offer`);
            const OfferData = response.data.whatWeOffer;
    
           setOffer(OfferData)
            console.log("Fetched content:", OfferData);
          } catch (error) {
            console.error("Error fetching Offer:", error);
          }
        };
    
        fetchOffer();
      }, []);

      const [lvtFeature, setLvtFeature] = useState([])

       useEffect(() => {
          const fetchLvtFeatures = async () => {
            try {
              const apiUrl = process.env.REACT_APP_API_URL;
              const response = await axios.get(`${apiUrl}/api/lvt-feature`);
              const LvtFeature = response.data.lvtFeature;
      
              setLvtFeature(LvtFeature);
              console.log("Fetched name:", LvtFeature.name);
            } catch (error) {
              console.error("Error fetching lvt feature:", error);
            } 
          };
      
          fetchLvtFeatures();
        }, []);

        const [whoWeAre, setWhoWeAre] = useState("")

        useEffect(() => {
            const fetchWhoWeAre = async () => {
              try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${apiUrl}/api/who-we-are`);
                const WhoWeAreData = response.data.whoWeAre;
        
                setWhoWeAre(WhoWeAreData)
        
                console.log(WhoWeAreData);
              } catch (error) {
                console.error("Error fetching who we are data:", error);
              } 
            };
        
            fetchWhoWeAre();
          }, []);

          const [events, setEvents] = useState("")

           useEffect(() => {
              const fetchEvents = async () => {
                try {
                  const apiUrl = process.env.REACT_APP_API_URL;
                  const response = await axios.get(`${apiUrl}/api/events`);
                  const EventsData = response.data.events[0];
          
                  setEvents(EventsData);
          
                  console.log("Fetched Events:", EventsData.event);
                } catch (error) {
                  console.error("Error fetching Events:", error);
                }
              };
          
              fetchEvents();
            }, []);

  return (
    <Layout>

      <LandingBanner page={currentPath}/>

      <section className="product-category-section">
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-lg-6">
              <h6 className="subtitle gray-subtitle">
                {lvtAbout.subtitle}
                <span></span>
              </h6>
              <h2 className="title new-title">
                <span className="yellow-title"> {lvtAbout.title1} </span> {""}
                {lvtAbout.title2}
              </h2>

               <div
                 className="paragraph"
                 dangerouslySetInnerHTML={{ __html: lvtAbout.content }}
               ></div>
            </div>
            <div className="col-lg-6">
              <div className="row">
              

                <img
                  src={lvtAbout.image?.[0]?.filepath}
                  alt={lvtAbout.alt}
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
                {offer.subtitle}
                <span></span>
              </h6>
              <h2 className="title new-title">
                <span className="yellow-title"> {offer.title1}</span>{" "}
                {""}
                 {offer.title2}
              </h2>

              <div className="paragraph" dangerouslySetInnerHTML={{__html: offer.content}}>
              </div>

              {offer.brochure?.length > 0 && (
              <div className="d-flex my-5">
                              <NavLink
                                to={offer.brochure[0]?.filepath}
                                target="_blank"
                                className="custom-button"
                              >
                                Download Brochure
                              </NavLink>
                            </div>
              )}
             
            </div>
            <div className="col-lg-6 offset-lg-1 offset-0">
              {offer.image?.[0]?.filepath && (
              <div className="transform-img-container">
                <img
                  // src="/images/lvt/LVT 1.jpg"
                  src={offer.image[0]?.filepath}
                  alt={offer.alt}
                  className="w-100"
                />
                {/* <div className="transform-text-container">
                  <h4>Create stunning spaces with high-end vinyl flooring</h4>
                </div> */}
              </div>
              )}
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
              {lvtFeature && lvtFeature.map((feature) => (
              <div className="col-lg-3 col-md-4 col-12" key={feature._id}>
                <div className="solutions-div">
                  {feature.icon[0]?.filepath && (
                  <div className="sc_icons_icon sc_icon_type_svg">
                   <img
                     src={feature.icon[0]?.filepath}
                     alt={feature.alt}
                     width="64px"
                     height="64px"
                   />
                  </div>
                  )}
                  <h5 className="mt-4">{feature.name}</h5>
                </div>
              </div>
              ))}
              
            </div>
          </div>
        </div>
      </section>

      <section className="leading-innovator-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              {
                whoWeAre?.image?.[0]?.filepath && (
              <img
                // src="/images/lvt/LVT.jpg"
                src={whoWeAre.image[0]?.filepath}
                alt="leading-innovator-img"
                className="w-100"
              />
                )}
              
            </div>
            <div className="col-lg-6 offset-lg-1 mt-lg-0 mt-5">
              <h6 className="subtitle gray-subtitle">
                {whoWeAre.subtitle}
                <span></span>
              </h6>
              <h2 className="title new-title">
                {" "}
                <span className="yellow-title">{whoWeAre.title1}</span> {""}
                                {whoWeAre.title2}

              </h2>

              <div className="paragraph gray-para" dangerouslySetInnerHTML={{__html: whoWeAre.content}}>
               
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <section className="videos-section">
        <div className="container">
          <h6 className="subtitle gray-subtitle">
            {events.subtitle}<span></span>
          </h6>
          <h2 className="title new-title">
            {" "}
            <span className="yellow-title">{events.title1}</span>{" "}
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
