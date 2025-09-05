import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";

const AddSuitable = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState({ file: "" });
  const [alt, setAlt] = useState("");
  const [applications, setApplications] = useState([]); 
    const [application, setApplication] = useState(""); 
    
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

 useEffect(() => {
    const fetchApplications = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const apiUrl = process.env.REACT_APP_API_URL;

        const res = await axios.get(`${apiUrl}/api/vinyl-application`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        setApplications(res.data.vinylApp || []); // adjust key based on your API
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    const isImage = !!image.file;

    if (!isImage) {
      setValidationError("Image is required.");
      setIsSubmitting(false);
      return;
    }
    if (isImage && alt.trim() === "") {
      setValidationError("Alt text is required when uploading an image.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();

      formData.append("alt", alt);
      if (image.file) {
        formData.append("image", image.file);
      }

      formData.append("application", application);

      await axios.post(`${apiUrl}/api/suitable`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        navigate("/admin/suitable");
      }, 1000);
    } catch (error) {
      console.error("Error adding suitable:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
     <AdminLayout>
      <div className="theme-form-header">
        <h2>Add Suitable</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
          
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
               <div className="theme-form">
                <label>Application</label>
                <select
                  required
                  name="application"
                  value={application}
                  onChange={(e) => setApplication(e.target.value)}
                  className="form-control"
                >
                    <option selected disabled value="">Select Application</option>
                    {applications && applications.map((app) => (
                        <option key={app._id} value={app._id}>
                        {app.name}
                        </option>
                    ))}
                    </select>

              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={(e) =>
                    setImage({
                      ...image,
                      file: e.target.files[0],
                    })
                  }
                />

              </div>
            </div>

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

export default AddSuitable;
