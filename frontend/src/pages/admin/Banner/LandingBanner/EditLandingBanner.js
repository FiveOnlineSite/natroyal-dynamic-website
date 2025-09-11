import React, { useState, useEffect } from "react";
import Layout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditLandingBanner = () => {
  const { id } = useParams();
  const [landingBanner, setLandingBanner] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
const [validationError, setValidationError] = useState("");
  
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    alt: "",
    heading: "",
    banner: {
      file: "",
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
            filepath: LandingBannerData.banner.filepath || "",
          },
          type: LandingBannerData.type
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

     const isImage = formData.type === "image";
  const isVideo = formData.type === "video";

  if (isImage && formData.alt.trim() === "") {
    setValidationError("Alt text is required for images.");
    setIsSubmitting(false);
    return;
  }

    const formDataToSend = new FormData();

    formDataToSend.append("heading", formData.heading || "");
    formDataToSend.append("heading_color", formData.heading_color || "");
    formDataToSend.append("page", formData.page || "");

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
                          toast.success("Landing banner updated successfully!");
      
    } catch (error) {
      console.error("Error updating landing banner:", error);
                          toast.error("Failed to update landing banner");
      
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
                <label>Banner (Image OR Video)</label>
                <input
                  type="file"
                  name="banner"
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

                    setFormData((prev) => ({
                      ...prev,
                      type: isImage ? "image" : "video",
                      banner: {
                        file,
                        filepath: URL.createObjectURL(file),
                      },
                    }));
                  }}
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
                <select
                  name="page"
                  required
                  value={formData.page}
                  onChange={handleChange}
                  disabled
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
