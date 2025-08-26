import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import LocateUs from "../../components/LocateUs";

const ContactUs = () => {
  const bannerData = {
    // bannerImg: "/images/banners/pexels-heyho-7031827.png",
    bannerImg:
      "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277301/pexels-heyho-7031827_cvgrso.png",
    title: "Contact Us",
    breadcrumbs: [
      { label: "Home", path: "/", active: false },
      { label: "Contact Us", path: null, active: true },
    ],
  };

  useEffect(() => {
    const fetchMetaTag = async () => {
      // Canonical URL logic
      const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute("href", canonicalUrl);
      } else {
        linkCanonical = document.createElement("link");
        linkCanonical.rel = "canonical";
        linkCanonical.href = canonicalUrl;
        document.head.appendChild(linkCanonical);
      }

      // 💡 Set static meta tags BEFORE the fetch
      const defaultMeta = {
        title:
          "Contact Natroyal Group | Leading Manufacturer of Luxury Vinyl Plank & Tile, PVC Flooring, Coated Fabrics, Faux Leather & Seating Components",
        description:
          "Connect with Natroyal Group – India’s leading manufacturer and exporter of Luxury Vinyl Plank & Tile, PVC vinyl flooring, coated fabrics, faux leather, knit fabrics, and seating components. Reach out for product inquiries, customer support, or business collaborations.",
        keyword:
          "Contact Natroyal Group, Natroyal customer care, Luxury Vinyl Tile manufacturer India, Luxury Vinyl Plank supplier, faux leather manufacturer India, coated fabrics supplier, PVC flooring exporter, seating components supplier, IATF 16949 certified manufacturer, knit fabric supplier India, vinyl tile support, Natroyal Ahmedabad contact",
      };

      // Add meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", defaultMeta.description);

      // Add meta keywords
      let metaKeyword = document.querySelector('meta[name="keywords"]');
      if (!metaKeyword) {
        metaKeyword = document.createElement("meta");
        metaKeyword.name = "keywords";
        document.head.appendChild(metaKeyword);
      }
      metaKeyword.setAttribute("content", defaultMeta.keyword);

      document.title = defaultMeta.title;
    };
    console.log(document.querySelector('meta[name="description"]').content);
    fetchMetaTag();
  }, []);

  return (
    <Layout>
      <Banner
        bannerImg={bannerData.bannerImg}
        title={bannerData.title}
        breadcrumbs={bannerData.breadcrumbs}
      />

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
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="mb-4">
                              <label for="name" className="form-label">
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                              />
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
                                href="#"
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
