import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MetaDataComponent = () => {
  const location = useLocation();

  useEffect(() => {
    const fetchMetaTag = async () => {
      const canonicalUrl = `${window.location.origin}${location.pathname}`;

      let linkCanonical = document.querySelector('link[rel="canonical"]');

      if (linkCanonical) {
        linkCanonical.setAttribute("href", canonicalUrl);
      } else {
        linkCanonical = document.createElement("link");
        linkCanonical.rel = "canonical";
        linkCanonical.href = canonicalUrl;
        document.head.appendChild(linkCanonical);
      }

      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        // Keep homepage as "/"
        const page = location.pathname || "/";

        const response = await axios.get(
          `${apiUrl}/api/meta-data/by-page`,
          {
            params: {
              page,
            },
          }
        );

        const metaTag = response.data;

        document.title = metaTag.metaTitle || "Natroyal";

        let metaDescription = document.querySelector(
          'meta[name="description"]'
        );

        if (metaDescription) {
          metaDescription.setAttribute(
            "content",
            metaTag.metaDescription || ""
          );
        } else {
          metaDescription = document.createElement("meta");
          metaDescription.name = "description";
          metaDescription.content = metaTag.metaDescription || "";
          document.head.appendChild(metaDescription);
        }

        let metaKeyword = document.querySelector(
          'meta[name="keywords"]'
        );

        if (metaKeyword) {
          metaKeyword.setAttribute(
            "content",
            metaTag.metaKeyword || ""
          );
        } else {
          metaKeyword = document.createElement("meta");
          metaKeyword.name = "keywords";
          metaKeyword.content = metaTag.metaKeyword || "";
          document.head.appendChild(metaKeyword);
        }
      } catch (error) {
        console.error(
          "Error fetching meta tag:",
          error.response?.data || error.message
        );
      }
    };

    fetchMetaTag();
  }, [location.pathname]);

  return null;
};

export default MetaDataComponent;
