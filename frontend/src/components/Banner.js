import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Banner = ({ page }) => {
  const [banner, setBanner] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/banner/page/${encodeURIComponent(page)}`
        );
        setBanner(response.data.banner);
      } catch (error) {
        console.error("Error fetching Banner:", error);
      }
    };
    fetchBanner();
  }, [page]);

  if (!banner) return null;

  // --- Static breadcrumb mapping ---
  const staticCrumbs = {
    "/about-us": [{ label: "About Us", url: null }],
    "/our-divisions": [{ label: "Our Divisions", url: null }],
    "/contact-us": [{ label: "Contact Us", url: null }],
  };

  let crumbs = [];

  if (staticCrumbs[banner.page]) {
    // Static
    crumbs = staticCrumbs[banner.page];
  } else if (banner.page.includes("/vinyl-flooring/applications/")) {
    // Vinyl Applications
    const applicationName = banner.heading || banner.page.split("/").pop();
    crumbs = [
      { label: "Vinyl Flooring", url: "/vinyl-flooring" },
      { label: applicationName, url: null },
    ];
  } else if (banner.page.includes("/vinyl-flooring/")) {
    // Products
    const productName = banner.heading || banner.page.split("/").pop();
    crumbs = [
      { label: "Vinyl Flooring", url: "/vinyl-flooring" },
      { label: productName, url: null },
    ];
  } else if (banner.page.includes("/coated-fabrics/")) {
    // Coated Fabrics pages
    const subPage = banner.heading || banner.page.split("/").pop();
    crumbs = [
      { label: "Coated Fabrics", url: "/coated-fabrics" },
      { label: subPage, url: null },
    ];
    } else if (banner.page.includes("/seating-components/")) {
    const subPage = banner.heading || banner.page.split("/").pop();
    crumbs = [
      { label: "Seating Components", url: "/seating-components" },
      { label: subPage, url: null },
    ];
  } else {
    // fallback
    crumbs = [{ label: banner.heading, url: null }];
  }

  return (
    <section className="banner-section">
      <div className="row">
        <div className="banner-img p-0">
          {banner.type === "image" ? (
            <img src={banner.banner?.filepath} alt="banner" className="w-100" />
          ) : banner.type === "video" ? (
            <video
              src={banner.banner?.filepath}
              muted
              loop
              autoPlay
              className="w-100"
              playsInline
            ></video>
          ) : (
            <p>No media available for this page</p>
          )}

          <div className="banner-section-text">
            <div className="container px-lg-0 px-4">
              <h1 className="banner-title section-banner-title">{banner.heading}</h1>
              <div className="breadcrumb">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <NavLink to="/">Home</NavLink>
                    </li>

                    {crumbs.map((c, idx) => {
                      const label =
                        c.label.charAt(0).toUpperCase() +
                        c.label.slice(1).replace(/-/g, " ");

                      return (
                        <li
                          key={idx}
                          className={`breadcrumb-item ${
                            idx === crumbs.length - 1 ? "active" : ""
                          }`}
                        >
                          {c.url && idx !== crumbs.length - 1 ? (
                            <NavLink to={c.url}>{label}</NavLink>
                          ) : (
                            label
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
