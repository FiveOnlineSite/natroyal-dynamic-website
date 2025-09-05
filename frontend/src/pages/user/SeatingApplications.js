import React from "react";
import Layout from "../../components/Layout";
import { Navigate, NavLink, useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import { useEffect } from "react";
import metaDataMap from "../../data/metaDataMap";

const SeatingApplications = () => {
  const { category } = useParams(); // Get category from URL

  useEffect(() => {
    const meta = metaDataMap.seatingComponents[category] || {
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
      type: "Railway-Metro",
      title: "Railway ",
      spanTitle: "/ Metro",
      name: "Railway / Metro",
      content: [
        {
          para: "Total solution from Designing, Proto Sample Development, Testing, Tooling, Manufacturing & Supply.",
        },
        {
          para: "SS & CS production through EN-15085-2 certified WELDING STANDARD and GLOBALLY in the club of 2540 company instated of EN – ISO 15609- :2004",
        },
        {
          para: "Pipe bending products through Multi Axis CNC machine",
        },
        {
          para: "In-house Design, Tool Room and R&D Centre",
        },
      ],

      // banner_video: "/images/seating/Metro.mp4",
      banner_video:
        "https://res.cloudinary.com/dcmdihrzp/video/upload/v1751355081/Metro_w2w9c9.mp4",
      applications: [
        {
          step: "01",
          // image: "/images/applications/seating/Group 3.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281941/Group_3_yrskxp.png",
        },
        {
          step: "02",
          // image: "/images/applications/seating/NR SCD PPT 2024_079 1.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281945/NR_SCD_PPT_2024_079_1_icwh4x.png",
        },

        {
          step: "03",
          // image: "/images/applications/seating/NR SCD PPT 2024_076 1.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281944/NR_SCD_PPT_2024_076_1_bl19yr.png",
        },
        {
          step: "04",
          // image: "/images/applications/seating/1.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281930/1_jzvnyd.png",
        },
        {
          step: "05",
          // image: "/images/applications/seating/Train-Seat--2.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281948/Train-Seat--2_iidsh1.png",
        },
        {
          step: "06",
          // image: "/images/applications/seating/rail.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281947/rail_rchagx.jpg",
        },
        {
          step: "07",
          // image: "/images/applications/seating/Train-Seat--3.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281949/Train-Seat--3_kn3wjo.png",
        },
        {
          step: "08",
          // image: "/images/applications/seating/Train-Seat.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281952/Train-Seat_sxlm2m.png",
        },

        {
          step: "09",
          // image: "/images/applications/seating/Train-Seat--6.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281951/Train-Seat--6_xszydl.png",
        },
      ],
    },
    {
      type: "Cinema",
      title: "Cinema",
      name: "Cinema",
      // banner_video: "/images/seating/cinema.mp4",
      banner_video:
        "https://res.cloudinary.com/dcmdihrzp/video/upload/v1751355051/cinema_iaqmi1.mp4",
      applications: [
        {
          step: "01",
          // image: "/images/applications/seating/Cinema-Seats.-1.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281938/Cinema-Seats.-1_tfcjdq.png",
        },
        {
          step: "02",
          // image: "/images/applications/seating/Cinema-Seats.3.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281939/Cinema-Seats.3_kul5cp.png",
        },
        {
          step: "03",
          // image: "/images/applications/seating/Cinema-Seats.2.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281939/Cinema-Seats.2_zbvphu.png",
        },
        {
          step: "04",
          // image: "/images/applications/seating/Cinema-Seats.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281940/Cinema-Seats_qsmdcm.png",
        },
      ],
    },
    {
      type: "Bus",
      title: "Bus",
      name: "Bus",
      // banner_video: "/images/seating/Bus.mp4",
      banner_video:
        "https://res.cloudinary.com/dcmdihrzp/video/upload/v1751355116/Bus_erwi3w.mp4",
      applications: [
        {
          step: "01",
          // image: "/images/applications/seating/Bus-Seats.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281937/Bus-Seats_ny53hv.png",
        },
        {
          step: "02",
          // image: "/images/applications/seating/Bus-Seats-2.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281935/Bus-Seats-2_d0s9bv.png",
        },
        {
          step: "03",
          // image: "/images/applications/seating/Bus-Seats.-1.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281936/Bus-Seats.-1_cupgwb.png",
        },
        {
          step: "04",
          // image: "/images/applications/seating/Bus-Seats-3.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281936/Bus-Seats-3_ktedcj.png",
        },
      ],
    },
    {
      type: "Driver-Seats",
      title: "Driver Seats",
      name: "Driver Seats",
      // banner_img: "/images/seating/Frame 4.png",
      banner_img:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751355046/Frame_4_tvsvvo.png",
      applications: [
        {
          step: "01",
          // image: "/images/applications/seating/Layer 178.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281942/Layer_178_h22hgz.png",
          text: "Railway Driver Seat",
        },
        {
          step: "02",
          // image: "/images/applications/seating/NR SCD PPT 2024_049 1 (1).png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281943/NR_SCD_PPT_2024_049_1_1_gbjl0v.png",
          text: "Vande Bharat Driver Seat",
        },
        {
          step: "03",
          // image: "/images/applications/seating/APZNZA~1_page-000111.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281931/APZNZA_1_page-000111_qxnqs7.jpg",
          text: "Metro Driver Seat",
        },
        {
          step: "04",
          // image: "/images/applications/seating/APZNZA~1_page-000112.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281932/APZNZA_1_page-000112_f7rb2e.jpg",
          text: "Metro Driver Seat",
        },
        {
          step: "05",
          // image: "/images/applications/seating/APZNZA~1_page-000113.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281932/APZNZA_1_page-000113_nuoebh.jpg",
          text: "Metro Driver Seat",
        },
        {
          step: "06",
          // image: "/images/applications/seating/APZNZA~1_page-000121.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281933/APZNZA_1_page-000121_u0mfdl.jpg",
          text: "Assistant Co-driver Seat",
        },
        {
          step: "07",
          // image: "/images/applications/seating/APZNZA~1_page-000122.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281934/APZNZA_1_page-000122_mebw36.jpg",
          text: "Assistant Co-driver Seat",
        },
        {
          step: "08",
          // image: "/images/applications/seating/APZNZA~1_page-000123.jpg",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281934/APZNZA_1_page-000123_vhqsax.jpg",
          text: "Assistant Co-driver Seat",
        },

        {
          step: "09",
          // image: "/images/applications/seating/Train-Seat--4.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281950/Train-Seat--4_mgsm7z.png",
          text: "Driver Seat",
        },
        {
          step: "10",
          // image: "/images/applications/seating/Train-Seat--5.png",
          image:
            "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751281950/Train-Seat--5_wd97uv.png",
          text: "Driver Seat",
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
    bannerImg: selectedCategory?.banner_img,
    title: selectedCategory?.name || "Default Title", // Ensure it doesn't break if selectedCategory is undefined
    bannerVideo: selectedCategory?.banner_video,
    breadcrumbs: [
      { label: "Home", path: "/", active: false },
      {
        label: "Seating Components",
        path: "/seating-components",
        active: false,
      },
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

      <section className="applications-section">
        <div className="container">
          <div className="row">
            <ul className="application-tabs d-flex align-items-center justify-content-center">
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link"
                  to="/seating-components/railway-metro"
                >
                  Railway/Metro
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link"
                  to="/seating-components/driver-seats"
                  end
                >
                  Driver Seats
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/seating-components/bus">
                  Bus
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/seating-components/cinema">
                  Cinema
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
            {selectedCategory.title} {""}
            <span className="yellow-title">{selectedCategory.spanTitle}</span>
            {""}
          </h2>
          {selectedCategory.content && (
            <ul className="paragraph gray-para text-start">
              {selectedCategory.content.map((content, index) => (
                <li> {content.para}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="row justify-content-center">
                {selectedCategory.applications.map((application, index) => (
                  <div className="col-lg-4 col-md-6 col-12" key={index}>
                    <div className="mission-div mb-5">
                      <div className="mission-no">{application.step}</div>
                      <div className="seating-application-img">
                        <img
                          src={application.image}
                          alt="seating"
                          className="w-100"
                        />
                        {application.text && (
                          <p className="text-center mt-4">
                            {" "}
                            {application.text}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SeatingApplications;
