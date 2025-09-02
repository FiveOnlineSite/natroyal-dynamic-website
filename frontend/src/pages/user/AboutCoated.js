import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { NavLink } from "react-router-dom";
import TestimonialSlider from "../../components/TestimonialSlider";

const AboutCoated = () => {
  const testimonialData = [
    {
      content:
        "I approached NatRoyal Group because  I was looking for customized coated fabrics and I am completely satisfied with the quality of products & quick service with which you guys are helping me with.",
      name: "Binati Daswani",
      designation: "Head of Purchase, VMC Auto Association",
    },
    {
      content:
        "We developed a great partnership with Natroyal Group, Their dedication to meet our requirements was exceptional. We appreciate their attention to detail & a quick turn around time even for our international delivery.",
      name: "Anuj Seth",
      designation: "Procurement Specialist, Ena Furnishings & Designs",
    },
    {
      content:
        "Working with Natroyal Group has been an outstanding experience.Their team has always provided great customer service.Purchase experience has been amazing with Natroyal Group & I would recommend them to anyone looking for custom coated fabric.",
      name: "Jackson Mckeller",
      designation: "Supply Chain Manager, Marinetime Industries",
    },
  ];

  const testimonialSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: false,
    autoplay: true,
    // responsive: [
    //   {
    //     breakpoint: 950,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 1,
    //     },
    //   },

    //   {
    //     breakpoint: 820,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
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
        title: "Award-Winning Coated Fabrics Manufacturer in India | Natroyal",
        description:
          "Natroyal is an award-winning Indian manufacturer of coated fabrics, synthetic leather, and faux leather. Recognized for quality, innovation, and industry leadership.",
        keyword:
          "Natroyal awards, coated fabrics manufacturer India, synthetic leather recognition, faux leather manufacturer, industry recognition, quality certifications, manufacturing excellence, top Indian exporter, Make in India company, National awards in manufacturing, trusted coated fabrics brand",
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
      <section className="landing-banner-section">
        <div className="slide-container">
          <div className="poster-container">
            <img
              // src="/images/banners/New Project.png"
              src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277283/New_Project_ynkey7.png"
              alt="Poster"
              className="poster-image"
            />

            {/* Common Banner Content - Placed inside the same container */}
            <div className="banner-text">
              {/* <h1 className="banner-title">
                {" "}
                We are India’s leading manufacturers & exporters of Specifically
                Engineered Coated Fabrics
              </h1> */}
              {/* <div className="d-flex">
                <NavLink to="/contact-us" className="custom-button">
                  Get Started
                </NavLink>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="applications-section">
        <div className="container">
          <div className="row">
            <ul className="application-tabs d-flex align-items-center justify-content-center">
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/coated-fabrics">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link active"
                  to="/awards-and-recognition"
                >
                  Awards & Recognition
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/research-and-development">
                  Research & Development (R&D)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-coated-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h2 className="title new-title">
                <span className="yellow-title"> The Art of</span> Royal Touch
                Leatherette
              </h2>
            </div>

            <div className="col-lg-7 offset-lg-1 mt-lg-0 mt-5">
              <p className="paragraph gray-para">
                Founded In 1954, Natroyal Industries Pvt. Ltd., Formerly known
                as "National Leathercloth Mfg. Co. / Vinyroyal Plasticoates Pvt.
                Ltd.", is a leading manufacturer of Premium Leatherette
                Solutions. With a strong emphasis on Innovation and
                Sustainability, We specialize in producing Durable, Eco-friendly
                Materials that closely Replicate the Look and Feel of Real
                Leather.
              </p>
              <p className="paragraph gray-para">
                Our state-of-the-art production facility, located near Vadodara,
                Gujarat, offers specialized leatherette solutions for OEMs and
                Tier-1 companies. Our product range includes cut and sewn or
                vacuum-formed leatherette seat covers, along with custom
                soft-feel leatherette interior trims designed to enhance the
                appeal and premium quality required in high-end automotive
                vehicles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="quality-policy-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h2 className="title new-title">
                <span className="yellow-title"> Quality </span>
                <br /> Policy
              </h2>
            </div>
            <div className="col-lg-4">
              <img
                // src="/images/coated-fabrics/WhatsApp Image 2025-06-02 at 14.28.47.jpeg"
                src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286128/WhatsApp_Image_2025-06-02_at_14.28.47_tqqe80.jpg"
                alt="quality-policy-img"
                className="w-100"
              />
            </div>
            <div className="col-lg-4 ps-lg-5 ps-auto mt-lg-0 mt-5">
              <p className="paragraph gray-para">
                We are committed to be a successful global player in the
                business of PVC coated fabric / PVC sheet by upgrading our
                quality as per changing customer requirements and continually
                improving the effectiveness of our Quality Management Systems,
                thereby delighting our valued customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="testimonials-section">
        <div className="container">
        <h2 className="title new-title text-center">
                <span className="yellow-title"> Testimonials</span> 
              </h2>
          <TestimonialSlider settings={testimonialSettings} slides={testimonialData}/>
        </div>
      </section> */}

      <section className="awards-honours-section">
        <div className="container">
          <div className="col-lg-12">
            <h2 className="title new-title">
              <span className="yellow-title"> Awards & </span> Honours
            </h2>
            <div className="row honours-row mt-5">
              <div className="col-lg-3 col-md-6 col-12">
                <div className="honours-div mt-lg-0 mt-5">
                  <div className="honours-img">
                    <img src="/images/icons/awards-bg.png" />
                    <div className="honours-content">
                      <h6>PLASTICON SILVER AWARD</h6>
                      <p>Use of Plastics in Medical and Public Healthcare</p>

                      <h6 className="mt-4">2018</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="honours-div mt-lg-0 mt-5">
                  <div className="honours-img">
                    <img src="/images/icons/awards-bg.png" />
                    <div className="honours-content">
                      <h6>MEDICALL MADE IN INDIA INNOVATION SILVER AWARD</h6>
                      <p>Medical Devices other than POC and Wearables</p>

                      <h6 className="mt-4">2017</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="honours-div mt-lg-0 mt-5">
                  <div className="honours-img">
                    <img src="/images/icons/awards-bg.png" />
                    <div className="honours-content">
                      <h6>PLASTICON SILVER AWARD</h6>
                      <p>Innovative Finished Product Category</p>

                      <h6 className="mt-4">2015</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="honours-div mt-lg-0 mt-5">
                  <div className="honours-img">
                    <img src="/images/icons/awards-bg.png" />
                    <div className="honours-content">
                      <h6>TOYOTA BOSHOKU INDIA</h6>
                      <p>Best Supplier of the Year Award Rank 1</p>

                      <h6 className="mt-4">2012</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutCoated;
