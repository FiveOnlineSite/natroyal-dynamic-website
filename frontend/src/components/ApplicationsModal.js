import axios from "axios";
import React, { useEffect, useState } from "react";

const ApplicationsModal = () => {

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
    <div className="applications-accordions">
      {/* Applications Button - Opens Modal */}
      <button
        className="btn application-btn"
        data-bs-toggle="modal"
        data-bs-target="#applicationsModal"
        type="button"
      >
        Applications <i className="fa-solid fa-arrow-up"></i>
      </button>

      {/* Applications Modal */}
      <div
        className="modal fade modal-bottom-slide full-width-modal"
        id="applicationsModal"
        tabIndex="-1"
        aria-labelledby="applicationsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-bottom">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="applicationsModalLabel">
                Applications <i className="fa-solid fa-arrow-down"></i>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
              </button>
            </div>

           <div className="modal-body">
            <div className="accordion" id="applicationsAccordion">
              {vinylAppWithProduct &&
                vinylAppWithProduct.map((app, index) => {
                  const collapseId = `collapse-${app._id}`;
                  const headingId = `heading-${app._id}`;
                  return (
                    <div className="accordion-item" key={app._id}>
                      <h2 className="accordion-header" id={headingId}>
                        <button
                          className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${collapseId}`}
                          aria-expanded={index === 0 ? "true" : "false"}
                          aria-controls={collapseId}
                        >
                          {app.name}
                        </button>
                      </h2>
                      <div
                        id={collapseId}
                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                        aria-labelledby={headingId}
                        data-bs-parent="#applicationsAccordion"
                      >
                        <div className="accordion-body">
                          <ul>
                            {app.products &&
                              app.products.map((product) => (
                                <li key={product._id}>
                                  <a
                                    className="dropdown-item"
                                    href={
                                      product.name === "LVT"
                                        ? "/lvt-flooring"
                                        : `/vinyl-flooring/products/${product.name
                                            .toLowerCase()
                                            .replace(/[/\s]+/g, "-")}`
                                    }
                                  >
                                    {product.name}
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsModal;
