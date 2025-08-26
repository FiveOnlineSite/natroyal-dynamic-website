import React, { useState, useEffect } from "react";
import Layout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBanner = () => {
  const { id } = useParams();
  const [banner, setBanner] = useState(null);
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
    page: "",
  });

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/banner/${id}`);
        const bannerData = response.data.banner;
        setBanner(bannerData);

        setFormData({
          alt: bannerData.alt || "",
          heading: bannerData.heading || "",
          page: bannerData.page || "",
          banner: {
            file: bannerData.banner.filename,
            iframe: bannerData.banner.iframe || "",
            filepath: bannerData.banner.filepath || "",
          },
        });
      } catch (error) {
        console.error("Error fetching banner:", error);
        setErrorMessage("Failed to fetch banner data.");
      }
    };

    fetchBanner();
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
    formDataToSend.append("page", formData.page || "");

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
        `${apiUrl}/api/banner/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log("Updated banner:", response.data.updatedBanner);
      navigate("/admin/banner");
    } catch (error) {
      console.error("Error updating banner:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Banner</h2>
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

export default EditBanner;
