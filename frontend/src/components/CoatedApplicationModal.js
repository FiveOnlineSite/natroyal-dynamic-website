import axios from "axios";
import React, { useEffect, useState } from "react";

const CoatedApplicationModal = () => {

  const [coatedApp, setCoatedApp] = useState([])
        
                useEffect(() => {
                  const fetchApp = async () => {
                    try {
                      const apiUrl = process.env.REACT_APP_API_URL;
                      const response = await axios.get(`${apiUrl}/api/coated-application`);
                      const coatedApp = response.data.coatedApp;
              
                      setCoatedApp(coatedApp);
                   } catch (error) {
                      console.error("Error fetching application :", error);
                    } 
                  };
              
                  fetchApp();
                }, []);
  

  return (
    <div className="applications-accordions">
      {/* Applications Button - Opens Modal */}
      <button
        className="btn application-btn"
        data-bs-toggle="modal"
        data-bs-target="#applicationsModal"
      >
        Applications <i class="fa-solid fa-arrow-up"></i>
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
                Applications <i class="fa-solid fa-arrow-down"></i>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body coated-app-modal-body">
              <ul>
                <li>
                  <a className="dropdown-item" href="/coated-fabrics">
                    Home
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/about-coated">
                    About
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/research-and-development">
                    Research & Development (R&D)
                  </a>
                </li>
                {coatedApp &&
                coatedApp.map((app) => {
                  return (
                <li key={app._id}>
                  <a
                    className="dropdown-item"
                    href={`/coated-fabrics/applications/${app.name
                    .toLowerCase()
                    .trim()
                    .replace(/&/g, "and")
                    .replace(/\//g, "-")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "")
                  }`}
                    end
                  >
                    {app.name}
                  </a>
                </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoatedApplicationModal;
