import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import LocateUs from "../../components/LocateUs";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ContactUs = () => {

  const location = useLocation();
      const currentPath = location.pathname;

    const formRef = useRef();
  
    const [phoneError, setPhoneError] = useState("");
    const [successModal, setSuccessModal] = useState("");
    const [loading, setLoading] = useState(false);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
  
    // Validate phone number
    const handlePhoneChange = (e) => {
      const value = e.target.value.replace(/\D/g, ""); // only digits
      setPhone(value);
  
      if (value.length !== 10) {
        setPhoneError("Phone number must be 10 digits.");
      } else {
        setPhoneError("");
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (phoneError) return;
  
      setLoading(true); // disable button
  
      try {
        const currentPage = window.location.pathname;
        const apiUrl = process.env.REACT_APP_API_URL;
  
        const response = await axios.post(
          `${apiUrl}/api/contact`,
          { name, email, phone, message, page: currentPage }
        );
  
        console.log(response.data);
  
        // Show success message
        setSuccessModal("Contact form submitted successfully!");
  
        // Clear form
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        formRef.current?.reset();
      } catch (error) {
        console.error("Error sending contact form:", error.message);
  
        // Show failure message
        setSuccessModal("Failed to submit the form. Please try again.");
      } finally {
        setLoading(false); // re-enable button
        // Hide message after 3 seconds
        setTimeout(() => setSuccessModal(""), 3000);
      }
    };

  return (
    <Layout>
      <Banner page={currentPath}/>

      <section className="contact-section" id="inquire">
        <div className="container">
          <div className="contact-title">
            <h6 className="subtitle">
              Connect with Us <span></span>
            </h6>
            <h2 className="title new-title">
              {" "}
              <span className="yellow-title">Get</span> In Touch
            </h2>
            <p className="paragraph">
              We’d love to hear from you! Get in touch with us for any
              inquiries, support, or to learn more about our products and
              services.
            </p>
          </div>

          <div className="row mt-5">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-5">
                  <div className="inquire-container">
                    <div className="inquire-content">
                      <div className="single-contact">
                        <div className="contact-img">
                          <img src="/images/icons/email.png" alt="phone" />
                        </div>
                        <div className="contact-content">
                          <h5>Speak to Us</h5>
                          <a
                            href="tel:+91-22-28603516"
                            className="paragraph contact-link"
                          >
                            +91-22-28603516
                          </a>

                          <a
                            href="tel:+91-22-28603514"
                            className="paragraph contact-link"
                          >
                            +91-22-28603514
                          </a>
                        </div>
                      </div>

                      <div className="single-contact">
                        <div className="contact-img">
                          <img
                            src="/images/icons/placeholder.png"
                            alt="phone"
                          />
                        </div>
                        <div className="contact-content">
                          <h5>Write to Us</h5>
                          <a
                            href="mailto:contact@natroyalgroup.com"
                            className="paragraph contact-link"
                          >
                            contact@natroyalgroup.com
                          </a>
                        </div>
                      </div>

                      <div className="single-contact">
                        <div className="contact-img">
                          <img src="/images/icons/phone.png" alt="phone" />
                        </div>
                        <div className="contact-content">
                          <h5>Visit Us</h5>
                          <a
                            href="https://maps.app.goo.gl/85RC6CoSMz19U3an8"
                            target="_blank"
                            className="paragraph contact-link"
                          >
                            60 CD Shlok, Government Industrial Estate, Charkop,
                            Kandivali West, Mumbai 400 067.
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="connect-container">
                    <div className="get-started-form mt-4">
                    <form onSubmit={handleSubmit} ref={formRef}>
                  <div className="row">
                    <div className="col-lg-12 mb-4">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-lg-6 mb-4">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        maxLength="10"
                        required
                      />
                      {phoneError && <small className="text-danger">{phoneError}</small>}
                    </div>

                    <div className="col-lg-6 mb-4">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-lg-12 mb-4">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        rows="2"
                        className="form-control"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <div className="col-lg-12 mb-4">
                      <button
                        type="submit"
                        className="custom-button no-border-btn ps-3"
                        disabled={loading || phoneError}
                      >
                        {loading ? "Submitting..." : "Submit"}
                        <img
                          src="/images/icons/arrow-up-right.png"
                          className="ps-2"
                          alt="arrow"
                        />
                      </button>
                    </div>
                  </div>
                </form>

                {/* Popup message */}
                {successModal && (
                  <div className={`alert ${successModal.includes("Failed") ? "alert-danger" : "alert-success"} mt-3`}>
                    {successModal}
                  </div>
                )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LocateUs />

      <section className="map-section">
        <div className="map-div">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.7357613486574!2d72.8236448!3d19.206740200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6b766d8cd4d%3A0x2ecfd7aa84098628!2sNatroyal%20Industries%20Pvt%20Ltd%20%2F%20Vinyl%20Flooring%20%2FCoated%20Fabric%20%2FPU%20Leather%20Manufacturer%20in%20Mumbai!5e0!3m2!1sen!2sin!4v1736507784285!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="map"
          ></iframe>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
