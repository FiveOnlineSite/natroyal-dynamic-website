import axios from "axios";
import React, { useRef, useState } from "react";

const ConnectSection = () => {
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
    <section className="connect-section">
      <div className="container-fluid">
        <div className="row">
          {/* Left side video */}
          <div className="col-lg-6 p-lg-0 p-auto">
            <video
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
          </div>

          {/* Right side form */}
          <div className="col-lg-6 mt-lg-0 mt-5 ps-lg-5 ps-auto">
            <div className="connect-container">
              <h6 className="subtitle">Connect with Us <span></span></h6>
              <h2 className="title new-title">
                <span className="yellow-title">Get </span>In Touch
              </h2>
              <p className="paragraph">
                We’d love to hear from you! Get in touch with us for any inquiries, support, or to learn more about our products and services.
              </p>

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
    </section>
  );
};

export default ConnectSection;
