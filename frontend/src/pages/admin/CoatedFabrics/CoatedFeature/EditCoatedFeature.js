import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCoatedFeature = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [coatedFeature, setCoatedFeature] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    alt: "",
    icon: {
      file: "",
      filepath: "",
    },
  });

  useEffect(() => {
    const fetchCoatedFeature = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/coated-feature/${id}`
        );
        const coatedFeatureData = response.data.Feature;
        setCoatedFeature(coatedFeatureData);

        console.log("coated feature data", coatedFeatureData);

        setFormData({
          name: coatedFeatureData.name,
          alt: coatedFeatureData.alt,
          icon: {
            file: coatedFeatureData.icon?.[0]?.filename || "",
            filepath: coatedFeatureData.icon?.[0]?.filepath || "",
          },
        });
      } catch (error) {
        console.error("Error fetching coated feature:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoatedFeature();
  }, []);

   const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "icon") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        icon: {
          file: files[0],
          filepath: URL.createObjectURL(files[0]),
        },
      }));
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

    const isicon = !!formData.icon.file;

    if (!isicon) {
      setValidationError("icon is required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name || "");
      formDataToSend.append("alt", formData.alt || "");
      if (isicon) {
        formDataToSend.append("icon", formData.icon.file);
      }

      await axios.patch(
        `${apiUrl}/api/coated-feature/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/coated-features");
      }, 1000);

      toast.success("Coated fabrics feature updated successfully!");
      
    } catch (error) {
      console.error("Error adding coated features:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to update coated fabrics feature");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit coated features</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Icon</label>
                <input
                  type="file"
                  name="icon"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={handleChange}
                />
                {formData.icon?.filepath && (
                  <img
                    className="form-profile"
                    src={formData.icon.filepath}
                    alt={formData.alt}
                    loading="lazy"
                  />
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Alt</label>
                <input
                  type="text"
                  name="alt"
                  value={formData.alt}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            {errorMessage && (
              <div className="text-danger col-12 mt-2">{errorMessage}</div>
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
    </AdminLayout>
  );
};

export default EditCoatedFeature;
