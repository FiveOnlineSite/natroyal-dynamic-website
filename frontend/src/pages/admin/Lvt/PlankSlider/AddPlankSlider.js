import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";

const AddPlankSlider = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState({ file: "" });
  const [qr, setQr] = useState({ file: "" });
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [alt, setAlt] = useState("");
  const [qrAlt, setQrAlt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [plankCategories, setPlankCategories] = useState([]);

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPlankCategory = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/plank-category`);
        const plankCategories = response.data.plankCategories;
        setPlankCategories(plankCategories);

        console.log("PlankSlider cateogory", plankCategories);
      } catch (error) {
        console.error("Error fetching PlankSlider:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlankCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    const isImage = !!image.file;
    const isQr = !!qr.file;

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
    if (isImage && alt.trim() === "") {
      setValidationError("Alt text is required when uploading an image.");
      setIsSubmitting(false);
      return;
    }

    if (isQr && qrAlt.trim() === "") {
      setValidationError("Alt text is required when uploading QR.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();

      formData.append("name", name);
      formData.append("code", code);
      formData.append("alt", alt);
      formData.append("qr_alt", qrAlt);
      if (image.file) {
        formData.append("image", image.file);
      }
      if (qr.file) {
        formData.append("qr", qr.file);
      }

      formData.append("category_id", selectedCategory);

      await axios.post(`${apiUrl}/api/plank-slider`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        navigate("/admin/plank-slider");
      }, 1000);
    } catch (error) {
      console.error("Error adding plank Slider:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add Plank Slider</h2>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Code</label>
                <input
                  type="text"
                  name="code"
                  value={code}
                  required
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>PlankSlider Category</label>
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

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>QR</label>
                <input
                  type="file"
                  name="qr"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={(e) =>
                    setQr({
                      ...qr,
                      file: e.target.files[0],
                    })
                  }
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>QR Alt</label>
                <input
                  type="text"
                  name="qr_alt"
                  value={qrAlt}
                  required
                  onChange={(e) => setQrAlt(e.target.value)}
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

export default AddPlankSlider;
