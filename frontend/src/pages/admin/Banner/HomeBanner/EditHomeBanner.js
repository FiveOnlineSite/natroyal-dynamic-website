import React, { useState, useEffect } from "react";
import Layout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditHomeBanner = () => {
  const { id } = useParams();
  const [homeBanner, setHomeBanner] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    alt: "",
    heading: "",
    banner: {
      file: "",
      iframe: "",
      filepath: "",
    },
    heading_color: "",
    button: "",
    button_url: "",
  });

  useEffect(() => {
    const fetchHomeBanner = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/home-banner/${id}`);
        const homeBannerData = response.data.banner;
        setHomeBanner(homeBannerData);

        setFormData({
          alt: homeBannerData.alt || "",
          heading: homeBannerData.heading || "",
          heading_color: homeBannerData.heading_color || "",
          button: homeBannerData.button || "",
          button_url: homeBannerData.button_url || "",
          banner: {
            file: homeBannerData.banner.filename,
            iframe: homeBannerData.banner.iframe || "",
            filepath: homeBannerData.banner.filepath || "",
          },
        });
      } catch (error) {
        console.error("Error fetching home banner:", error);
        setErrorMessage("Failed to fetch home banner data.");
      }
    };

    fetchHomeBanner();
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
      setIsSubmitting(false);
      return;
    }

    if (isImage && isVideo) {
      setErrorMessage(
        "Please provide either an iFrame URL or an image, not both."
      );
      setIsSubmitting(false);
      return;
    }

    if (isImage && (!formData.alt || formData.alt.trim() === "")) {
      setErrorMessage("Alt text is required when uploading an image.");
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append("heading", formData.heading || "");
    formDataToSend.append("heading_color", formData.heading_color || "");
    formDataToSend.append("button", formData.button || "");
    formDataToSend.append("button_url", formData.button_url || "");

    if (isImage) {
      formDataToSend.append("banner", formData.banner.file);
      formDataToSend.append("alt", formData.alt); // include alt
    } else if (isVideo) {
      formDataToSend.append("banner", formData.banner.iframe.trim());
      formDataToSend.append("alt", ""); // send empty string to clear alt
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.patch(
        `${apiUrl}/api/home-banner/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log("Updated home banner:", response.data.updatedBanner);
      navigate("/admin/home-banner");
    } catch (error) {
      console.error("Error updating home banner:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Home Banner</h2>
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
                <input type="file" name="banner" onChange={handleChange} />
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
                    required
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
                  required
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
                <label>Button</label>
                <input
                  type="text"
                  name="button"
                  value={formData.button}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Button Url</label>
                <input
                  type="text"
                  name="button_url"
                  value={formData.button_url}
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

export default EditHomeBanner;
