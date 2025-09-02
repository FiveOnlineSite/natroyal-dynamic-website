import React from "react";
import Layout from "../../components/Layout";
import { Navigate, NavLink, useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import ApplicationsModal from "../../components/ApplicationsModal";
import { useEffect } from "react";
import metaDataMap from "../../data/metaDataMap";

const VinylApp = () => {
  const { category } = useParams(); // Get category from URL

  useEffect(() => {
    const meta = metaDataMap.vinylFlooring[category] || {
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
      type: "Education",
      title: "Education",
      name: "Education",
      para: "Our Education range of Vinyl Flooring is developed to help students concentrate, inspire and interact. The vibrant colors enhance creativity and concentration for both the students and facilitators.",
      // bannerImg: "/images/vinyl/education3.png",
      bannerImg:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751282591/education3_qxrhxo.png",
      applications: [
        // {
        //   image: "/images/applications/education/MW2011.jpg",
        //   name: "Moonwalk",
        //   innerCategory: "/moonwalk",
        // },
        // {
        //   image: "/images/applications/education/SY2406.jpg",
        //   name: "Symphony",
        //   innerCategory: "/symphony",
        // },
        // {
        //   image: "/images/applications/education/EG2047.jpg",
        //   name: "Elegant",
        //   innerCategory: "/elegant",
        // },
        // {
        //   image: "/images/applications/education/Blue-Lagoon.jpg",
        //   name: "Accord",
        //   innerCategory: "/accord",
        // },
        // {
        //   image: "/images/applications/education/SK2630.jpg",
        //   name: "Startrek",
        //   innerCategory: "/startrek",
        // },
        // {
        //   image: "/images/applications/education/DZ2998.jpg",
        //   name: "Dazzle",
        //   innerCategory: "/dazzle",
        // },
        // {
        //   image: "/images/applications/education/MK2152.jpg",
        //   name: "Mirakle",
        //   innerCategory: "/mirakle",
        // },
        {
          image: "/images/categories/royal-star/RS3114.jpg",
          name: "Royal Star",
          innerCategory: "/royal-star",
        },
        {
          image: "/images/planks/rad/spruce.JPG",
          name: "LVT",
          innerCategory: "/lvt-flooring",
        },
        {
          image: "/images/categories/tiger/stone-path.jpg",
          name: "Tiger",
          innerCategory: "/tiger",
        },
        {
          image: "/images/categories/royal-classic/17.jpg",
          name: "Royal Classic",
          innerCategory: "/royal-classic",
        },
        {
          image: "/images/categories/majesty/9.jpg",
          name: "Majesty",
          innerCategory: "/majesty",
        },
        {
          image: "/images/categories/tuff/6.jpg",
          name: "Tuff",
          innerCategory: "/tuff",
        },
      ],
    },
    {
      type: "Healthcare",
      title: "Healthcare",
      name: "Healthcare",
      // bannerImg: "/images/vinyl/Adobe Express - file (8).png",
      bannerImg:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751282589/Adobe_Express_-_file_8_i4pasn.png",
      para: "Our flooring provides a healthy and hygienic environment to patients to enhance the healing and curing elements for a speedy recovery. The care givers receive aid in providing the same with ease and experience comfort in the work place. The Flooring is also designed for bare foot and continuous wet areas.",
      applications: [
        // {
        //   image: "/images/applications/education/MW2011.jpg",
        //   name: "Moonwalk",
        //   innerCategory: "/moonwalk",
        // },
        // {
        //   image: "/images/applications/healthcare/WY2032.png",
        //   name: "Wally",
        //   innerCategory: "/wally",
        // },

        // {
        //   image: "/images/applications/education/Blue-Lagoon.jpg",
        //   name: "Accord",
        //   innerCategory: "/accord",
        // },
        // {
        //   image: "/images/applications/education/SK2630.jpg",
        //   name: "Startrek",
        //   innerCategory: "/startrek",
        // },
        // {
        //   image: "/images/applications/education/DZ2998.jpg",
        //   name: "Dazzle",
        //   innerCategory: "/dazzle",
        // },
        // {
        //   image: "/images/applications/education/MK2152.jpg",
        //   name: "Mirakle",
        //   innerCategory: "/mirakle",
        // },
        {
          image: "/images/applications/healthcare/AT2041.jpg",
          name: "Orbit",
          innerCategory: "/orbit",
        },
        {
          image: "/images/categories/royal-star/RS3114.jpg",
          name: "Royal Star",
          innerCategory: "/royal-star",
        },
        {
          image: "/images/applications/offices/1.jpg",
          name: "Tuff",
          innerCategory: "/tuff",
        },
        {
          image: "/images/planks/rad/spruce.JPG",
          name: "LVT",
          innerCategory: "/lvt-flooring",
        },
        {
          image: "/images/categories/tiger/stone-path.jpg",
          name: "Tiger",
          innerCategory: "/tiger",
        },
      ],
    },
    // {
    //   type: "Wet-Areas",
    //   title: "Wet",
    //   spanTitle: "Areas",
    //   name: "Wet Areas",
    //   bannerImg: "/images/vinyl/wet-area-banner.png",
    //   para: "Our flooring provides a healthy and hygienic environment to patients to enhance the healing and curing elements for a speedy recovery. The care givers receive aid in providing the same with ease and experience comfort in the work place. The Flooring is also designed for bare foot and continuous wet areas.",
    //   applications: [
    //     {
    //       image: "/images/applications/wetareas/RQ2642.jpg",
    //       name: "Aqua RS",
    //       innerCategory: "/moonwalk",
    //     },
    //   ],
    // },
    {
      type: "Residential",
      title: "Residential",
      name: "Residential",
      // bannerImg: "/images/vinyl/Residential Vinyl.jpg",
      bannerImg:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751282603/Residential_Vinyl_kgszcq.jpg",
      para: "Our exquisite range of vinyl floor coverings in wooden, geometric and all over designs is developed keeping in mind the various tastes of individuals for designing their homes. It is easy to maintain and hassle free installation helps its users to change their interiors as often as desired. Flooring category includes printed flooring for normal economical range and Royal Star, Moonwalk, Majesty, Opera, Symphony, Royal Classic etc.",
      applications: [
        // {
        //   image: "/images/applications/residential/RS3114.jpg",
        //   name: "Royal Star",
        //   innerCategory: "/royal-star",
        // },

        // {
        //   image: "/images/applications/education/MW2011.jpg",
        //   name: "Moonwalk",
        //   innerCategory: "/moonwalk",
        // },
        // {
        //   image: "/images/applications/residential/EG2047.jpg",
        //   name: "Elegant",
        //   innerCategory: "/elegant",
        // },
        // {
        //   image: "/images/applications/education/MK2152.jpg",
        //   name: "Mirakle",
        //   innerCategory: "/mirakle",
        // },
        // {
        //   image: "/images/applications/education/Blue-Lagoon.jpg",
        //   name: "Accord",
        //   innerCategory: "/accord",
        // },
        // {
        //   image: "/images/applications/education/DZ2998.jpg",
        //   name: "Dazzle",
        //   innerCategory: "/dazzle",
        // },
        {
          image: "/images/applications/residential/MP 117047.jpg",
          name: "Majesty Pro",
          innerCategory: "/majesty-pro",
        },
        {
          image: "/images/applications/residential/1.jpg",
          name: "Opera",
          innerCategory: "/opera",
        },
        {
          image: "/images/categories/royal-classic/17.jpg",
          name: "Royal Classic",
          innerCategory: "/royal-classic",
        },
        {
          image: "/images/planks/rad/spruce.JPG",
          name: "LVT",
          innerCategory: "/lvt-flooring",
        },
        {
          image: "/images/applications/residential/1 (1).jpg",
          name: "Majesty",
          innerCategory: "/majesty",
        },
        {
          image: "/images/applications/residential/3.jpg",
          name: "Printend Flooring",
          innerCategory: "/printend-flooring",
        },
      ],
    },
    {
      type: "Offices-Retail",
      title: "Offices",
      spanTitle: "/ Retail",
      name: "Offices/Retail",
      // bannerImg: "/images/vinyl/Office Vinyl.jpg",
      bannerImg:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751282602/Office_Vinyl_eda58f.jpg",
      para: "Where aesthetics meet practicality, our various ranges are designed to meet the growing aesthetics demands of the guests/ customers in offices, retail and hospitality. It also meets the high performance requirement at the same time.",
      applications: [
        // {
        //   image: "/images/applications/offices/MW2011.jpg",
        //   name: "Moonwalk",
        //   innerCategory: "/moonwalk",
        // },

        // {
        //   image: "/images/applications/offices/DZ2998.jpg",
        //   name: "Dazzle",
        //   innerCategory: "/dazzle",
        // },
        // {
        //   image: "/images/applications/offices/Blue-Lagoon.jpg",
        //   name: "Accord",
        //   innerCategory: "/accord",
        // },
        {
          image: "/images/applications/offices/AT2041.jpg",
          name: "Orbit",
          innerCategory: "/orbit",
        },
        {
          image: "/images/applications/offices/1 (1).jpg",
          name: "Suprema RS",
          innerCategory: "/suprema-rs",
        },
        {
          image: "/images/applications/offices/3.jpg",
          name: "Standard RS",
          innerCategory: "/standard-rs",
        },
        {
          image: "/images/planks/rad/spruce.JPG",
          name: "LVT",
          innerCategory: "/lvt-flooring",
        },
        {
          image: "/images/applications/offices/MP351013.jpg",
          name: "Majesty Pro",
          innerCategory: "/majesty-pro",
        },
        {
          image: "/images/applications/offices/1 (2).jpg",
          name: "Majesty",
          innerCategory: "/majesty",
        },
        {
          image: "/images/categories/royal-classic/17.jpg",
          name: "Royal Classic",
          innerCategory: "/royal-classic",
        },
        {
          image: "/images/categories/tiger/stone-path.jpg",
          name: "Tiger",
          innerCategory: "/tiger",
        },
        // {
        //   image: "/images/applications/offices/MK2152.jpg",
        //   name: "Mirakle",
        //   innerCategory: "/mirakle",
        // },

        // {
        //   image: "/images/applications/offices/1.jpg",
        //   name: "Tuff",
        //   innerCategory: "/tuff",
        // },

        // {
        //   image: "/images/applications/offices/RQ2642.jpg",
        //   name: "Aqua RS",
        //   innerCategory: "/aqua-rs",
        // },

        // {
        //   image: "/images/applications/offices/SY2406.jpg",
        //   name: "Symphony",
        //   innerCategory: "/symphony",
        // },
        // {
        //   image: "/images/applications/offices/RS3112.jpg",
        //   name: "Royal Star",
        //   innerCategory: "/royal-star",
        // },

        // {
        //   image: "/images/applications/offices/SK2630.jpg",
        //   name: "Startrek",
        //   innerCategory: "/startrek",
        // },
        // {
        //   image: "/images/applications/offices/EG2047.jpg",
        //   name: "Elegant",
        //   innerCategory: "/elegant",
        // },
      ],
    },
    {
      type: "Hospitality",
      title: "Hospitality",
      name: "Hospitality",
      // bannerImg: "/images/vinyl/Hospitality Vinyl.jpg",
      bannerImg:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751282594/Hospitality_Vinyl_w9wglm.jpg",
      para: "Where aesthetics meet practicality, our various ranges are designed to meet the growing aesthetics demands of the guests/ customers in offices, retail and hospitality. It also meets the high performance requirement at the same time.",
      applications: [
        {
          image: "/images/applications/offices/1.jpg",
          name: "Tuff",
          innerCategory: "/tuff",
        },
        {
          image: "/images/applications/hospitality/5.jpg",
          name: "Sonata",
          innerCategory: "/sonata",
        },
        {
          image: "/images/applications/offices/1 (1).jpg",
          name: "Suprema RS",
          innerCategory: "/suprema-rs",
        },
        {
          image: "/images/applications/offices/3.jpg",
          name: "Standard RS",
          innerCategory: "/standard-rs",
        },
        {
          image: "/images/applications/hospitality/1.jpg",
          name: "Eco Plus V",
          innerCategory: "/eco-plus-v",
        },
        {
          image: "/images/categories/royal-star/RS3114.jpg",
          name: "Royal Star",
          innerCategory: "/royal-star",
        },

        {
          image: "/images/categories/tiger/stone-path.jpg",
          name: "Tiger",
          innerCategory: "/tiger",
        },
        // {
        //   image: "/images/applications/offices/MW2011.jpg",
        //   name: "Moonwalk",
        //   innerCategory: "/moonwalk",
        // },

        // {
        //   image: "/images/applications/offices/EG2047.jpg",
        //   name: "Elegant",
        //   innerCategory: "/elegant",
        // },
        // {
        //   image: "/images/applications/offices/Blue-Lagoon.jpg",
        //   name: "Accord",
        //   innerCategory: "/accord",
        // },

        // {
        //   image: "/images/applications/offices/DZ2998.jpg",
        //   name: "Dazzle",
        //   innerCategory: "/dazzle",
        // },
        // {
        //   image: "/images/applications/offices/MK2152.jpg",
        //   name: "Mirakle",
        //   innerCategory: "/mirakle",
        // },

        // {
        //   image: "/images/applications/offices/MP351013.jpg",
        //   name: "Majesty Pro",
        //   innerCategory: "/majesty-pro",
        // },

        // {
        //   image: "/images/applications/offices/RQ2642.jpg",
        //   name: "Aqua RS",
        //   innerCategory: "/aqua-rs",
        // },
        // {
        //   image: "/images/applications/offices/lvt-group.png",
        //   name: "Nuplank",
        //   innerCategory: "/nuplank",
        // },
        // {
        //   image: "/images/applications/offices/SY2406.jpg",
        //   name: "Symphony",
        //   innerCategory: "/symphony",
        // },

        // {
        //   image: "/images/applications/offices/1 (2).jpg",
        //   name: "Majesty",
        //   innerCategory: "/majesty",
        // },
        // {
        //   image: "/images/applications/offices/SK2630.jpg",
        //   name: "Startrek",
        //   innerCategory: "/startrek",
        // },

        // {
        //   image: "/images/applications/offices/4 (1).png",
        //   name: "Royal Classic",
        //   innerCategory: "/royal-classic",
        // },
      ],
    },
    {
      type: "Transport",
      title: "Transport",
      name: "Transport",
      // bannerImg: "/images/vinyl/Transport Vinyl.jpg",
      bannerImg:
        "https://res.cloudinary.com/dcmdihrzp/image/upload/v1751282604/Transport_Vinyl_rm88z4.jpg",
      para: "Various range of high endurance transport Vinyl Flooring are designed to meet the high Safety standards, provide a hygienic, comfortable and attractive environment to passengers. Pioneers of introducing Vinyl Flooring ranges like Gripper, Suprema RS, Standard RS, Sonata and Ecoplus V of International Standards for the Transport Industry in india.",
      applications: [
        {
          image: "/images/applications/hospitality/5.jpg",
          name: "Sonata",
          innerCategory: "/sonata",
        },

        {
          image: "/images/applications/offices/1 (1).jpg",
          name: "Suprema RS",
          innerCategory: "/suprema-rs",
        },
        {
          image: "/images/applications/offices/3.jpg",
          name: "Standard RS",
          innerCategory: "/standard-rs",
        },
        {
          image: "/images/applications/hospitality/1.jpg",
          name: "Eco Plus V",
          innerCategory: "/eco-plus-v",
        },
        {
          image: "/images/applications/transport/1.jpg",
          name: "Gripper",
          innerCategory: "/gripper",
        },
      ],
    },
    // {
    //   type: "Sports",
    //   title: "Sports",
    //   name: "Sports",
    //   bannerImg: "/images/vinyl/Avenger-Banner.jpg",
    //   para: "Avengers is multi- purpose sports surface designed for use in a wide range of sporting events like Gymnasiums, Yoga rooms, Table Tennis, fitness centers etc. It is manufactured keeping in view the varying shock absorbing requirements and performance requirements.",
    //   applications: [
    //     {
    //       image: "/images/applications/sports/avenger.jpg",
    //       name: "Avenger",
    //       innerCategory: "/avenger",
    //     },
    //   ],
    // },
  ];

  const applicationTabsData = [
    {
      category: "Education",
      url: "/vinyl-flooring/education",
      items: [
        // { name: "Moonwalk", url: "/moonwalk" },
        // { name: "Accord", url: "/accord" },
        // { name: "Mirakle", url: "/mirakle" },
        // { name: "Symphony", url: "/symphony" },
        // { name: "Startrek", url: "/startrek" },
        { name: "Royal Star", url: "/royal-star" },
        { name: "Tiger", url: "/tiger" },
        { name: "LVT", url: "/lvt-flooring" },
        { name: "Royal Classic", url: "/royal-classic" },
        { name: "Majesty", url: "/majesty" },
        { name: "Tuff", url: "/tuff" },
        // { name: "Elegant", url: "/elegant" },
        // { name: "Dazzle", url: "/dazzle" },

        // { name: "Avengers", url: "/avengers" },
      ],
    },
    {
      category: "Health Care",
      url: "/vinyl-flooring/healthcare",
      items: [
        { name: "Orbit", url: "/orbit" },
        { name: "Royal Star", url: "/royal-star" },
        { name: "Tuff", url: "/tuff" },
        { name: "LVT", url: "/lvt-flooring" },
        { name: "Tiger", url: "/tiger" },
      ],
    },
    // {
    //   category: "Wet Areas",
    //   url: "/vinyl-flooring/wet-areas",
    //   items: [{ name: "Aqua RS", url: "/aqua-rs" }],
    // },
    {
      category: "Residential",
      url: "/vinyl-flooring/residential",
      items: [
        { name: "Majesty Pro", url: "/majesty-pro" },
        { name: "Opera", url: "/opera" },
        { name: "Royal Classic", url: "/royal-classic" },
        { name: "LVT", url: "/lvt-flooring" },
        { name: "Majesty", url: "/majesty" },
        { name: "Printed Flooring", url: "/printed-flooring" },
      ],
    },
    {
      category: "Offices/Retail",
      url: "/vinyl-flooring/offices-retail",
      items: [
        { name: "Orbit", url: "/orbit" },
        { name: "Suprema RS", url: "/suprema-rs" },
        { name: "Standard RS", url: "/standard-rs" },
        { name: "LVT", url: "/lvt-flooring" },
        { name: "Majesty Pro", url: "/majesty-pro" },
        { name: "Majesty", url: "/majesty" },
        { name: "Royal Classic", url: "/royal-classic" },
        { name: "Tiger", url: "/tiger" },
      ],
    },
    {
      category: "Hospitality",
      url: "/vinyl-flooring/hospitality",
      items: [
        { name: "Tuff", url: "/tuff" },
        { name: "Sonata", url: "/sonata" },
        { name: "Suprema RS", url: "/suprema-rs" },
        { name: "Standard RS", url: "/standard-rs" },
        { name: "Eco Plus V", url: "/eco-plus-v" },
        { name: "Royal Star", url: "/royal-star" },
        { name: "Tiger", url: "/tiger" },
      ],
    },
    {
      category: "Transport",
      url: "/vinyl-flooring/transport",
      items: [
        { name: "Sonata", url: "/sonata" },
        { name: "Suprema RS", url: "/suprema-rs" },
        { name: "Standard RS", url: "/standard-rs" },
        { name: "Eco Plus V", url: "/eco-plus-v" },
        { name: "Gripper", url: "/gripper" },
      ],
    },
    // {
    //   category: "Sports",
    //   url: "/vinyl-flooring/sports",
    //   items: [{ name: "Avengers", url: "/avengers" }],
    // },
  ];

  const selectedCategory = applicationData.find(
    (data) => data.type.toLowerCase() === category.toLowerCase()
  );

  if (!selectedCategory) {
    return <Navigate to="/" replace />;
  }

  const bannerData = {
    bannerImg: selectedCategory.bannerImg,
    title: selectedCategory?.name || "Default Title", // Ensure it doesn't break if selectedCategory is undefined
    breadcrumbs: [
      { label: "Home", path: "/", active: false },
      { label: "Vinyl Flooring", path: "/vinyl-flooring", active: false },
      { label: selectedCategory?.name, path: null, active: true },
    ],
  };

  return (
    <Layout>
      <Banner
        bannerImg={bannerData.bannerImg}
        title={bannerData.title}
        breadcrumbs={bannerData.breadcrumbs}
      />

      <section className="applications-section vinyl-applications-section">
        <div className="container">
          <div className="row">
            <ul className="application-tabs d-lg-flex align-items-center justify-content-center d-none">
              {applicationTabsData.map((tab, index) => (
                <li key={index} className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href={tab.url}
                    role="button"
                  >
                    {tab.category}
                  </a>
                  <ul className="dropdown-menu">
                    {tab.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a className="dropdown-item" href={item.url}>
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
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

          <p className="paragraph gray-para text-center">
            {selectedCategory.para}
          </p>
        </div>
      </section>

      <section className="application-types-section">
        <div className="container">
          <div className="row">
            {selectedCategory.applications.map((application, index) => (
              <div className="col-lg-2 col-md-6 col-12 mt-4" key={index}>
                <NavLink to={application.innerCategory}>
                  <div className="single-application-div">
                    <div className="single-application-img">
                      <img src={application.image} alt={application.name} />
                    </div>

                    <h4>{application.name}</h4>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ApplicationsModal />
    </Layout>
  );
};

export default VinylApp;
