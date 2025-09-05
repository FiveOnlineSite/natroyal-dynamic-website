import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";

const AddLvtFeature = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [icon, setIcon] = useState({ file: "" });
  const [name, setName] = useState("");
  const [alt, setAlt] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    if (!icon.file) {
      setValidationError("icon is required.");
      setIsSubmitting(false);
      return;
    }
    if (icon.file && alt.trim() === "") {
      setValidationError("Alt text is required when uploading an icon.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();

      formData.append("name", name);
      formData.append("alt", alt);
      if (icon.file) {
        formData.append("icon", icon.file);
      }

      await axios.post(`${apiUrl}/api/lvt-feature`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/lvt-features");
    } catch (error) {
      console.error("Error adding lvt feature:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add lvt feature</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Name */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* icon */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Icon</label>
                <input
                  type="file"
                  name="icon"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={(e) =>
                    setIcon({
                      ...icon,
                      file: e.target.files[0],
                    })
                  }
                />
              </div>
            </div>

            {/* Alt */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Alt</label>
                <input
                  type="text"
                  name="alt"
                  value={alt}
                  required
                  onChange={(e) => setAlt(e.target.value)}
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

export default AddLvtFeature;
