import React, { useState, useEffect } from "react";
import Layout from "../../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddHomeBanner = () => {
  const [banner, setBanner] = useState({ file: "" });
  const [alt, setAlt] = useState("");
  const [heading, setHeading] = useState("");
  const [headingColor, setHeadingColor] = useState("#ffffff");
  const [button, setButton] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [validationError, setValidationError] = useState(""); // State for validation error message
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

     if (!banner.file) {
  setValidationError("Please upload an image or a video.");
  setIsSubmitting(false);
  return;
}

const ext = banner.file.name.split(".").pop().toLowerCase();
const isImage = ["webp", "jpg", "jpeg", "png"].includes(ext);
const isVideo = ["mp4"].includes(ext);

if (isImage && alt.trim() === "") {
  setValidationError("Alt text is required for images.");
  setIsSubmitting(false);
  return;
}

setValidationError("")

    try {
      const formData = new FormData();
      // if (isImage) {
      //   formData.append("alt", alt); // include alt
      // }

      formData.append("heading", heading || "");
      formData.append("alt", alt || "");
      formData.append("heading_color", headingColor || "#ffffff");
      formData.append("button", button || "");
      formData.append("button_url", buttonUrl || "");

      if (banner.file) {
        formData.append("banner", banner.file);
      }

      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.post(`${apiUrl}/api/home-banner`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });

      navigate("/admin/home-banner");
              toast.success("Home banner created successfully!");

    } catch (error) {
      console.error("Error creating home banner:", error);
              toast.error("Failed to create home banner");

      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Add Home Banner</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Banner (Image OR Video)</label>
                 <input
                   type="file"
                   name="banner"
                   accept=".webp,.jpg,.jpeg,.png,.mp4"
                   onChange={(e) =>
                    setBanner({
                      ...banner,
                      file: e.target.files[0],
                    })
                  }
                 />
              </div>
            </div>

            {banner?.file && ["png", "webp", "jpg", "jpeg"].includes(
                banner.file.name.split(".").pop().toLowerCase()
              ) && (
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
                  value={heading}
                  required
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
                        setHeadingColor(val);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Button</label>
                <input
                  type="text"
                  name="button"
                  value={button}
                  onChange={(e) => setButton(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Button Url</label>
                <input
                  type="text"
                  name="button_url"
                  value={buttonUrl}
                  onChange={(e) => setButtonUrl(e.target.value)}
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

export default AddHomeBanner;
