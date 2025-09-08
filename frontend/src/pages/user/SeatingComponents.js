import React, { useEffect } from "react";
import LandingLayout from "../../components/LandingLayout";
import BannerSlider from "../../components/BannerSlider";
import Clients from "../../components/Clients";
import ConnectSection from "../../components/ConnectSection";
import Layout from "../../components/Layout";
import { NavLink, useLocation } from "react-router-dom";
import LandingBanner from "../../components/LandingBanner";
import { useState } from "react";
import axios from "axios";

const SeatingComponents = () => {

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

    const [seatingAbout, setSeatingAbout] = useState([])

       useEffect(() => {
        const fetchSeatingAbout = async () => {
          try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${apiUrl}/api/seating-about`);
            const seatingAboutData = response.data.seatingAbout;
    
            setSeatingAbout(seatingAboutData);
          } catch (error) {
            console.error("Error fetching seating about:", error);
          } 
        };
    
        fetchSeatingAbout();
      }, []);

      const [seatingAppTab, setSeatingAppTab] = useState([])
                
      useEffect(() => {
        const fetchApp = async () => {
          try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${apiUrl}/api/seating-application`);
            const seatingAppTab = response.data.seatingApp;
                      
            setSeatingAppTab(seatingAppTab);
            } catch (error) {
              console.error("Error fetching applications:", error);
            } 
          };
                      
        fetchApp();
      }, []);

  return (
    <Layout>

    <LandingBanner page={currentPath}/>

       <section className="applications-section">
                   <div className="container">
                     <div className="row">
                       
                       <ul className="application-tabs d-flex align-items-center justify-content-center">
                         {seatingAppTab && seatingAppTab.map((app) => (
                         <li className="nav-item dropdown" key={app._id}>
                           <NavLink 
                             className="nav-link" 
                             to={`/seating-components/applications/${app.name
                             .toLowerCase()
                             .replace(/[/\s]+/g, "-")}`} 
                             end
                           >
                             {app.name}
                           </NavLink>
                         </li>
                         
                        ))}
                       </ul>
                     </div>
                   </div>
                 </section>
                 
      <section className="seating-components-section">
        <div className="container">
          {seatingAbout && seatingAbout.map((about) => (
          <div className="row align-items-center justify-content-center">
            
            <div className="col-lg-6">
              <img
                src={about?.image[0]?.filepath}
                alt={`${about.alt}`}
                className="w-100"
              />
            </div>

            <div className="col-lg-6">
              <div className="seating-content">
                <h2 className="title new-title">
                  <span className="yellow-title"> {about.title1} </span> {about.title2}
                </h2>

                 <div
                   className="paragraph about-content"
                   dangerouslySetInnerHTML={{ __html: about.content }}
                 ></div>
              </div>
            </div>

           
          </div>
           ))}
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
            {seatingAppTab && seatingAppTab.map((app) => (
                <div className="col-lg-6 mt-lg-0 mt-5" key={app._id}>
              <NavLink to={`/seating-components/applications/${app.name
                  .toLowerCase()
                  .replace(/[/\s]+/g, "-")}`}
              >
              {app.image?.[0]?.filepath && (
                <img
                  // src="/images/seating/railway-metro.png"
                  src={app.image?.[0]?.filepath}
                  alt={app.alt}
                  className="seating-img"
                />
              )}

                <h4>{app.name}</h4>

                <div className="paragraph gray-para mt-4" dangerouslySetInnerHTML={{__html: app.content}}>
                </div>
              </NavLink>
            </div>
            ))}
          

          </div>
        </div>
      </section>

      <Clients />

      <ConnectSection />
    </Layout>
  );
};

export default SeatingComponents;
