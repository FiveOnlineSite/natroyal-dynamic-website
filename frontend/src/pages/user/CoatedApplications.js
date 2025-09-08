import React, {useState, useEffect} from "react";
import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import { Navigate, NavLink, useLocation, useParams } from "react-router-dom";
import CoatedApplicationModal from "../../components/CoatedApplicationModal";
import metaDataMap from "../../data/metaDataMap";
import axios from "axios"
import MetaDataComponent from "../../components/MetaDataComponent";


const CoatedApplications = () => {
  const { category } = useParams(); // Get category from URL

  const location = useLocation()
   const currentPath = location.pathname

  const [coatedProduct, setCoatedProduct] = useState([]);

  const {name} = useParams()
  
       useEffect(() => {
          const fetchCoatedProductByAppName = async () => {
            try {
              const apiUrl = process.env.REACT_APP_API_URL;
              const response = await axios.get(`${apiUrl}/api/coated-product/application/${name}`);
              const CoatedProductData = response.data.product;
      
              setCoatedProduct(CoatedProductData);
           } catch (error) {
              console.error("Error fetching products:", error);
            } 
          };
      
          fetchCoatedProductByAppName();
        }, [name]);

        const [coatedAppTab, setCoatedAppTab] = useState([])
        
                useEffect(() => {
                  const fetchProducts = async () => {
                    try {
                      const apiUrl = process.env.REACT_APP_API_URL;
                      const response = await axios.get(`${apiUrl}/api/coated-application`);
                      const coatedAppTab = response.data.coatedApp;
              
                      setCoatedAppTab(coatedAppTab);
                   } catch (error) {
                      console.error("Error fetching applications:", error);
                    } 
                  };
              
                  fetchProducts();
                }, []);

                const [coatedAppContent, setCoatedAppContent] = useState("");
                
                     useEffect(() => {
                        const fetchCoatedAppContentByApp = async () => {
                          try {
                            const apiUrl = process.env.REACT_APP_API_URL;
                            const response = await axios.get(`${apiUrl}/api/coated-application-content/application/${name}`);
                            const CoatedAppContent = response.data.appContent;
                    
                            setCoatedAppContent(CoatedAppContent);
                         } catch (error) {
                            console.error("Error fetching application content:", error);
                          } 
                        };
                    
                        fetchCoatedAppContentByApp();
                      }, [name]);
        
  return (
    <Layout>
      <MetaDataComponent/>
      
      <Banner page={currentPath}/>

      <section className="applications-section">
        <div className="container">
          <div className="row">
             
            <ul className="application-tabs d-flex align-items-center justify-content-center">
              {coatedAppTab && coatedAppTab.map((app) => (
              <li className="nav-item dropdown" key={app._id}>
                <NavLink 
                  className="nav-link" 
                  to={`/coated-fabrics/applications/${app.name
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
          {coatedAppContent && coatedAppContent.map((appcontent) => (
        <div className="container">
        
         <h2 className="title new-title text-center">
            {" "}
            {appcontent.title1}{" "}
            {appcontent.title2 && (
              <span className="yellow-title">{appcontent.title2}</span>
            )}
          </h2>
 
          <div className="paragraph gray-para text-center" dangerouslySetInnerHTML={{__html: appcontent.content}}>
          </div>
         
        </div>
         ))}
      </section>

      <section className="application-types-section coated-application-section">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-lg-9">
              {coatedProduct &&
                coatedProduct.map((product) => (
                  <div
                    className="row align-items-center justify-content-center"
                    key={product._id}
                  >
                     {product.content === "" && (
                      <>
                       <div className="col-lg-4 mb-4">
                     {product?.image?.length > 0 && product.image[0]?.filepath && (
                        <img
                          src={product.image[0].filepath}
                          alt={product.alt || "product image"}
                          className="w-100 coated-img"
                        />
                      )}
                     
                    </div>
                    <div className="col-lg-7 offset-lg-1 mt-4 mt-lg-0">
                      <h4 className="mb-4">
                        <i>{product.name}</i>
                      </h4>
                        {product.content && (
                            <div className="paragraph gray-para" dangerouslySetInnerHTML={{__html: product.content}}>
                          </div>
                        )}
                      {product.button && (
                        <div className="d-flex mt-3">
                          {product.brochure && product.brochure?.filepath && product.brochure.filepath !== "" && (
                            <NavLink
                              to={product.brochure.filepath}
                              target="_blank"
                              className="custom-button"
                            >
                            {product.button}
                            </NavLink>
                          )}
                          
                        </div>
                      )}
                    
                    </div>
                      </>
                   
                     )}
                  </div>
                ))}
            </div>
          </div>

          
          <div className="row coated-big-img-div align-items-center justify-content-center mb-5">
            {coatedProduct &&
                coatedProduct.map((product) => (
                  <>
                  {product.content && (
                <div className="col-lg-6 col-md-6 col-12 mt-4" key={product._id}>
                  <h4 className="mb-4 text-center">
                    {product.name && <i>{product.name}</i>}
                  </h4>
                  {product.image?.[0]?.filepath && (
                    <img src={product.image?.[0].filepath} alt={product.alt} className="w-100" />
                  )} 
                </div>
                  )}
                  </>
             
                  ))}
          </div>
                
        </div>
      </section>

      <CoatedApplicationModal />
    </Layout>
  );
};

export default CoatedApplications;
