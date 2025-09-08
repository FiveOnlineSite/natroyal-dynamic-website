import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Navigate, NavLink, useLocation, useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import { Modal } from "react-bootstrap";
import ApplicationsModal from "../../components/ApplicationsModal";
import innerAppMetaDataMap from "../../data/innerAppMetaDataMap";
import axios from "axios";

const VinylnnerApplication = () => {
  const [technicalModal, setTechnicalModal] = useState(false);
  const [installModal, setInstallModal] = useState(false);

  const { name } = useParams(); // Get innercategory from URL
 const location = useLocation()
  const currentPath = location.pathname

  useEffect(() => {
    const meta = innerAppMetaDataMap[name] || {
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
  }, [name]);

  const openModal = (type) => {
    if (type === "technical") {
      setTechnicalModal(true);
    } else if (type === "install") {
      setInstallModal(true);
    }
  };

  const closeModal = () => {
    setTechnicalModal(false);
    setInstallModal(true);
  };

  const [vinylProductContent, setVinylProductContent] = useState([]);
  
        useEffect(() => {
           const fetchVinylProductContentByProductName = async () => {
             try {
               const apiUrl = process.env.REACT_APP_API_URL;
               const response = await axios.get(`${apiUrl}/api/vinyl-product-content/product/${name}`);
               const VinylProductContentData = response.data.productContent;
       
               setVinylProductContent(VinylProductContentData);
            } catch (error) {
               console.error("Error fetching product content:", error);
             } 
           };
       
           fetchVinylProductContentByProductName();
         }, [name]);
    
      const [vinylProductVariant, setVinylProductVariant] = useState("");
  
       useEffect(() => {
          const fetchVinylProductVariantByProductName = async () => {
            try {
              const apiUrl = process.env.REACT_APP_API_URL;
              const response = await axios.get(`${apiUrl}/api/vinyl-product-variant/product/${name}`);
              const VinylProductVaraiantData = response.data.productVariant;
      
              setVinylProductVariant(VinylProductVaraiantData);
           } catch (error) {
              console.error("Error fetching product variant:", error);
            } 
          };
      
          fetchVinylProductVariantByProductName();
        }, [name]);

        const [buttonData, setButtonData] = useState("")

        useEffect(() => {
          const fetchButtons = async () => {
            try {
              const apiUrl = process.env.REACT_APP_API_URL;
              const response = await axios.get(`${apiUrl}/api/button`);
              const buttonData = response.data.button;
      
              setButtonData(buttonData);
           } catch (error) {
              console.error("Error fetching buttons:", error);
            } 
          };
      
          fetchButtons();
        }, []);

        const [suitableApp, setSuitableApp] = useState([]);
  
       useEffect(() => {
          const fetchSuitableByAppName = async () => {
            try {
              const apiUrl = process.env.REACT_APP_API_URL;
              const response = await axios.get(`${apiUrl}/api/suitable/application/${name}`);
              const SuitableAppData = response.data.suitable;
      
              setSuitableApp(SuitableAppData);
           } catch (error) {
              console.error("Error fetching suitable content:", error);
            } 
          };
      
          fetchSuitableByAppName();
        }, [name]);

        const [appWithSuitable, setAppWithSuitable] = useState([]);
  
       useEffect(() => {
          const fetchAppWithSuitable = async () => {
            try {
              const apiUrl = process.env.REACT_APP_API_URL;
              const response = await axios.get(`${apiUrl}/api/vinyl-product/product/${name}`);
              const appWithSuitable = response.data.suitable;
      
              setAppWithSuitable(appWithSuitable);
           } catch (error) {
              console.error("Error fetching application by product:", error);
            } 
          };
      
          fetchAppWithSuitable();
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
    <>
      <Layout>
        <Banner page={currentPath} />

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

        <section className="vinyl-applications-section">
          <div className="container">
             {vinylProductContent && vinylProductContent.map((productContent) => (
            <div className="row">
              <div className="col-lg-4">
                <h2 className="title new-title text-start pt-0">
            
                  {productContent.title1} {""}
                  {productContent.title2 && (
                     <span className="yellow-title">
                    {productContent.title2}
                  </span>
                  )}
                </h2>
              </div>
              <div className="col-lg-8">
                <ul className="d-flex flex-column justify-content-center align-items-start">
                  
                    <div className="paragraph gray-para" dangerouslySetInnerHTML={{ __html: productContent.content}}>
                     
                    </div>
                </ul>
              </div>
             
            </div>
              ))}
          </div>
        </section>

        <section className="application-types-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="row">
                      {vinylProductVariant && vinylProductVariant.map(
                        (variant) => (
                          <div
                            className="col-lg-3 col-md-6 col-12 mt-4"
                            key={variant._id}
                          >
                            <div className="single-application-div">
                              {variant.image?.[0]?.filepath && (
                                 <div className="single-application-img">
                                <img
                                  src={variant.image?.[0].filepath}
                                  alt={variant.alt}
                                />
                              </div>
                              )}

                              <h4>{variant.name}</h4>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                 <div className="col-lg-3 offset-lg-1 mt-lg-0 mt-5">
                    <h3 className="suitable-for-title">Suitable For</h3>
                    <div className="row ">
                      {appWithSuitable &&
                        appWithSuitable.map((suitable) => (
                          <div
                            className="col-lg-7 col-md-6 col-sm-6 col-xs-12 mt-4"
                            key={suitable._id}
                          >
                            <NavLink to={`/vinyl-flooring/applications/${suitable.application.name
                              .toLowerCase()
                              .replace(/[/\s]+/g, "-")}`} 
                            >
                              <div className="suitable-div">
                                <div className="suitable-img-div">
                                  {suitable.application?.image?.[0]?.filepath && (
                                    <img
                                      src={suitable.application.image[0].filepath}
                                      alt={suitable.application.alt}
                                      width="120px"
                                      height="120px"
                                    />
                                  )}
                                </div>
                                <h6>{suitable.application?.name}</h6>
                               
                              </div>
                            </NavLink>
                          </div>
                        ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="row mt-5 ">
              <div className="col-lg-12">
                <div className="row d-flex align-item-center justify-content-start application-tags-row">
                  {/* <NavLink
                  to="/docs/Product Range Catlog_2014_10 Low.pdf"
                  target="_blank"
                >
                  <div className="tags-div ">
                    <div className="single-tag application-tag">
                      <h6 className="tag">Open e-brochure</h6>
                    </div>
                  </div>
                </NavLink> */}


                  <div className="d-flex my-4 w-auto">
                    <button
                      className="custom-button vinyl-button"
                      onClick={() => openModal("technical")}
                    >
                      Technical Specification
                    </button>
                  </div>

                  <div className="d-flex my-4 w-auto">
                    <button
                      className="custom-button vinyl-button"
                      onClick={() => openModal("install")}
                    >
                      Installation & Maintenance
                    </button>
                  </div>

                  {buttonData.brochure?.filepath && (
                  <div className="d-flex my-4 w-auto">
                    <NavLink
                      to={buttonData.brochure?.filepath}
                      target="_blank"
                      className="custom-button vinyl-button"
                    >
                      Open e-brochure
                    </NavLink>
                  </div>

                  )}

              
                  <div className="d-flex my-4 w-auto">
                    <NavLink
                      to="/contact-us#inquire"
                      className="custom-button vinyl-button"
                    >
                      Enquiry Now
                    </NavLink>
                  </div>

                  {/* <NavLink to="/contact-us#inquire">
                  <div className="tags-div">
                    <div className="single-tag application-tag">
                      <h6 className="tag">Enquiry Now</h6>
                    </div>
                  </div>
                </NavLink> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="suitable-for-section">
          <div className="container"></div>
        </section>

        <ApplicationsModal />
      </Layout>

      {technicalModal ? (
        <Modal
          centered
          show={technicalModal}
          onHide={() => setTechnicalModal(false)}
        >
            <img src={buttonData.technical_specification.filepath} alt={buttonData.technical_specification.filename} />
        
        </Modal>
      ) : null}

      {installModal ? (
        <Modal
          centered
          show={installModal}
          size="lg"
          onHide={() => setInstallModal(false)}
        >
          <Modal.Body>
            <div className="install-modal">
              {/* <h3 className="mt-4">The Sub Floor</h3>
              <p className="thankyou-msg">
                Sub floor plays important role for any type of installation job,
                hence it is important to ensure that sub floor is evenly
                levelled, dry, tuff and ready for PVC flooring installation
              </p>

              <h3 className="mt-4">General guidelines for making sub floor.</h3>
              <p className="thankyou-msg">
                Base floor should have following properties:
              </p>

              <ul>
                <li>
                  Absolutely hard, level, dry, smooth and ready for
                  installation.
                </li>
                <li>
                  Free from cracks, irregularities , If any should be corrected
                  with appropriate material.
                </li>
                <li>
                  No contamination with oil, grease, paint or any other
                  substance which affects the adhesion.
                </li>
                <li>
                  Use cement based products for sub floor preparation and should
                  be evenly spread
                </li>
                <li>
                  Flat surface with maximum deflexion for 2m spirit level : for
                  0.20m spirit level : 2mm
                </li>
                <li>
                  Moisture content should not be more than 75% R.H. Drying time
                  is required of approximately 1 day per to be measured.
                </li>
                <li>Smoothing compound to use for perfectly smooth floor.</li>
                <li>
                  Floor covering should be laid up to the joints and joints to
                  be covered with an plastic or metal joint cover
                </li>
                <li>
                  Damp proof membrane to laid before installation in case of sub
                  floor direct to ground. This membrane act as a water proof
                  layer.
                </li>
                <li>
                  If there is old carpet, old vinyl, linoleum or rubber flooring
                  already laying remove, clean and apply smoothing compound
                </li>
              </ul>

              <h3 className="mt-4">Sheet laying method:</h3>

              <ul>
                <li>The unrolled sheet must left in the room to be covered</li>
                <li>
                  Vinyl sheet to be laid length wise in the same direction.
                </li>
                <li>Fold back sheet half way.</li>
                <li>Apply Rubber based / Acrylic emulsion adhesive</li>
                <li>
                  Long open time of adhesive will lead to poor transfer of
                  Adhesive. Less open time of adhesive will lead to bubble
                  formation. Refer Adhesive manufacturer’s instruction manual
                </li>
                <li>
                  Smooth down manually and then roll with a 65 kg flooring
                  roller
                </li>
                <li>Grooving and Hot welding to be done after 24 hours</li>
                <li>
                  Do not traffic the floor coverings for 48 hours after
                  installation
                </li>
              </ul>

              <h3 className="mt-4">Maintenance</h3>

              <ul>
                <li>
                  Vinyl Flooring can be cleaned daily with a damp mop and weekly
                  or fortnightly with a mild soap solution.
                </li>
                <li>
                  Severely soiled or floors with stubborn stains can be cleaned
                  with the use of a coir brush or fine steel wool no. 000 soaked
                  in warm soap solution to clean the affected area.
                </li>
                <li>
                  Clear water mopping is necessary to remove chemical spillage
                  on the flooring and after scrubbing operation to remove
                  residue.
                </li>
                <li>
                  Do not throw lit cigarette butts or match sticks on the floor.
                </li>
                <li>
                  Avoid dragging heavy furniture / objects to prevent scratches.
                </li>
                <li>
                  Application of wax polish or floor finish should never be used
                  as it will build up an insulating film on the surface
                </li>
              </ul>
              
              */}

              <div dangerouslySetInnerHTML={{ __html: buttonData.installation_maintenance}}></div>
            </div> 
          </Modal.Body>
        </Modal>
      ) : null}
    </>
  );
};

export default VinylnnerApplication;
