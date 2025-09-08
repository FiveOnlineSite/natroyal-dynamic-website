import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MetaDataComponent = () => {
  const location = useLocation(); // gives current URL (pathname, search, hash)

  useEffect(() => {
    const fetchMetaTag = async () => {
      // Add canonical tag
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

      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        // Use full pathname instead of only last segment
        let page = location.pathname;

        if (page === "/" || page === "") {
          page = "/home";
        }

        const response = await axios.get(`${apiUrl}/api/meta-data/by-page${page}`);
        const metaTag = response.data;

        // Update <title>
        document.title = metaTag.metaTitle || "Default Title";

        // Meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute("content", metaTag.metaDescription || "");
        } else {
          metaDescription = document.createElement("meta");
          metaDescription.name = "description";
          metaDescription.content = metaTag.metaDescription || "";
          document.head.appendChild(metaDescription);
        }

        // Meta keywords
        let metaKeyword = document.querySelector('meta[name="keywords"]');
        if (metaKeyword) {
          metaKeyword.setAttribute("content", metaTag.metaKeyword || "");
        } else {
          metaKeyword = document.createElement("meta");
          metaKeyword.name = "keywords"; // ✅ should be "keywords", not "keyword"
          metaKeyword.content = metaTag.metaKeyword || "";
          document.head.appendChild(metaKeyword);
        }
      } catch (error) {
        console.error("Error fetching meta tag:", error);
      }
    };

    fetchMetaTag();
  }, [location]);

  return null;
};

export default MetaDataComponent;
