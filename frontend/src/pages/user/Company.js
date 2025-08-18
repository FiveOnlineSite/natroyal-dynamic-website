import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import { NavLink } from "react-router-dom";
import Clients from "../../components/Clients";

const Company = () => {
  const bannerData = {
    // bannerImg: "/images/banners/Pic Collage 1 (2).png",
    bannerImg:
      "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277321/Pic_Collage_1_2_uaf2n1.png",
    title: "Our Divisions",
    breadcrumbs: [
      { label: "Home", path: "/", active: false },
      { label: "Our Divisions", path: null, active: true },
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
          "Natroyal Group Divisions | Coated Fabrics, Vinyl Flooring, Knit Fabrics & Seating Systems",
        description:
          "Explore Natroyal Group’s core divisions: Coated Fabrics, Knit Fabrics, LVT, Vinyl Flooring, and Seating Components. Engineered for industries like automotive, railways, interiors & more",
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

      <section className="company-section">
        <div className="container-fluid">
          {/* <div className="row">
            <div className="col-lg-8">
              <h6 className="subtitle">
                Companies <span></span>
              </h6>
              <h2 className="title">Industry Leaders</h2>
              <p className="paragraph">
                With a rich legacy dating back to 1962, Natroyal Group continues
                to innovate and excel in the production of PVC Vinyl Flooring
                and coated fabrics. Our products are recognized for their
                durability, quality, and versatility, and are exported to key
                markets across Europe, USA, Russia, Middle East, Africa, and
                Southeast Asia.
              </p>
            </div>
          </div> */}

          {/* <div className="row mt-5">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-3 pb-lg-0 pb-4">
                  <ul
                    className="nav nav-tabs companies-tabs"
                    id="companies"
                    role="tablist"
                  >
                    <li className="nav-item mb-4" role="presentation">
                      <button
                        className="nav-link active company-div ps-0"
                        data-bs-target="#vinyl"
                        type="button"
                        role="tab"
                        id="vinyl-tab"
                        aria-controls="vinyl"
                        data-bs-toggle="tab"
                      >
                        <div className="w-100 d-flex flex-column align-items-start">
                          <img
                            src="/images/icons/image 44.png"
                            height={"49.29px"}
                            width={"75px"}
                            alt="company"
                          />
                          <h6>
                            Vinyl <br /> Flooring
                          </h6>
                        </div>
                        <div className="arrow-div w-100">
                          <i className="lni lni-arrow-angular-top-right"></i>
                        </div>
                      </button>
                    </li>
                    <li className="nav-item mb-4" role="presentation">
                      <button
                        className="nav-link company-div ps-0"
                        id="coated-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#coated"
                        type="button"
                        role="tab"
                        aria-controls="coated"
                        aria-selected="false"
                      >
                        <div className="w-100 d-flex flex-column align-items-start">
                          <img
                            src="/images/icons/image 45.png"
                            height={"50px"}
                            width={"75px"}
                            alt="company"
                          />
                          <h6>Coated Fabrics</h6>
                        </div>

                        <div className="arrow-div w-100">
                          <i className="lni lni-arrow-angular-top-right"></i>
                        </div>
                      </button>
                    </li>

                    <li className="nav-item mb-4" role="presentation">
                      <button
                        className="nav-link company-div ps-0"
                        id="seating-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#seating"
                        type="button"
                        role="tab"
                        aria-controls="seating"
                        aria-selected="false"
                      >
                        {" "}
                        <div className="w-100 d-flex flex-column align-items-start">
                          <img
                            src="/images/icons/image 46.png"
                            height={"32px"}
                            width={"120px"}
                            alt="company"
                          />
                          <h6>Seating Components</h6>
                        </div>
                        <div className="arrow-div w-100">
                          <i className="lni lni-arrow-angular-top-right"></i>
                        </div>
                      </button>
                    </li>

                    <li className="nav-item mb-4" role="presentation">
                      <button
                        className="nav-link company-div ps-0"
                        id="knit-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#knit"
                        type="button"
                        role="tab"
                        aria-controls="knit"
                        aria-selected="false"
                      >
                        <div className="w-100 d-flex flex-column align-items-start">
                          <img
                            src="/images/icons/image 47.png"
                            height={"50px"}
                            width={"75px"}
                            alt="company"
                          />
                          <h6>
                            Knit <br />
                            Fabrics
                          </h6>
                        </div>

                        <div className="arrow-div w-100">
                          <i className="lni lni-arrow-angular-top-right"></i>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-9">
                  <div className="tab-content" id="companies">
                    <div
                      className="tab-pane fade show active"
                      id="vinyl"
                      role="tabpanel"
                      aria-labelledby="vinyl-tab"
                    >
                      <div className="companies-content">
                        <div className="companies-img">
                          <img
                            src="/images/banners/5mm-Click-Luxury-Vinyl-Tiles-Plastic-PVC-Plank-Lvt-Flooring.png"
                            alt="companies-img"
                            className="company-img"
                          />
                          <div className="companies-text">
                            <h6>
                              {" "}
                              About VinyRoyal Plasticoates Private Limited
                              (VPPL)
                            </h6>
                            <p className="paragraph pb-4">
                              The pioneering entrepreneur of the group started
                              the flagship company NLC in 1962. It is engaged in
                              manufacturing of Artificial Leathercloth and is
                              one of the largest manufacturers in the world with
                              installed capacity of 13.5 million square meters
                              with 3 Coating lines.
                            </p>

                            <NavLink
                              to="/"
                              target="_blank"
                              className="custom-button border-btn"
                            >
                              Read More
                              <img
                                src="/images/icons/arrow-up-right.png"
                                className="ps-2 "
                                width="30px"
                                alt="arrow"
                              />
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="coated"
                      role="tabpanel"
                      aria-labelledby="coated-tab"
                    >
                      <div className="companies-content">
                        <div className="companies-img">
                          <img
                            src="/images/banners/5mm-Click-Luxury-Vinyl-Tiles-Plastic-PVC-Plank-Lvt-Flooring.png"
                            alt="companies-img"
                            className="company-img"
                          />
                          <div className="companies-text">
                            <h6> About Royal Cushion Vinyl Products Ltd.</h6>
                            <p className="paragraph pb-4">
                              Royal Cushion Vinyl Products Ltd. has two plants
                              spread across 130 acres of land, at Garadia,
                              Halol, Gujarat, for manufacturing of Vinyl
                              Floorings of different types for various end-users
                              and Rigid Films. RCVPL caters to customers in over
                              40 countries worldwide.
                            </p>

                            <NavLink
                              to="/"
                              target="_blank"
                              className="custom-button border-btn"
                            >
                              Read More
                              <img
                                src="/images/icons/arrow-up-right.png"
                                className="ps-2 "
                                width="30px"
                                alt="arrow"
                              />
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="seating"
                      role="tabpanel"
                      aria-labelledby="seating-tab"
                    >
                      <div className="companies-content">
                        <div className="companies-img">
                          <img
                            src="/images/banners/5mm-Click-Luxury-Vinyl-Tiles-Plastic-PVC-Plank-Lvt-Flooring.png"
                            alt="companies-img"
                            className="company-img"
                          />
                          <div className="companies-text">
                            <h6>About Vijayjyot</h6>
                            <p className="paragraph pb-4">
                              Vijayjyot seating components division is leading
                              components manufacturer for Metro, Bus, Car,
                              Cinema and Auditorium seats. The product line
                              includes fabrication of Metal Frames (MS and SS),
                              Polyurethane (PU) Foam and Upholstery / Trim
                              Covers. We also manufacture and supply fully
                              assembled Railway seats.
                            </p>

                            <NavLink
                              to="/"
                              target="_blank"
                              className="custom-button border-btn"
                            >
                              Read More
                              <img
                                src="/images/icons/arrow-up-right.png"
                                className="ps-2 "
                                width="30px"
                                alt="arrow"
                              />
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="knit"
                      role="tabpanel"
                      aria-labelledby="knit-tab"
                    >
                      <div className="companies-content">
                        <div className="companies-img">
                          <img
                            src="/images/banners/5mm-Click-Luxury-Vinyl-Tiles-Plastic-PVC-Plank-Lvt-Flooring.png"
                            alt="companies-img"
                            className="company-img"
                          />
                          <div className="companies-text">
                            <h6>About Royal Knitting</h6>
                            <p className="paragraph pb-4">
                              Initially Royal Knitting Pvt. Ltd [RKPL]
                              established in 1983, produced knitted fabrics to
                              meet the in-house requirements for leathercloth
                              backing, for our sister concern - National
                              Leathercloth Mfg. Co. and Vinyroyal Plasticoates
                              Pvt. Ltd. Today RKPL’s installed capacity stands
                              at 175 tonnes/month of circular knitted fabrics
                              and 20 tonnes/month of warp knitted fabrics.
                            </p>

                            <NavLink
                              to="/"
                              target="_blank"
                              className="custom-button border-btn"
                            >
                              Read More
                              <img
                                src="/images/icons/arrow-up-right.png"
                                className="ps-2 "
                                width="30px"
                                alt="arrow"
                              />
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="row company-row">
            <div className="col-lg-12">
              <div className="row mt-5 align-items-center justify-content-center">
                <div className="col-lg-6 company-bg">
                  <div className="company-img">
                    <img
                      // src="/images/banners/jurre-houtkamp-610ZXDQRt0Y-unsplash.png"
                      src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277262/jurre-houtkamp-610ZXDQRt0Y-unsplash_xwb9ta.png"
                      alt="company-img"
                    />
                    <div className="logo-gray-div">
                      <img src="/images/icons/Royal House.png" alt="logo" />
                      {/* <h2>LVT</h2> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 ps-lg-5 ps-lg-0 ps-auto pt-lg-0 pt-5 ">
                  <div className="companies-content">
                    {/* <h6 className="subtitle">
                      Vinyl Plank & Tiles <span></span>
                    </h6> */}
                    <h2 className="title">
                      <span className="yellow-title">Luxury Vinyl Plank</span> &
                      Tiles (LVT)
                    </h2>

                    <p className="paragraph mb-5">
                      Natroyal Group is a pioneer in India, manufacturing and
                      supplying luxury vinyl planks and tiles for various
                      industries, including education, healthcare, residential,
                      hospitality, office/retail, and transportation sectors.
                    </p>

                    <NavLink
                      to="/lvt-flooring"
                      target="_blank"
                      className="custom-button border-btn"
                    >
                      View More
                      <img
                        src="/images/icons/arrow-up-right.png"
                        className="ps-2"
                        alt="arrow"
                      />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row company-row">
            <div className="col-lg-12">
              <div className="row mt-5 align-items-center justify-content-center">
                <div className="col-lg-6 company-bg order-lg-2 order-1">
                  <div className="company-img">
                    <img
                      // src="/images/banners/Residential-banner (1).png"
                      src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277324/Residential-banner_1_y7uxgf.png"
                      alt="company-img"
                    />
                    <div className="logo-gray-div">
                      <img src="/images/icons/Royal House.png" alt="logo" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 ps-lg-5 ps-lg-0 ps-auto pt-lg-0 pt-5 order-lg-1 order-2">
                  <div className="companies-content">
                    {/* <h6 className="subtitle">
                      PVC Vinyl Flooring <span></span>
                    </h6> */}
                    <h2 className="title">
                      <span className="yellow-title">Vinyl</span> Flooring
                    </h2>
                    <p className="paragraph">
                      Natroyal Group manufactures high-quality PVC vinyl
                      flooring ranging from 0.37mm to 3mm, designed for sectors
                      such as education, healthcare, residential, and transport.
                    </p>

                    <div className="company-points">
                      <h5>Quality Policy</h5>
                      <div className="company-point mb-5">
                        <i className="lni lni-arrow-right"></i>
                        <p>
                          To achieve customer satisfaction by providing
                          international-quality products across all our product
                          ranges.
                        </p>
                      </div>
                    </div>

                    <NavLink
                      to="/vinyl-flooring"
                      target="_blank"
                      className="custom-button border-btn"
                    >
                      View More
                      <img
                        src="/images/icons/arrow-up-right.png"
                        className="ps-2"
                        alt="arrow"
                      />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row company-row">
            <div className="col-lg-12">
              <div className="row mt-5 align-items-center justify-content-center">
                <div className="col-lg-6 company-bg">
                  <div className="company-img">
                    <img
                      // src="/images/banners/Flux_Dev_A_luxurious_marine_boat_sofa_adorned_with_a_plush_whi_0.png"
                      src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277240/Flux_Dev_A_luxurious_marine_boat_sofa_adorned_with_a_plush_whi_0_l7rjpv.png"
                      alt="company-img"
                    />

                    <div className="logo-gray-div">
                      <img src="/images/icons/Royal Touch.png" alt="logo" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 ps-lg-5 ps-lg-0 ps-auto pt-lg-0 pt-5">
                  <div className="companies-content">
                    {/* <h6 className="subtitle">
                      Coated Fabrics<span></span>
                    </h6> */}
                    <h2 className="title">
                      <span className="yellow-title">Coated</span> Fabrics
                    </h2>
                    <p className="paragraph">
                      The pioneering entrepreneur of the group founded the
                      flagship company NLC in 1962. It is engaged in the
                      manufacturing of Artificial Leathercloth and is one of the
                      largest manufacturers in the world, with an installed
                      capacity of 13.5 million square meters and 3 coating
                      lines.
                    </p>

                    <div className="company-points">
                      <h5>Infrastructure</h5>
                      <div className="company-point">
                        <i className="lni lni-arrow-right"></i>
                        <p>
                          Specializes in manufacturing PVC artificial leather to
                          various Indian and international standards for
                          automobile seat upholstery and trims.
                        </p>
                      </div>
                      <div className="company-point">
                        <i className="lni lni-arrow-right"></i>
                        <p>
                          Offers a collection of designs in natural leather-like
                          grains and fabric-type patterns in a wide range of
                          colors.
                        </p>
                      </div>
                      <div className="company-point">
                        <i className="lni lni-arrow-right"></i>
                        <p>
                          Provides a choice of PVC artificial leather with knit,
                          woven, and non-woven backing fabrics to suit a variety
                          of end uses.
                        </p>
                      </div>
                      <div className="company-point">
                        <i className="lni lni-arrow-right"></i>
                        <p>
                          Equipped with a well-established laboratory for
                          testing raw materials and finished products.
                        </p>
                      </div>
                      <div className="company-point mb-5">
                        <i className="lni lni-arrow-right"></i>
                        <p>
                          Features a modern and well-laid-out plant for
                          production and storage.
                        </p>
                      </div>
                    </div>

                    <NavLink
                      to="/coated-fabrics"
                      target="_blank"
                      className="custom-button border-btn"
                    >
                      View More
                      <img
                        src="/images/icons/arrow-up-right.png"
                        className="ps-2"
                        alt="arrow"
                      />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row company-row">
            <div className="col-lg-12">
              <div className="row mt-5 align-items-center justify-content-center">
                <div className="col-lg-6 company-bg order-lg-2 order-1">
                  <div className="company-img">
                    <img
                      // src="/images/banners/EFPrQApUUAA_PNU 1.png"
                      src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277240/EFPrQApUUAA_PNU_1_gqqjwy.png"
                      alt="company-img"
                    />
                    <div className="logo-gray-div">
                      <img src="/images/icons/Vijayjyot.png" alt="logo" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 ps-lg-5 ps-lg-0 ps-auto pt-lg-0 pt-5 order-lg-1 order-2">
                  <div className="companies-content">
                    {/* <h6 className="subtitle">
                      Seating Components <span></span>
                    </h6> */}
                    <h2 className="title">
                      <span className="yellow-title">Seating</span> Components
                    </h2>
                    <p className="paragraph">
                      Our Division is a leading manufacturer of components for
                      metro, bus, car, cinema, and auditorium seats. The product
                      line includes the fabrication of metal frames (MS and SS),
                      polyurethane (PU) foam, and upholstery/trim covers. We
                      also manufacture and supply fully assembled seats.
                    </p>

                    <p className="paragraph mb-5">
                      Our Seating Components Division provides a one-stop
                      solution for customers, from design inception and
                      prototype samples to product development and commercial
                      supplies. Our facilities include a design center, tool
                      room, weld shop, and advanced technology such as
                      multi-axis bending machines, cutting and sewing machines,
                      and PU machines. We comply with the latest EN standards
                      for components (Frames, Trims, and PU). The plant is
                      located in Halol, near Vadodara, in the state of Gujarat,
                      India.
                    </p>

                    <NavLink
                      to="/seating-components"
                      target="_blank"
                      className="custom-button border-btn"
                    >
                      View More
                      <img
                        src="/images/icons/arrow-up-right.png"
                        className="ps-2"
                        alt="arrow"
                      />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row company-row">
            <div className="col-lg-12">
              <div className="row mt-5 align-items-center justify-content-center">
                <div className="col-lg-6 company-bg">
                  <div className="company-img">
                    <img
                      // src="/images/banners/Products For Lamination 1.png"
                      src="https://res.cloudinary.com/dcmdihrzp/image/upload/v1751277321/Products_For_Lamination_1_hpd0cg.png"
                      alt="company-img"
                    />
                    <div className="logo-gray-div">
                      <img src="/images/icons/Royal Knit.png" alt="logo" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 ps-lg-5 ps-lg-0 ps-auto pt-lg-0 pt-5">
                  <div className="companies-content">
                    {/* <h6 className="subtitle">
                      Knit Fabrics <span></span>
                    </h6> */}
                    <h2 className="title">
                      <span className="yellow-title">Knit</span> Fabrics
                    </h2>
                    <p className="paragraph mb-5">
                      Natroyal Industries (Knit Fabric Division) is engaged in
                      the manufacturing and development of industrial knitted
                      fabrics (Circular Knit & Wrap Knit) made from natural and
                      man-made fibres. The production and R&D facilities is ISO
                      9001:2015 and IATF 16949 certified and is based in Halol,
                      Vadodara in Gujarat State, which is one of the fast
                      growing industry regions in India.
                    </p>

                    {/* <p className="paragraph mb-5">
                      Exporting to the USA, Europe, and African countries.
                    </p> */}

                    {/* <div className="company-points">
                      <h5>Our Production Facilities / Capacity </h5>
                      <div className="company-point">
                        <i className="lni lni-arrow-right"></i>
                        <p>
                          45 high speed Circular knitting machines (German &
                          American make)
                        </p>
                      </div>
                      <div className="company-point">
                        <i className="lni lni-arrow-right"></i>
                        <p>
                          All Circular knitting machines are equipped with
                          fabric scanners
                        </p>
                      </div>
                      <div className="company-point">
                        <i className="lni lni-arrow-right"></i>
                        <p>
                          4 High speed Wrap knitting machines of Karl Mayer make
                        </p>
                      </div>
                      <div className="company-point">
                        <i className="lni lni-arrow-right"></i>
                        <p>
                          3 customised Heat-set machines with dry & wet
                          processing
                        </p>
                      </div>
                      <div className="company-point">
                        <i className="lni lni-arrow-right"></i>
                        <p>
                          Steaming on Heat-set machines provides more uniformity
                          in heat-setting of fabrics
                        </p>
                      </div>
                      <div className="company-point">
                        <i className="lni lni-arrow-right"></i>
                        <p>
                          Continuous process on Heat-set machine minimises
                          defects
                        </p>
                      </div>
                      <div className="company-point">
                        <i className="lni lni-arrow-right"></i>
                        <p>Well established laboratory & testing equipment</p>
                      </div>
                      <div className="company-point">
                        <i className="lni lni-arrow-right"></i>
                        <p>Current production capacity is 300 tons per month</p>
                      </div>
                      <div className="company-point mb-3">
                        <i className="lni lni-arrow-right"></i>
                        <p>Exporting to European and African Countries</p>
                      </div>
                    </div>

                    <div className="company-points">
                      <h5>Our USP</h5>
                      <div className="company-point">
                        <i className="lni lni-arrow-right"></i>
                        <p>Roll Length: Upto 10,000 mtrs.</p>
                      </div>
                      <div className="company-point">
                        <i className="lni lni-arrow-right"></i>
                        <p>Roll Diameter: Upto 1.5 mtrs.</p>
                      </div>

                      <div className="company-point mb-5">
                        <i className="lni lni-arrow-right"></i>
                        <p>Roll Width: Upto 240 cms.</p>
                      </div>
                    </div> */}
                    <NavLink
                      to="/knit-fabrics"
                      target="_blank"
                      className="custom-button border-btn"
                    >
                      View More
                      <img
                        src="/images/icons/arrow-up-right.png"
                        className="ps-2"
                        alt="arrow"
                      />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Clients />
    </Layout>
  );
};

export default Company;
