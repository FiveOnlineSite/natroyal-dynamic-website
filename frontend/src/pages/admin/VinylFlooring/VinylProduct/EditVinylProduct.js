import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditVinylProduct = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [vinylProduct, setVinylProduct] = useState("");
 
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState([]); // ⬅ multiple IDs
  const [applications, setApplications] = useState([]);
  
   const [formData, setFormData] = useState({
     name: "",
     alt: "",
     image: {
       file: "",
       filepath: "",
     },
     applications: [], // ⬅ to hold multiple application IDs
   });

  useEffect(() => {
    const fetchVinylProduct = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/vinyl-product/${id}`);
        const vinylProductData = response.data.product;
        setVinylProduct(vinylProductData);

        console.log("vinyl product data", vinylProductData);

        setFormData({
          name: vinylProductData.name,
          alt: vinylProductData.alt,
          image: {
            file: vinylProductData.image?.[0]?.filename || "",
            filepath: vinylProductData.image?.[0]?.filepath || "",
          },
        });

         setSelectedApplications(
  (vinylProductData.applications || []).map((app) => app._id || app)
);

      } catch (error) {
        console.error("Error fetching vinyl product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVinylProduct();
  }, []);

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
        [name]: value.trim() === "" ? "" : value,
      }));
  }
}

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

    setErrorMessage("");
   


    const isImage = !!formData.image.file;

    if (!isImage) {
      setValidationError("Image is required.");
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
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name || "");
      formDataToSend.append("alt", formData.alt || "");
      if (isImage) {
        formDataToSend.append("image", formData.image.file);
      }
      formDataToSend.append("applications", JSON.stringify(selectedApplications));

      await axios.patch(`${apiUrl}/api/vinyl-product/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        navigate("/admin/vinyl-products");
      }, 1000);
              toast.success("Vinyl flooring product updated successfully!");

    } catch (error) {
      console.error("Error adding vinyl products:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");

              toast.success("Failed to update vinyl flooring product");
      
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit vinyl products</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
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
                    setFormData((prev) => ({
                      ...prev,
                        image: {
                          file,
                        filepath: URL.createObjectURL(file),
                        }
                    }));
                  }}
                />
                 {formData.image.filepath && (
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

export default EditVinylProduct;
