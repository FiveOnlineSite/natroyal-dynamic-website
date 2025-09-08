import React, { useEffect } from "react";
import LandingLayout from "../../components/LandingLayout";
import BannerSlider from "../../components/BannerSlider";
import Clients from "../../components/Clients";
import ConnectSection from "../../components/ConnectSection";
import Layout from "../../components/Layout";
import { NavLink, useLocation } from "react-router-dom";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import ApplicationsModal from "../../components/ApplicationsModal";
import LandingBanner from "../../components/LandingBanner";
import { useState } from "react";
import axios from "axios";

const VinylFlooring = () => {
 const location = useLocation();
     const currentPath = location.pathname;

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

    const [vinylApp, setVinylApp] = useState("");
   

   useEffect(() => {
      const fetchVinylApp = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/vinyl-application`);
          const VinylAppData = response.data.vinylApp;
  
          setVinylApp(VinylAppData);
          console.log("Fetched name:", VinylAppData.name);
       } catch (error) {
          console.error("Error fetching application:", error);
        } 
      };
  
      fetchVinylApp();
    }, []);

      const [vinylAppWithProduct, setVinylAppWithProduct] = useState([])
    
            useEffect(() => {
              const fetchAppWithProduct = async () => {
                try {
                  const apiUrl = process.env.REACT_APP_API_URL;
                  const response = await axios.get(`${apiUrl}/api/vinyl-application/app-product`);
                  const vinylAppWithProduct = response.data.appWithProduct;
          
                  setVinylAppWithProduct(vinylAppWithProduct);
               } catch (error) {
                  console.error("Error fetching application with product:", error);
                } 
              };
          
              fetchAppWithProduct();
            }, []);
  

  return (
    <Layout>

    <LandingBanner page={currentPath}/>

       <section className="applications-section vinyl-applications-section">
          <div className="container">
            <div className="row">
              <ul className="application-tabs d-lg-flex align-items-center justify-content-center d-none">
                {vinylAppWithProduct && vinylAppWithProduct.map((app) => (
                  <li key={app._id} className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href={`/vinyl-flooring/applications/${app.name
                              .toLowerCase()
                              .replace(/[/\s]+/g, "-")}`} 
                      role="button"
                    >
                      {app.name}
                    </a>
                    <ul className="dropdown-menu">
                      {app.products && app.products.map((product) => (
                        <li key={product._id}>
                          <a 
                            className="dropdown-item" 
                            href={`/vinyl-flooring/products/${product.name
                              .toLowerCase()
                              .replace(/[/\s]+/g, "-")}`} 
                          >
                            {product.name}
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

          </div>

          <div className="row mt-3 vinyl-flooring-row">
            {vinylApp &&
                    vinylApp.map((application) => (
            <div className="col-lg-6 mt-5 px-3">
              <NavLink to={`/vinyl-flooring/applications/${application.name.toLowerCase().replace(/\s+/g, "-")}`}>
                {
                  application.image?.[0]?.filepath && (
                    <img
                      src={application.image?.[0]?.filepath}
                      alt={application.alt}
                      className="w-100"
                    />
                  )
                }
                
                <div className="vinyl-detail-div d-flex align-items-start mt-3">
                  <div className="vinyl-img-div">
                              {
                                application.icon?.[0]?.filepath && (
                                  <img src={application.icon?.[0]?.filepath} alt={application.icon_alt} />
                                )
                              }        
                  </div>
                  <div className="vinyl-content">
                    <h5>{application.name}</h5>
                    <div className="paragraph gray-para mt-3" dangerouslySetInnerHTML={{__html: application.content}}> 
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
            ))}
            
           
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
