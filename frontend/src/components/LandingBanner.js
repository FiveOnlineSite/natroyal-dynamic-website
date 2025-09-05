import axios from "axios";
import React, {useState, useEffect} from "react"

const LandingBanner = ({page}) => {

    const [landingBanner, setLandingBanner] = useState(null);

      useEffect(() => {
    const fetchLandingBanner = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/landing-banner/page${page}`);

        setLandingBanner(response.data.banner);
      } catch (error) {
        console.error("Error fetching Landing Banner:", error);
      }
    };

    fetchLandingBanner();
  }, [page]);

  if (!landingBanner) return null;

  return (
    <section className="landing-banner-section">
        <div className="slide-container">
          <div className="poster-container">
            
             { landingBanner.type === "image" ? (
                <img
                  src={landingBanner.banner.filepath}
                  alt={landingBanner.banner.alt || "Poster img"}
                  className="poster-image"
                  loading="lazy"
                />
              ) : landingBanner.type === "video" ? (
            <video
              src={landingBanner.banner.filepath}
              loop
              autoPlay
              muted
              playsInline
              preload="metadata"
              className="poster-image"
            />
          ) : (
              <p>No media available</p>
            )}
            {/* Common Banner Content - Placed inside the same container */}
            <div className="banner-text">
              <h1 className="banner-title" style={{color: landingBanner.heading_color}}>
                {landingBanner.heading}
              </h1>
              {/* <div className="d-flex">
                <NavLink to="/contact-us" className="custom-button">
                  Get Started
                </NavLink>
              </div> */}
            </div>
          </div>
        </div>
      </section>
  )
}

export default LandingBanner
