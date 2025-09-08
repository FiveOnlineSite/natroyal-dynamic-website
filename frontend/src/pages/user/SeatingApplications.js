import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Navigate, NavLink, useLocation, useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import { useEffect } from "react";
import metaDataMap from "../../data/metaDataMap";
import axios from "axios";

const SeatingApplications = () => {
  const { category, name } = useParams(); 


const location = useLocation()
   const currentPath = location.pathname

  useEffect(() => {
    const meta = metaDataMap.seatingComponents[category] || {
      title: "Vinyl Flooring Applications | Natroyal",
      description:
        "Explore a wide range of vinyl flooring applications by Natroyal. Durable, stylish, and suited for every space.",
      keywords:
        "vinyl flooring, flooring applications, commercial vinyl flooring, residential vinyl flooring",
    };

    // Set Document Title
    document.title = meta.title;

    // Utility to update or create meta tag
    const updateMeta = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.name = name;
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Apply metadata
    updateMeta("description", meta.description);
    updateMeta("keywords", meta.keywords);

    // Set canonical tag
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.rel = "canonical";
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonicalUrl;
  }, [category]);

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

  const [seatingProductByApp, setSeatingProductByApp] = useState([])
          
    useEffect(() => {
      const fetchSeatingProductByApp = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/seating-product/application/${name}`);
          const seatingProductByApp = response.data.product;
                
          setSeatingProductByApp(seatingProductByApp);
        } catch (error) {
        console.error("Error fetching products:", error);
        } 
      };
                
      fetchSeatingProductByApp();
    }, []);

   const [seatingAppContent, setSeatingAppContent] = useState([]);
                
   useEffect(() => {
      const fetchCoatedAppContentByApp = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/seating-application-content/application/${name}`);
          const SeatingAppContent = response.data.content;
                    
          setSeatingAppContent(SeatingAppContent);
        } catch (error) {
          console.error("Error fetching application content:", error);
        } 
      };
      
      fetchCoatedAppContentByApp();
      }, [name]);

  return (
    <Layout>
      <Banner page={currentPath}/>

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

    <section className="vinyl-applications-section">
      <div className="container">
        {seatingAppContent && seatingAppContent.map((appcontent) => (
          <React.Fragment key={appcontent._id}>
            <h2 className="title new-title text-center">
              {appcontent.title1} 
              {appcontent.title2 && (
                <span className="yellow-title">{appcontent.title2}</span>
              )}
            </h2>

            {appcontent.content && (
              <div
                className="paragraph gray-para text-start"
                dangerouslySetInnerHTML={{ __html: appcontent.content }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>


      <section className="pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="row justify-content-center">
                {seatingProductByApp && seatingProductByApp.map((product, index) => (
                  <div className="col-lg-4 col-md-6 col-12" key={index}>
                    <div className="mission-div mb-5">
                      <div className="mission-no">{product.sequence}</div>
                      <div className="seating-application-img">
                        {product.image?.[0].filepath && (
                          <img
                            src={product.image?.[0].filepath}
                            alt="seating"
                            className="w-100"
                          />
                        )}
                        
                        {product.name && (
                          <div className="text-center mt-4" dangerouslySetInnerHTML={{__html: product.name}}>
                            
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SeatingApplications;
