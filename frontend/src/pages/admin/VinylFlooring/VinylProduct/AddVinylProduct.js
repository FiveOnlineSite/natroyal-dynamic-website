import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddVinylProduct = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState({ file: "" });
  const [name, setName] = useState("");
  const [alt, setAlt] = useState("");
  const [applications, setApplications] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]); // ⬅ multiple IDs
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

 useEffect(() => {
  const fetchApplications = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const res = await axios.get(`${apiUrl}/api/vinyl-application`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const apps = res.data.vinylApp || [];
      setApplications(apps);

      if (apps.length > 0) {
        setSelectedApplications([apps[0]._id]);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  fetchApplications();
}, []);

  const handleCheckboxChange = (id) => {
    setSelectedApplications((prev) =>
      prev.includes(id)
        ? prev.filter((appId) => appId !== id) // remove if already selected
        : [...prev, id] // add if not selected
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
  

    if (errorMessage) {
                                          toast.error(errorMessage);
                                          return;
                                        }
                    
                        if (validationError) {
                                          toast.error(validationError);
                                          return;
                                        }
    
setValidationError("");
setErrorMessage("");

    if (!image.file) {
      setValidationError("Image is required.");
      setIsSubmitting(false);
      return;
    }
    if (image.file && alt.trim() === "") {
      setValidationError("Alt text is required when uploading an image.");
      setIsSubmitting(false);
      return;
    }

    if (selectedApplications.length === 0) {
  setValidationError("Please select at least one application.");
  setIsSubmitting(false);
  return;
}
  setIsSubmitting(true);

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();

      formData.append("applications", JSON.stringify(selectedApplications)); // ⬅ multiple IDs
      formData.append("name", name);
      formData.append("alt", alt);
      if (image.file) {
        formData.append("image", image.file);
      }

      await axios.post(`${apiUrl}/api/vinyl-product`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/vinyl-products");
              toast.success("Vinyl flooring product created successfully!");

    } catch (error) {
      console.error("Error adding vinyl product:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
              toast.error("Failed to create vinyl flooring product");

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add vinyl product</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Applications with checkboxes */}
            <div className="col-12">
              <div className="theme-form">
                <label>Applications</label>
                <div className="d-flex flex-wrap gap-3">
                  {applications.map((app) => (
                    <div key={app._id} className="form-check me-3 d-flex align-items-center">
                      <input
                        type="checkbox"
                        className="form-check-input w-auto p-2 me-3"
                        id={`app-${app._id}`}
                        value={app._id}
                        checked={selectedApplications.includes(app._id)}
                        onChange={() => handleCheckboxChange(app._id)}
                      />
                      <label
                        className="form-check-label mb-0"
                        htmlFor={`app-${app._id}`}
                      >
                        {app.name}
                      </label>
                    </div>
                  ))}
                </div>
                {validationError && (
                  <div className="text-danger mt-2">{validationError}</div>
                )}
              </div>
            </div>

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

            {/* Image */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const maxSizeMB = 500; // 10 MB
                    const maxSizeBytes = maxSizeMB * 1024;

                    if (file.size > maxSizeBytes) {
                      setErrorMessage(`File is too large! Maximum allowed size is ${maxSizeMB} KB.`);
                      e.target.value = ""; // clear the file input
                      return;
                    }

                    // Clear any previous error
                    setErrorMessage("");

                    // Proceed if size is okay
                    setImage({
                        file,
                        filepath: URL.createObjectURL(file),
                      
                    });
                  }}
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

export default AddVinylProduct;
