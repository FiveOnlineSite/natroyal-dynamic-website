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
const [validationError, setValidationError] = useState("");
  

  const [formData, setFormData] = useState({
    alt: "",
    heading: "",
    banner: {
      file: "",
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
            filepath: bannerData.banner.filepath || "",
          },
          type: bannerData.type
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

    if (name === "banner" && files?.length > 0) {
    const file = files[0];
    const ext = file.name.split(".").pop().toLowerCase();
    const isImage = ["webp", "jpg", "jpeg", "png"].includes(ext);
    const isVideo = ["mp4"].includes(ext);

    setFormData((prev) => ({
      ...prev,
      type: isImage ? "image" : "video", // 👈 update type when new file chosen
      banner: {
        file,
        filepath: URL.createObjectURL(file),
      },
    }));
  } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.trim() === "" ? "" : value,
      }));
    }
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;
  setIsSubmitting(true);
  setErrorMessage("");

  const isImage = formData.type === "image";
  const isVideo = formData.type === "video";

  if (isImage && formData.alt.trim() === "") {
    setValidationError("Alt text is required for images.");
    setIsSubmitting(false);
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append("heading", formData.heading || "");
  formDataToSend.append("page", formData.page || "");

  // only append a new file if user selected one
  if (formData.banner.file instanceof File) {
    formDataToSend.append("banner", formData.banner.file);
  }

  if (isImage) {
    formDataToSend.append("alt", formData.alt);
  } else if (isVideo) {
    formDataToSend.append("alt", "");
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
                <label>Banner (Image OR Video)</label>
                <input 
                  type="file" 
                  name="banner"
                  accept=".webp,.jpg,.jpeg,.png,.mp4"
                  onChange={handleChange} 
                />
                {formData.type === "image" ? (
                  <img
                    className="form-profile"
                    src={`${formData.banner.filepath}`}
                    alt={`${formData.alt}`}
                    loading="lazy"
                  />
                ) : (
                  <video
                    className="form-profile"
                    src={`${formData.banner.filepath}`}
                    style={{ width: "100px", height: "100px" }}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
              </div>
            </div>
            {(formData.type === "image") && (
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
