import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { NavLink, useLocation } from "react-router-dom";
import Clients from "../../components/Clients";
import ConnectSection from "../../components/ConnectSection";
import LandingBanner from "../../components/LandingBanner";
import axios from "axios";
import { useState } from "react";
import MetaDataComponent from "../../components/MetaDataComponent";

const CoatedFabrics = () => {

  const location = useLocation();
      const currentPath = location.pathname;

  const [coatedApp, setCoatedApp] = useState([])

  useEffect(() => {
      const fetchCoatedFabricsApp = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/coated-application`);
          const CoatedFabricsAppData = response.data.coatedApp;
  
          setCoatedApp(CoatedFabricsAppData);
          console.log("Fetched name:", CoatedFabricsAppData.name);
        } catch (error) {
          console.error("Error fetching application:", error);
        } 
      };
  
      fetchCoatedFabricsApp();
    }, []);

    const [coatedFeature, setCoatedFeature] = useState([])

    useEffect(() => {
        const fetchCoatedFeature = async () => {
          try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${apiUrl}/api/coated-feature`);
            const coatedFeatureData = response.data.CoatedFeature;
    
            setCoatedFeature(coatedFeatureData);
            console.log("Fetched name:", coatedFeatureData.name);
          } catch (error) {
            console.error("Error fetching coated feature:", error);
          } 
        };
    
        fetchCoatedFeature();
      }, []);
    

  return (
    <Layout>
         <MetaDataComponent/>
    <LandingBanner page={currentPath}/>

      <section className="applications-section">
        <div className="container">
          <div className="row">
            <ul className="application-tabs d-flex align-items-center justify-content-center">
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/coated-fabrics">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/awards-and-recognition">
                  Awards & Recognition
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/research-and-development">
                  Research & Development (R&D)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="application-section">
        <div className="container">
          <h2 className="title new-title text-center">
            <span className="yellow-title"> We manufacture,</span> supply and
            export
          </h2>
          <div className="row applications-row mt-5">
            {coatedApp && coatedApp.map((application) => (
               <div className="col-lg-6">
              <NavLink to={`/coated-fabrics/applications/${application.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="single-application">
                  {
                  application.image?.[0]?.filepath && (
                    <img
                      src={application.image?.[0]?.filepath}
                      alt={application.alt}
                      className="w-100"
                    />
                  )
                }
                
                  <div className="application-content">
                    <h5>{application.name}</h5>
                    {/* <p className="application-para">
                      Natroyal leads in performance-coated fabrics for cars,
                      buses, and motorcycles. We are India's first to develop
                      phase-change material for heat management.
                    </p> */}
                  </div>
                  <div className="application-overlay">
                    <div className="application-border">
                      <NavLink to={`/coated-fabrics/applications/${application.name.toLowerCase().replace(/\s+/g, "-")}`}>
                        View More
                      </NavLink>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
            )
          )}
           
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2 className="title new-title">
                {" "}
                <span className="yellow-title"> Features of</span> Automotive
                Leatherette/Coated Fabrics
              </h2>
            </div>
          </div>
          <div className="row mt-4">
            {coatedFeature && coatedFeature.map((feature) => (
               <div className="col-lg-2 col-md-4 col-6" key={feature._id}>
              <div className="features-div">
                {feature.icon?.[0]?.filepath && (
                  <img src={feature.icon?.[0]?.filepath} alt={feature.alt} className="w-100"/>
                )}
                
                <h6>{feature.name}</h6>
              </div>
            </div>
            ))}
           
         
          </div>
        </div>
      </section>

      <section className="business-section">
        <div className="container">
          <h2 className="title new-title">
            {" "}
            <span className="yellow-title"> We are a </span>export-ready
            business
          </h2>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-4">
              <div className="business-points">
                <img
                  src="/images/icons/Group 869 1.png"
                  alt="icons"
                  className="mb-3"
                />
                <h5>Star rated export</h5>{" "}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-4">
              <div className="business-points">
                <img
                  src="/images/icons/Group 868 1.png"
                  alt="icons"
                  className="mb-3"
                />
                <h5>3-4 Weeks time</h5>{" "}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-4">
              <div className="business-points">
                <img
                  src="/images/icons/Group 867 1.png"
                  alt="icons"
                  className="mb-3"
                />
                <h5>60+ Years of legacy</h5>{" "}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-4">
              <div className="business-points">
                <img
                  src="/images/icons/Group 866 1.png"
                  alt="icons"
                  className="mb-3"
                />
                <h5>International quality</h5>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Clients />

      <ConnectSection />
    </Layout>
  );
};

export default CoatedFabrics;
