import React from "react";

const ApplicationsModal = () => {
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
              {/* Individual Accordions (No Nested Structure) */}
              <div className="accordion" id="applicationsAccordion">
                {/* Education */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseEducation"
                      aria-expanded="true"
                      aria-controls="collapseEducation"
                    >
                      Education
                    </button>
                  </h2>
                  <div
                    id="collapseEducation"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#applicationsAccordion"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>
                          <a className="dropdown-item" href="/moonwalk">
                            Moonwalk
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/accord">
                            Accord
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/mirakle">
                            Mirakle
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/symphony">
                            Symphony
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/star-trek">
                            Star Trek
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/royal-star">
                            Royal Star
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/elegant">
                            Elegant
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dazzle">
                            Dazzle
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/lvt-flooring">
                            LVT
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/tiger">
                            Tiger
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/avengers">
                            Avengers
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Healthcare */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseHealthcare"
                      aria-expanded="false"
                      aria-controls="collapseHealthcare"
                    >
                      Healthcare
                    </button>
                  </h2>
                  <div
                    id="collapseHealthcare"
                    className="accordion-collapse collapse"
                    data-bs-parent="#applicationsAccordion"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>
                          <a className="dropdown-item" href="/moonwalk">
                            Moonwalk
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/accord">
                            Accord
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/mirakle">
                            Mirakle
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/wally">
                            Wally
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/star-trek">
                            Star Trek
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/orbit">
                            Orbit
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/royal-star">
                            Royal Star
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/dazzle">
                            Dazzle
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/lvt-flooring">
                            LVT
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/tiger">
                            Tiger
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/avengers">
                            Avengers
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Wet Areas */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseWetAreas"
                      aria-expanded="false"
                      aria-controls="collapseWetAreas"
                    >
                      Wet Areas
                    </button>
                  </h2>
                  <div
                    id="collapseWetAreas"
                    className="accordion-collapse collapse"
                    data-bs-parent="#applicationsAccordion"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>
                          <a className="dropdown-item" href="/aqua-rs">
                            Aqua RS
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Residential */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseResidential"
                      aria-expanded="false"
                      aria-controls="collapseResidential"
                    >
                      Residential
                    </button>
                  </h2>
                  <div
                    id="collapseResidential"
                    className="accordion-collapse collapse"
                    data-bs-parent="#applicationsAccordion"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>
                          <a className="dropdown-item" href="/royal-star">
                            Royal Star
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/moonwalk">
                            Moonwalk
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/accord">
                            Accord
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/majesty-pro">
                            Majesty Pro
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/opera">
                            Opera
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/elegant">
                            Elegant
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dazzle">
                            Dazzle
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/royal-classic">
                            Royal Classic
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/lvt-flooring">
                            LVT
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/mirakle">
                            Mirakle
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/majesty">
                            Majesty
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/printed-flooring">
                            Printed Flooring
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Offices/Retail */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOffices"
                      aria-expanded="false"
                      aria-controls="collapseOffices"
                    >
                      Offices/Retail
                    </button>
                  </h2>
                  <div
                    id="collapseOffices"
                    className="accordion-collapse collapse"
                    data-bs-parent="#applicationsAccordion"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>
                          <a className="dropdown-item" href="/moonwalk">
                            Moonwalk
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/accord">
                            Accord
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/mirakle">
                            Mirakle
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/symphony">
                            Symphony
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/star-trek">
                            Star Trek
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/orbit">
                            Orbit
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/suprema-rs">
                            Suprema RS
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/standard-rs">
                            Standard RS
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/aqua-rs">
                            Aqua RS
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/royal-star">
                            Royal Star
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/elegant">
                            Elegant
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dazzle">
                            Dazzle
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/lvt-flooring">
                            LVT
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/majesty-pro">
                            Majesty Pro
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/majesty">
                            Majesty
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/royal-classic">
                            Royal Classic
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/tiger">
                            Tiger
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/avengers">
                            Avengers
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseHospitality"
                      aria-expanded="false"
                      aria-controls="collapseHospitality"
                    >
                      Hospitality
                    </button>
                  </h2>
                  <div
                    id="collapseHospitality"
                    className="accordion-collapse collapse"
                    data-bs-parent="#applicationsAccordion"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>
                          <a className="dropdown-item" href="/moonwalk">
                            Moonwalk
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/accord">
                            Accord
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/mirakle">
                            Mirakle
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/tuff">
                            Tuff
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/symphony">
                            Symphony
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/star-trek">
                            Star Trek
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/sonata">
                            Sonata
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/suprema-rs">
                            Suprema RS
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/standard-rs">
                            Standard RS
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/aqua-rs">
                            Aqua RS
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/eco-plus-v">
                            Eco Plus V
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/royal-star">
                            Royal Star
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/tiger">
                            Tiger
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/avengers">
                            Avengers
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTransport"
                      aria-expanded="false"
                      aria-controls="collapseTransport"
                    >
                      Transport
                    </button>
                  </h2>
                  <div
                    id="collapseTransport"
                    className="accordion-collapse collapse"
                    data-bs-parent="#applicationsAccordion"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>
                          <a className="dropdown-item" href="/sonata">
                            Sonata
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/suprema-rs">
                            Suprema RS
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/eco-plus-v">
                            Eco Plus V
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/gripper">
                            Gripper
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSports"
                      aria-expanded="false"
                      aria-controls="collapseSports"
                    >
                      Sports
                    </button>
                  </h2>
                  <div
                    id="collapseSports"
                    className="accordion-collapse collapse"
                    data-bs-parent="#applicationsAccordion"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>
                          <a className="dropdown-item" href="/avengers">
                            Avengers
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
              </div>{" "}
              {/* End Accordions */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsModal;
