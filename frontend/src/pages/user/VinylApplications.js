import React from "react";
import Layout from "../../components/Layout";
import { Navigate, NavLink, useLocation, useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import ApplicationsModal from "../../components/ApplicationsModal";
import { useEffect } from "react";
import metaDataMap from "../../data/metaDataMap";
import axios from "axios";
import { useState } from "react";

const VinylApp = () => {
  const { category } = useParams(); // Get category from URL

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const meta = metaDataMap.vinylFlooring[category] || {
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

   const { name } = useParams();

   const [vinylAppContent, setVinylAppContent] = useState([]);

      useEffect(() => {
         const fetchVinylAppContentByAppName = async () => {
           try {
             const apiUrl = process.env.REACT_APP_API_URL;
             const response = await axios.get(`${apiUrl}/api/vinyl-application-content/application/${name}`);
             const VinylAppContentData = response.data.appContent;
     
             setVinylAppContent(VinylAppContentData);
          } catch (error) {
             console.error("Error fetching application:", error);
           } 
         };
     
         fetchVinylAppContentByAppName();
       }, [name]);
  
    const [vinylProduct, setVinylProduct] = useState("");

     useEffect(() => {
        const fetchVinylProductByAppName = async () => {
          try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${apiUrl}/api/vinyl-product/application/${name}`);
            const VinylProductData = response.data.products;
    
            setVinylProduct(VinylProductData);
         } catch (error) {
            console.error("Error fetching application:", error);
          } 
        };
    
        fetchVinylProductByAppName();
      }, [name]);

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

    <Banner page={currentPath}/>

        <section className="applications-section vinyl-applications-section">
          <div className="container">
            <div className="row">
             <ul className="application-tabs d-lg-flex align-items-center justify-content-center d-none">
  {vinylAppWithProduct &&
    vinylAppWithProduct.map((app) => {
      const appSlug = app.name
        .toLowerCase()
        .replace(/[/\s]+/g, "-")
        .replace(/\//g, "-");

      return (
        <li key={app._id} className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href={`/vinyl-flooring/applications/${appSlug}`}
            role="button"
          >
            {app.name}
          </a>

          <ul className="dropdown-menu">
            {app.products &&
              app.products.map((product) => {
                const slug = product.name
                  .toLowerCase()
                  .replace(/[/\s]+/g, "-")
                  .replace(/\//g, "-");

                const productHref =
                  product.name.toLowerCase() === "lvt"
                    ? "/lvt-flooring"
                    : `/vinyl-flooring/products/${slug}`;

                return (
                  <li key={product._id}>
                    <a className="dropdown-item" href={productHref}>
                      {product.name}
                    </a>
                  </li>
                );
              })}
          </ul>
        </li>
      );
    })}
</ul>

            </div>
          </div>
        </section>


      <section className="vinyl-applications-section">
        {vinylAppContent && vinylAppContent.map((content) => (
           <div className="container">
          <h2 className="title new-title text-center">
            {" "}
            {content.title1} {""}
            {content.title2 && (
            <span className="yellow-title">{content.title2}</span>
            
            )}
            
          </h2>

          <p className="paragraph gray-para text-center" dangerouslySetInnerHTML={{__html: content.content}}>
          </p>
        </div>
        ))}
       
      </section>

      <section className="application-types-section">
        <div className="container">
          <div className="row">
            {vinylProduct && vinylProduct.map((product) => {
              // condition for LVT
              const productHref =
                product.name.toLowerCase() === "lvt"
                  ? "/lvt-flooring"
                  : `/vinyl-flooring/products/${product.name.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-")}`;

              return (
                <div className="col-lg-2 col-md-6 col-12 mt-4" key={product._id}>
                  <NavLink to={productHref}>
                    <div className="single-application-div">
                      {product.image?.[0]?.filepath && (
                        <div className="single-application-img">
                          <img src={product.image?.[0]?.filepath} alt={product.alt} />
                        </div>
                      )}
                      <h4>{product.name}</h4>
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <ApplicationsModal />
    </Layout>
  );
};

export default VinylApp;
