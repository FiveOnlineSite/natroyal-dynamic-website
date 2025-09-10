import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../../components/AdminLayout";
import { toast } from "react-toastify";

const EditSuitable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [suitable, setSuitable] = useState("");

  const [formData, setFormData] = useState({
    alt: "",
    image: {
      file: "",
      filepath: "",
    },
    application: "",
  });

  
     const [applications, setApplications] = useState([]);

useEffect(() => {
  const fetchApplications = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const access_token = localStorage.getItem("access_token");
      const response = await axios.get(`${apiUrl}/api/vinyl-application`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setApplications(response.data.vinylApp || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  fetchApplications();
}, []);

  useEffect(() => {
    const fetchSuitable = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/suitable/${id}`);
        const suitableData = response.data.suitable;
        setSuitable(suitableData);

        console.log("suitable data", suitableData);

        setFormData({
          alt: suitableData.alt,
          image: {
            file: suitableData.image?.[0]?.filename || "",   
            filepath: suitableData.image?.[0]?.filepath || "",
          },
          application: suitableData.application?._id || "", 
        });
      } catch (error) {
        console.error("Error fetching suitable content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuitable();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

      if (name === "image") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: {
            file: files[0],
            filepath: URL.createObjectURL(files[0]),
          },
        }));
      } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.trim(),
      }));
    }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    console.log("alt:", typeof formData.alt, formData.alt);

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const isImage = !!formData.image.file;


      if (!isImage) {
        setValidationError("Image is required.");
        setIsSubmitting(false);
        return;
      }

      const formDataToSend = new FormData();

      formDataToSend.append("alt", formData.alt || "");
      formDataToSend.append("application", formData.application || "");

      if (isImage) {
        formDataToSend.append("image", formData.image.file);
      }

      await axios.patch(`${apiUrl}/api/suitable/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multiform/formdata",
        },
      });

      setTimeout(() => {
        navigate("/admin/suitables");
      }, 1000);

              toast.success("Suitable updated successfully!");

    } catch (error) {
      console.error("Error updating suitable:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
              toast.error("Failed to update suitable");

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit Suitable</h2>
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
                  value={formData.application}
                  onChange={handleChange}
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
                  onChange={handleChange}
                />

                {formData.image?.filepath && (
                  <img
                    className="form-profile"
                    src={formData.image.filepath}
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

export default EditSuitable;
