import React, { useState, useEffect } from "react";
import Layout from "../../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddLandingBanner = () => {
  const [banner, setBanner] = useState({ file: "" });
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
    if (isSubmitting) return; 

    if (validationError) {
            toast.error(validationError);
            return;
        }
    
         if (errorMessage) {
            toast.error(errorMessage);
            return;
        }
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
       formData.append("alt", alt || "");
      formData.append("heading", heading || "");
      formData.append("heading_color", headingColor || "#ffffff");
      formData.append("page", page);

     if (banner.file) {
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
                    toast.success("Landing banner created successfully!");
      
    } catch (error) {
      console.error("Error creating landing banner:", error);
                    toast.error("Landing banner created successfully!");
      
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
                <label>Banner (Image OR Video)</label>
                 <input
                   type="file"
                   name="banner"
                   required
                   accept=".webp,.jpg,.jpeg,.png,.mp4"
                   onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      const ext = file.name.split(".").pop().toLowerCase();
                      const isImage = ["webp", "jpg", "jpeg", "png"].includes(ext);
                      const isVideo = ext === "mp4";

                      let maxSizeBytes = 0;

                      if (isImage) maxSizeBytes = 500 * 1024; // 500 KB
                      else if (isVideo) maxSizeBytes = 10 * 1024 * 1024; // 10 MB
                      else {
                        setErrorMessage("Only images or MP4 videos are allowed.");
                        e.target.value = "";
                        return;
                      }

                      if (file.size > maxSizeBytes) {
                        setErrorMessage(
                          isImage
                            ? "Image size must be under 500 KB."
                            : "Video size must be under 10 MB."
                        );
                        e.target.value = "";
                        return;
                      }

                      // Clear any previous error
                      setErrorMessage("");

                      // Update banner state
                      setBanner({
                        ...banner,
                        file,
                        filepath: URL.createObjectURL(file),
                        type: isImage ? "image" : "video",
                      });
                    }}
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
                 <select
                   name="page"
                   required
                   value={page}
                   onChange={(e) => setPage(e.target.value)}
                 >
                  <option value="" disabled>
                    Select a Page
                  </option>

                  <option value="/vinyl-flooring">Vinyl Flooring</option>
                  <option value="/lvt-flooring">LVT</option>
                  <option value="/coated-fabrics">Coated Fabrics</option>
                  <option value="/seating-components">Seating Components</option>
                  <option value="/knit-fabrics">Knit Fabrics</option>

                </select>
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
