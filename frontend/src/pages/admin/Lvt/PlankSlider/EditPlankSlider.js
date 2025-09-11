import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../../components/AdminLayout";
import { toast } from "react-toastify";

const EditPlankSlider = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [plankSlider, setPlankSlider] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [plankCategories, setPlankCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    alt: "",
    qr_alt: "",
    image: {
      file: "",
      filepath: "",
    },
    qr: {
      file: "",
      filepath: "",
    },
  });

  useEffect(() => {
    const fetchPlankCategory = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/plank-category`);
        const plankCategories = response.data.plankCategories;
        setPlankCategories(plankCategories);

        console.log("plank cateogory", plankCategories);
      } catch (error) {
        console.error("Error fetching plank category:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlankCategory();
  }, []);

  useEffect(() => {
    const fetchPlankSlider = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/plank-slider/${id}`);
        const plankSliderData = response.data.plankSlider;
        setPlankSlider(plankSliderData);

        console.log("plank slider data", plankSliderData);

        setSelectedCategory(plankSliderData.category_id?._id || "");

        setFormData({
          name: plankSliderData.name,
          code: plankSliderData.code,
          alt: plankSliderData.alt,
          qr_alt: plankSliderData.qr_alt,
          image: {
            file: plankSliderData.image?.[0]?.filename || "",
            filepath: plankSliderData.image?.[0]?.filepath || "",
          },
          qr: {
            file: plankSliderData.qr?.[0]?.filename || "",
            filepath: plankSliderData.qr?.[0]?.filepath || "",
          },
        });
      } catch (error) {
        console.error("Error fetching plank slider:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlankSlider();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      if (name === "image") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: {
            file: files[0],
            filepath: URL.createObjectURL(files[0]),
          },
        }));
      } else if (name === "qr") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          qr: {
            file: files[0],
            filepath: URL.createObjectURL(files[0]),
          },
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.trim(),
      }));
    }
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
                            
    setIsSubmitting(true);
    setErrorMessage("");

    console.log("alt:", typeof formData.alt, formData.alt);

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const isImage = !!formData.image.file;
      const isQr = !!formData.qr.file;

      if (!isQr) {
        setValidationError("QR is required.");
        setIsSubmitting(false);
        return;
      }

      if (!isImage) {
        setValidationError("Image is required.");
        setIsSubmitting(false);
        return;
      }

      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name || "");
      formDataToSend.append("code", formData.code || "");
      formDataToSend.append("alt", formData.alt || "");
      formDataToSend.append("qr_alt", formData.qr_alt || "");
      formDataToSend.append("category_id", selectedCategory);

      if (isImage) {
        formDataToSend.append("image", formData.image.file);
      }

      if (isQr) {
        formDataToSend.append("qr", formData.qr.file);
      }

      await axios.patch(`${apiUrl}/api/plank-slider/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multiform/formdata",
        },
      });

      setTimeout(() => {
        navigate("/admin/plank-slider");
      }, 1000);
      toast.success("Plank slider updated successfully!");
      
    } catch (error) {
      console.error("Error updating plank Slider:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to update plank slider");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit Plank Slider</h2>
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
                <label>Code</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Plank Category</label>
                <select
                  value={selectedCategory}
                  required
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select a Category</option>
                  {plankCategories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
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

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>QR</label>
                <input
                  type="file"
                  name="qr"
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
                        qr: {
                          file,
                        filepath: URL.createObjectURL(file),
                        }
                    }));
                  }}
                />
                {formData.qr?.filepath && (
                  <img
                    className="form-profile"
                    src={formData.qr.filepath}
                    alt={formData.qr_alt}
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>QR Alt</label>
                <input
                  type="text"
                  name="qr_alt"
                  value={formData.qr_alt}
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

export default EditPlankSlider;
