import React, { useState, useEffect } from "react";
import Layout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditLandingBanner = () => {
  const { id } = useParams();
  const [landingBanner, setLandingBanner] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    alt: "",
    heading: "",
    banner: {
      file: "",
      iframe: "",
      filepath: "",
    },
    heading_color: "",
    page: "",
  });

  useEffect(() => {
    const fetchLandingBanner = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/landing-banner/${id}`);
        const LandingBannerData = response.data.banner;
        setLandingBanner(LandingBannerData);

        setFormData({
          alt: LandingBannerData.alt || "",
          heading: LandingBannerData.heading || "",
          heading_color: LandingBannerData.heading_color || "",
          page: LandingBannerData.page || "",
          banner: {
            file: LandingBannerData.banner.filename,
            iframe: LandingBannerData.banner.iframe || "",
            filepath: LandingBannerData.banner.filepath || "",
          },
        });
      } catch (error) {
        console.error("Error fetching landing banner:", error);
        setErrorMessage("Failed to fetch landing banner data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLandingBanner();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "banner") {
      if (files && files.length > 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          banner: {
            file: files[0],
            iframe: "",
            filepath: URL.createObjectURL(files[0]),
          },
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          banner: {
            ...prevFormData.media,
            iframe: value.trim(),
            filepath: "",
          },
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.trim() === "" ? "" : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    setErrorMessage("");

    const isImage = !!formData.banner.file;
    const isVideo = !!formData.banner.iframe;

    // Validation
    if (!isImage && !isVideo) {
      setErrorMessage("Please provide either an iFrame URL or an image.");
      isSubmitting(false);
      return;
    }

    if (isImage && isVideo) {
      setErrorMessage(
        "Please provide either an iFrame URL or an image, not both."
      );
      isSubmitting(false);
      return;
    }

    if (isImage && (!formData.alt || formData.alt.trim() === "")) {
      setErrorMessage("Alt text is required when uploading an image.");
      isSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append("heading", formData.heading || "");
    formDataToSend.append("heading_color", formData.heading_color || "");
    formDataToSend.append("landing", formData.landing || "");

    if (isImage) {
      formDataToSend.append("banner", formData.banner.file);
      formDataToSend.append("alt", formData.alt);
    } else if (isVideo) {
      formDataToSend.append("banner", formData.banner.iframe.trim());
      formDataToSend.append("alt", "");
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.patch(
        `${apiUrl}/api/landing-banner/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log("Updated landing banner:", response.data.updatedBanner);
      navigate("/admin/landing-banner");
    } catch (error) {
      console.error("Error updating landing banner:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Landing Banner</h2>
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
                  value={formData.banner.iframe}
                  placeholder="iFrame URL"
                  onChange={handleChange}
                />
                <span>OR</span>
                <input
                  type="file"
                  accept=".webp,.jpg,.jpeg,.png"
                  name="banner"
                  onChange={handleChange}
                />
                {formData.banner.filepath && (
                  <img
                    className="form-profile"
                    src={`${formData.banner.filepath}`}
                    alt={`${formData.alt}`}
                    loading="lazy"
                  />
                )}
              </div>
            </div>
            {(!formData.banner.iframe || formData.banner.file) && (
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="theme-form">
                  <label>Alt</label>
                  <input
                    type="text"
                    name="alt"
                    value={formData.alt}
                    onChange={handleChange}
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
                  value={formData.heading}
                  onChange={handleChange}
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
                    value={formData.heading_color}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    maxLength={7}
                    placeholder="#FFFFFF"
                    value={formData.heading_color}
                    onChange={handleChange}
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
                  value={formData.page}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </div>

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

export default EditLandingBanner;
