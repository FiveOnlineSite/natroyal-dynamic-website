import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";

const EditCoatedProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [coatedProduct, setcoatedProduct] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applications, setApplications] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    alt: "",
    image: {
      file: "",
      filepath: "",
    },
    application: "",
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const access_token = localStorage.getItem("access_token");
        const response = await axios.get(`${apiUrl}/api/coated-application`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        setApplications(response.data.coatedApp || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  useEffect(() => {
    const fetchCoatedProduct = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/coated-product/${id}`);
        const coatedProductData = response.data.product;
        setcoatedProduct(coatedProductData);

        console.log("coated product data", coatedProductData);

        setFormData({
          name: coatedProductData.name,
          alt: coatedProductData.alt,
          image: {
            file: coatedProductData.image?.[0]?.filename || "",
            filepath: coatedProductData.image?.[0]?.filepath || "",
          },
          application: coatedProductData.application,
        });
      } catch (error) {
        console.error("Error fetching coated product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoatedProduct();
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
        [name]: value.trim() === "" ? "" : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    const isImage = !!formData.image.file;

    if (!isImage) {
      setValidationError("Image is required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name || "");
      formDataToSend.append("alt", formData.alt || "");
      if (isImage) {
        formDataToSend.append("image", formData.image.file);
      }
      formDataToSend.append("application", formData.application);

      await axios.patch(`${apiUrl}/api/coated-product/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        navigate("/admin/coated-products");
      }, 1000);
    } catch (error) {
      console.error("Error adding coated products:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit coated products</h2>
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
                  <option selected disabled value="">
                    Select Application
                  </option>
                  {applications &&
                    applications.map((app) => (
                      <option key={app._id} value={app._id}>
                        {app.name}
                      </option>
                    ))}
                </select>
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
                  onChange={handleChange}
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

export default EditCoatedProduct;
