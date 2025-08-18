import React from "react";

const CoatedApplicationModal = () => {
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
                <li>
                  <a
                    className="dropdown-item"
                    href="/coated-fabrics/automotive"
                  >
                    Automotive
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/coated-fabrics/truck">
                    Truck
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/coated-fabrics/tractor">
                    Tractor
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/coated-fabrics/golf-cart">
                    Golf Cart
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="/coated-fabrics/marine-recreational-vehicles"
                  >
                    Marine & Recreational Vehicles
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="/coated-fabrics/residential-contract-furnishing"
                  >
                    Residential & Contract Furnishing
                  </a>
                </li>

                <li>
                  <a
                    className="dropdown-item"
                    href="/coated-fabrics/two-wheelers"
                  >
                    Two Wheelers
                  </a>
                </li>

                <li>
                  <a
                    className="dropdown-item"
                    href="/coated-fabrics/healthcare"
                  >
                    Healthcare
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/coated-fabrics/fashion">
                    Fashion
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/coated-fabrics/footwear">
                    Footwear
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoatedApplicationModal;
