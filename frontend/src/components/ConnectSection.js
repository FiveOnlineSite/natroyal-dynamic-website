import React from "react";

const ConnectSection = () => {
  return (
    <section className="connect-section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 p-lg-0 p-auto">
            {/* <img
                src="/images/banners/contact-banner (2).png"
                alt="contact-banner"
                className="w-100"
              /> */}
            <video
              // src="/videos/connect.mp4"
              src="https://res.cloudinary.com/dcmdihrzp/video/upload/v1751367562/India_s_Largest_Manufacturer___LVT_PVC_Flooring_Leather_Fabrics_More_wdurva.mp4"
              muted
              controls
              loop
              autoPlay
              className="w-100"
              height="100%"
              playsInline
              preload="metadata"
            ></video>
            {/* <iframe
              width="100%"
           
              height="100%"
              src="https://www.youtube.com/embed/ngbVMDCpe78?autoplay=1&mute=1&loop=1&playlist=ngbVMDCpe78&rel=0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe> */}
          </div>
          <div className="col-lg-6 mt-lg-0 mt-5 ps-lg-5 ps-auto">
            <div className="connect-container">
              <h6 className="subtitle">
                Connect with Us <span></span>
              </h6>
              <h2 className="title new-title">
                <span className="yellow-title">Get </span>In Touch
              </h2>
              <p className="paragraph">
                We’d love to hear from you! Get in touch with us for any
                inquiries, support, or to learn more about our products and
                services.
              </p>

              <div className="get-started-form mt-4">
                <form>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="mb-4">
                        <label for="name" className="form-label">
                          Name
                        </label>
                        <input type="text" className="form-control" id="name" />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="mb-4">
                        <label for="phone" className="form-label">
                          Phone
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="mb-4">
                        <label for="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="mb-4">
                        <label for="message" className="form-label">
                          Message
                        </label>
                        <textarea
                          rows="2"
                          className="form-control"
                          id="message"
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="mb-4">
                        <a
                          href="/"
                          className="custom-button no-border-btn ps-3"
                        >
                          Submit
                          <img
                            src="/images/icons/arrow-up-right.png"
                            className="ps-2"
                            alt="arrow"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
