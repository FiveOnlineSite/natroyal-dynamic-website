import React from "react";
import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import { Navigate, NavLink, useParams } from "react-router-dom";
import CoatedApplicationModal from "../../components/CoatedApplicationModal";
import { useEffect } from "react";
import metaDataMap from "../../data/metaDataMap";

const CoatedApplications = () => {
  const { category } = useParams(); // Get category from URL

  useEffect(() => {
    const meta = metaDataMap.coatedFabric[category] || {
      title: "Vinyl Flooring Applications | Natroyal",
      description:
        "Explore a wide range of vinyl flooring applications by Natroyal. Durable, stylish, and suited for every space.",
      keywords:
        "vinyl flooring, flooring applications, commercial vinyl flooring, residential vinyl flooring",
    };

    // Set Document Title
    document.title = meta.title;

    // Utility to update or create meta tag
    const updateMeta = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.name = name;
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Apply metadata
    updateMeta("description", meta.description);
    updateMeta("keywords", meta.keywords);

    // Set canonical tag
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.rel = "canonical";
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonicalUrl;
  }, [category]);

  const applicationData = [
    {
      type: "residential-contract-furnishing",
      title: "Residential & ",
      spanTitle: "Contract Furnishing",
      name: "Residential & Contract Furnishing",
      // bannerImg: "/images/coated-fabrics/Banner-6.jpg",
      bannerImg:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286093/Banner-6_meuy8w.jpg",
      para: "Our comprehensive range of specialized & customized coated fabrics have been a huge success in modern furniture design",
      applications: [
        {
          // image: "/images/applications/coated/home-upholestry.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281877/home-upholestry_eaombv.jpg",
          name: "Home Upholstery",
          content:
            "For Home Upholstery various types of textures, finishing, dry feel, stain-resistant products are available. It also includes Tumbling and Pull-up products.",
        },
        {
          // image: "/images/applications/coated/contract-furnishing.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281870/contract-furnishing_iyy4uu.jpg",
          name: "Contract Furnishing",
          content:
            "Contract Furnishing is made for both indoor and outdoor furniture with very high strength, high abrasion and stain resistance properties. It also has anti-microbial properties.",
        },
      ],
    },
    {
      type: "Automotive",
      title: "Choosing the Right",
      spanTitle: "Leatherette",
      name: "Automotive",
      // bannerImg: "/images/coated-fabrics/banner-2.jpg",
      bannerImg:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286092/banner-2_q61qw5.jpg",
      para: "We offer a diverse range of leatherette / Coated-Fabrics in various colors, textures and feels, each unique in its characteristics. This collection is crafted to meet all possible requirements related to comfort, climate conditions, durability, resilience, texture, touch and color preferences of our esteemed customers.",
      images: [
        {
          // img: "/images/applications/coated/Adobe Express - file.png",
          img: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281868/Adobe_Express_-_file_jtgqvu.png",
          imgName: "Passenger Car Applications",
        },
        {
          // img: "/images/applications/coated/Adobe Express - file (1).png",
          img: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281867/Adobe_Express_-_file_1_eerxht.png",
          imgName: "Public Transport Applications",
        },
      ],
    },
    {
      type: "Two-Wheelers",
      title: "Two",
      spanTitle: "Wheelers",
      name: "Two Wheelers",
      // bannerImg: "/images/coated-fabrics/banner-1.jpg",
      bannerImg:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286092/banner-1_guidrj.jpg",
      para: "We manufacture & supply specialized 2-wheeler seat cover coated fabrics to make every ride joyful",
      images: [
        {
          // img: "/images/applications/coated/joyride.png"
          img: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281879/joyride_yjm6gg.png",
        },
      ],
    },
    {
      type: "Marine-Recreational-Vehicles",
      title: "Marine & ",
      spanTitle: "Recreational Vehicles",
      name: "Marine & Recreational Vehicles",
      // bannerVideo: "/videos/7007129-uhd_3840_2160_30fps (1).mp4",
      bannerVideo:
        "https://res.cloudinary.com/dcmdihrzp/video/upload/v1751279396/7007129-uhd_3840_2160_30fps_1_b8mqim.mp4",
      para: "We manufacture & supply specialized coated fabrics that endure the harsh conditions present on commercial & recreational vessels",
      applications: [
        {
          // image: "/images/applications/coated/exterior.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281871/exterior_xqotmi.jpg",
          name: "Exterior",
          content:
            "All of our marine coated fabrics are visually appealing and have been designed to withstand the harsh conditions present outdoors.Our products possess the required vital characteristics like being waterproof, resistant to UV rays, extreme tolerance, anti-microbial and pink staining. Sure to say, they are ideal for use on the exterior of boats.",
        },
        {
          // image: "/images/applications/coated/interior.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281879/interior_c3sgzi.jpg",
          name: "Interior",
          content:
            "Our portfolio of marine interior coated fabrics is one of the best in the business and is ideal for use in upholstery, walls and ceilings of boats. It comprises products that have been uniquely designed based on the latest trends, creating modern & functional spaces in the interior of boats that make for a warm and luxurious setting.",
        },
        {
          // image:
          //   "/images/applications/coated/Recreational-vehicles-coated-fabrics.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281888/Recreational-vehicles-coated-fabrics_ftehcz.jpg",
          name: "Recreational Vehicles",
          content:
            "Producing high-performance coated fabrics which provide high levels of comfort and are able to endure harsh climate conditions & heavy traffic areas is one of our areas of expertise.",
        },
      ],
    },
    {
      type: "Healthcare",
      title: "Healthcare",
      name: "Healthcare",
      // bannerImg: "/images/coated-fabrics/banner-8.jpg",
      bannerImg:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286092/banner-8_iq86h3.jpg",
      para: "Manufacturing and supplying specialized & customized coated fabrics which meet the demanding requirements of the healthcare industry is our forte",
      applications: [
        {
          // image: "/images/applications/coated/radiation-protection.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281887/radiation-protection_h9cmvb.jpg",
          name: "Radiation Protection",
          content:
            "We have been supplying international quality radiation protection metal sheets to leading Indian manufacturers for the creation of X-Ray protection aprons in India for the last many years. All our products pass the regular applicable standards and are even exported to some international buyers.",
        },
        {
          // image: "/images/applications/coated/pu-products-for-apron.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281885/pu-products-for-apron_fu7jqx.jpg",
          name: "PU Products for Apron",
          content:
            "With anti-microbial properties, no PVC used, soft feel & availability in a variety of colours, our completely Polyurethane coated products are used in the making of premium quality aprons for health professionals.",
        },
        {
          // image:
          //   "/images/applications/coated/healthcare-upholstry-coated-fabrics.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281876/healthcare-upholstry-coated-fabrics_lmqmge.jpg",
          name: "Upholstery",
          content:
            "When it comes to upholstery used in healthcare settings, appropriate selection of textures is critical to limit the accumulation of bacteria, grime & dust. Coated fabrics typically find usage in examination tables, stools, patient & dental seating besides hospital beds. Our specially designed coated fabrics offer unparalleled resistance to staining, abrasion & wear properties.",
        },
        {
          // image: "/images/applications/coated/Mattress-Covers.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281881/Mattress-Covers_retsir.jpg",
          name: "Mattress Covers",
          content:
            "We have specially developed mattress cover material “Meditex” with anti-viral, anti-bacterial and anti-fungal properties. It is also blood/water/oil repellent and has good abrasion and stain resistance. This product is certified by SITRA, Intertek India Ltd. and Valtris UK.",
        },
        {
          // image:
          //   "/images/applications/coated/solution-to-discomfort-of-orthopaedic-plasters.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281889/solution-to-discomfort-of-orthopaedic-plasters_rvtonk.jpg",
          name: "Solution to discomfort of Orthopaedic Plasters",
          content:
            "Orthopaedic surgeries are generally followed by plaster and it is to be kept for at least 2 weeks. Since there is no / very less air circulation between the plaster and the skin, there is sweat formation which is very difficult to clean. This causes discomfort followed by itching and foul smell. Natroyal Group introduces for the first time in India Phase Change Material Fabric which will be the first layer in contact with the skin before the plaster. The phase change material absorbs the body heat which generally results into sweat, thereby reducing sweat formation considerably which reduces bacterial growth and consequent itching.",
        },
      ],
    },
    {
      type: "Footwear",
      title: "Footwear",
      name: "Footwear",
      // bannerImg: "/images/coated-fabrics/shoes-banner.jpg",
      bannerImg:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286121/shoes-banner_idiw2g.jpg",
      para: "With our special range of coated fabrics designed for the footwear industry, we have emerged as an industry-leading brand",
      applications: [
        {
          // image: "/images/applications/coated/low-memory-foam-footwear.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281880/low-memory-foam-footwear_hycjwm.jpg",
          name: "Low memory foam products",
          content:
            "We have specially developed thermoformable Polymer Foam which provides best comfort. It has 31.3% Plantar Pressure Index Reduction and has a very low return rate.",
          btn: "Learn More",
          btnLink: "/docs/Natfoam-Presentation-1.pdf",
        },
        {
          // image: "/images/applications/coated/micro-laser-cut-footwear.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281882/micro-laser-cut-footwear_mshnit.jpg",
          name: "Micro laser cut products",
          content:
            "Technical products tailor-made for high performance, heavy-duty load, superior abrasion & very-high tear strength in footwear.",
        },
        {
          // image: "/images/applications/coated/shoes.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281895/shoes_bfhsnt.png",
          name: "Shoe Insoles and Sandal Upper Products",
          content:
            "We have various types of shoe uppers with sandwich textiles / non-woven foam and also for PU Injection moulding.",
        },
      ],
    },
    {
      type: "Fashion",
      title: "Fashion",
      name: "Fashion",
      // bannerImg: "/images/coated-fabrics/banner-3.jpg",
      bannerImg:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286093/banner-3_wqgwfw.jpg",
      para: "We manufacture, supply & export world-class coated fabrics for a variety of fashion accessories",
      applications: [
        {
          // image: "/images/applications/coated/apparels-coated-fabrics.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281867/apparels-coated-fabrics_qjldnr.jpg",
          name: "Apparels",
          content:
            "The ideal replacement for real leather, coated fabrics have been playing a key role in fashion design for several years now. Our coated fabrics having vibrant colors, real leather-like feel, extraordinary embosses & textures have been enabling our customers in the fashion industry to make very innovative, durable & attractive range of apparels.",
        },
        {
          // image: "/images/applications/coated/BAgs.gif",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281869/BAgs_qp2lxa.gif",
          name: "Bags",
          content:
            "Tailor made products are available for ladies bags with high scratch resistance, micro laser cut designs and with colour fastness.",
        },
        {
          // image: "/images/applications/coated/belt-1.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281869/belt-1_uooyyo.jpg",
          name: "Belts",
          content:
            "Belts made out of our range of coated fabrics are known for their durability, fashion-savvy nature & extraordinary feel. By utilizing our coated fabrics, our customers are able to make premium quality belts that last long and make heads turn.",
        },
      ],
    },
    {
      type: "Tractor",
      title: "Tractor",
      name: "Tractor",
      bannerImg: "/images/coated-fabrics/Tractor.jpg",
      // bannerImg:
        // "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286122/Tractor_ljpxrf.jpg",
      para: "We manufacture & supply specialized 2-wheeler seat cover coated fabrics to make every ride joyful",
      images: [
        {
          // img: "/images/applications/coated/Adobe Express - file (4).jpg"
          img: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281868/Adobe_Express_-_file_4_dj6jdn.jpg",
        },
      ],
    },
    {
      type: "Truck",
      title: "Truck",
      name: "Truck",
      // bannerImg: "/images/coated-fabrics/Truck.jpg",
      bannerImg:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286126/Truck_eo8d7o.jpg",
      para: "Our Truck coated fabrics are designed to withstand harsh weather conditions and rough handling, ensuring long-term performance. Their flexibility, strength, and ease of maintenance make them a preferred choice for transport and logistics solutions. Available in cut and sew or vacuum formable product constructions.",
      images: [
        {
          // img: "/images/applications/coated/Adobe Express - file (6).png",
          img: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281868/Adobe_Express_-_file_6_kydeai.jpg",
          // imgName: "Truck Cabin 1",
        },
        {
          // img: "/images/applications/coated/Adobe Express - file (5).png",
          img: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281867/Adobe_Express_-_file_5_a2kllz.png",
          // imgName: "Truck Cabin 2",
        },
        {
          // img: "/images/applications/coated/Adobe Express - file (7).jpg",
          img: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281869/Adobe_Express_-_file_7_qefvnq.jpg",
          // imgName: "Truck Arm Rest",
        },
        {
          // img: "/images/applications/coated/Adobe Express - file (8).png",
          img: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281867/Adobe_Express_-_file_8_omkzhj.png",
          // imgName: "Truck Door Inner Panel",
        },
      ],
    },
    {
      type: "Golf-Cart",
      title: "Golf Cart",
      name: "Golf Cart",
      // bannerImg: "/images/coated-fabrics/Golf cart - Final.jpg",
      bannerImg:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751286094/Golf_cart_-_Final_eqszll.jpg",
      para: "Our vacuum foam vinyl are designed to withstand outdoor conditions while maintaining flexibility and ease of cleaning. Their durability, fade resistance, and ability to be custom-fitted make them ideal for both personal and commercial golf cart applications.",
      images: [
        {
          // img: "/images/applications/coated/Adobe Express - file (5).jpg",
          img: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281866/Adobe_Express_-_file_5_dzqjqz.jpg",
          // imgName: "Premium Golf Cart Seats",
        },
        {
          // img: "/images/applications/coated/Adobe Express - file (3).png",
          img: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281868/Adobe_Express_-_file_3_p0zbh7.png",
          // imgName: "Golf Cart 1",
        },
        {
          // img: "/images/applications/coated/Adobe Express - file (4).png",
          img: "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281869/Adobe_Express_-_file_4_jqsubx.png",
          // imgName: "Golf Cart 2",
        },
      ],
    },
  ];

  const selectedCategory = applicationData.find(
    (data) => data.type.toLowerCase() === category.toLowerCase()
  );

  if (!selectedCategory) {
    return <Navigate to="/" replace />;
  }

  const bannerData = {
    bannerImg: selectedCategory.bannerImg,
    bannerVideo: selectedCategory.bannerVideo,
    title: selectedCategory?.name || "Default Title", // Ensure it doesn't break if selectedCategory is undefined
    breadcrumbs: [
      { label: "Home", path: "/", active: false },
      { label: "Coated Fabrics", path: "/coated-fabrics", active: false },
      { label: selectedCategory?.name, path: null, active: true },
    ],
  };

  return (
    <Layout>
      <Banner
        bannerImg={bannerData.bannerImg}
        bannerVideo={bannerData.bannerVideo}
        title={bannerData.title}
        breadcrumbs={bannerData.breadcrumbs}
      />

      <section className="applications-section vinyl-applications-section">
        <div className="container">
          <div className="row">
            <ul className="application-tabs d-flex align-items-center justify-content-center">
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/coated-fabrics" end>
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/coated-fabrics/automotive">
                  Automotive
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/coated-fabrics/truck">
                  Truck
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/coated-fabrics/tractor">
                  Tractor
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/coated-fabrics/golf-cart">
                  Golf Cart
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link"
                  to="/coated-fabrics/marine-recreational-vehicles"
                >
                  Marine & Recreational Vehicles
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link"
                  to="/coated-fabrics/residential-contract-furnishing"
                >
                  Residential & Contract Furnishing
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/coated-fabrics/two-wheelers">
                  Two Wheelers
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/coated-fabrics/healthcare">
                  Healthcare
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/coated-fabrics/fashion">
                  Fashion
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/coated-fabrics/footwear">
                  Footwear
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="vinyl-applications-section">
        <div className="container">
          <h2 className="title new-title text-center">
            {" "}
            {selectedCategory.title}{" "}
            <span className="yellow-title">{selectedCategory.spanTitle}</span>
            {""}
          </h2>

          <p className="paragraph gray-para text-center">
            {selectedCategory.para}
          </p>
        </div>
      </section>

      <section className="application-types-section coated-application-section">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-lg-9">
              {selectedCategory.applications &&
                selectedCategory.applications.map((application, index) => (
                  <div
                    className="row align-items-center justify-content-center"
                    key={index}
                  >
                    <div className="col-lg-4 mb-4">
                      <img
                        src={application.image}
                        alt={application.name}
                        className="w-100 coated-img"
                      />
                    </div>
                    <div className="col-lg-7 offset-lg-1 mt-4 mt-lg-0">
                      <h4 className="mb-4">
                        <i>{application.name}</i>
                      </h4>
                      <p className="paragraph gray-para">
                        {application.content}
                      </p>
                      {application.btn && (
                        <div className="d-flex mt-3">
                          <NavLink
                            to={application.btnLink}
                            target="_blank"
                            className="custom-button"
                          >
                            {application.btn}
                          </NavLink>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="row coated-big-img-div align-items-center justify-content-center mb-5">
            {selectedCategory.images &&
              selectedCategory.images.map((image, index) => (
                <div className="col-lg-6 col-md-6 col-12 mt-4" key={index}>
                  <h4 className="mb-4 text-center">
                    {image.imgName && <i>{image.imgName}</i>}
                  </h4>
                  <img src={image.img} alt={index} className="w-100" />
                </div>
              ))}
          </div>
        </div>
      </section>

      <CoatedApplicationModal />
    </Layout>
  );
};

export default CoatedApplications;
