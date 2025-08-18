import React, { useState, useEffect } from "react";
import Layout from "../../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddLandingBanner = () => {
  const [banner, setBanner] = useState({ iframe: "", file: "" });
  const [alt, setAlt] = useState("");
  const [heading, setHeading] = useState("");
  const [headingColor, setHeadingColor] = useState("#ffffff");
  const [page, setPage] = useState("");
  const [validationError, setValidationError] = useState(""); // State for validation error message
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    setErrorMessage("");

    // Validation
    if (!banner.iframe && !banner.file) {
      setValidationError("Please provide either an iFrame URL or an image.");
      setIsSubmitting(false);
      return;
    }

    if (banner.iframe && banner.file) {
      setValidationError(
        "Please provide either an iFrame URL or an image, not both."
      );
      setIsSubmitting(false);
      return;
    }

    const isImage = !!banner.file;
    if (isImage && alt.trim() === "") {
      setValidationError("Alt text is required when uploading an image.");
      setIsSubmitting(false);
      return;
    }

    setValidationError("");

    try {
      const formData = new FormData();
      if (isImage) {
        formData.append("alt", alt); // include alt
      }

      formData.append("heading", heading || "");
      formData.append("heading_color", headingColor || "#ffffff");
      formData.append("page", page);

      if (banner.iframe) {
        formData.append("banner", banner.iframe);
      } else if (banner.file) {
        formData.append("banner", banner.file);
      }

      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.post(
        `${apiUrl}/api/landing-banner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      navigate("/admin/landing-banner");
    } catch (error) {
      console.error("Error creating landing banner:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Add Landing Banner</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Banner</label>
                <input
                  type="text"
                  name="banner"
                  value={banner.iframe}
                  placeholder="iFrame URL"
                  onChange={(e) =>
                    setBanner({
                      ...banner,
                      iframe: e.target.value,
                      file: null,
                    })
                  }
                />
                <span> OR </span>
                <input
                  type="file"
                  name="banner"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={(e) =>
                    setBanner({
                      ...banner,
                      file: e.target.files[0],
                      iframe: "",
                    })
                  }
                />
              </div>
            </div>

            {(!banner.iframe || banner.file) && (
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="theme-form">
                  <label>Alt</label>
                  <input
                    type="text"
                    name="alt"
                    required
                    value={alt}
                    onChange={(e) => setAlt(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Heading</label>
                <input
                  type="text"
                  name="heading"
                  required
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Heading Color</label>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="color"
                    style={{ height: "40px", width: "120px" }}
                    name="heading_color"
                    value={headingColor}
                    onChange={(e) => setHeadingColor(e.target.value)}
                  />
                  <input
                    type="text"
                    maxLength={7}
                    placeholder="#FFFFFF"
                    value={headingColor}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^#([0-9A-F]{6}|[0-9A-F]{3})$/i.test(val)) {
                        setHeadingColor(val);
                      } else {
                        setHeadingColor(val); // still set it, but you could validate on blur
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Page</label>
                <input
                  type="text"
                  name="page"
                  value={page}
                  required
                  onChange={(e) => setPage(e.target.value)}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="error-message text-danger mt-2">
                {errorMessage}
              </div>
            )}

            <div className="col-12">
              <div className="theme-form">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="d-flex align-items-center">
                      <span
                        className="spinner-border me-2"
                        role="status"
                      ></span>
                      Save
                    </div>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddLandingBanner;
