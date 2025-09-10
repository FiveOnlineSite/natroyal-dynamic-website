import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditVinylProductVariant = () => {
    const { _id , id} = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [vinylProductVariant, setVinylProductVariant] = useState("");
 
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
   const [products, setProducts] = useState([]);
  
   const [formData, setFormData] = useState({
     name: "",
     alt: "",
     image: {
       file: "",
       filepath: "",
     },
     product: "",
   });

  useEffect(() => {
    const fetchProductVariant = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/vinyl-product-variant/${_id}`);
        const vinylProductVariantData = response.data.variant;
        setVinylProductVariant(vinylProductVariantData);

        console.log("vinyl product data", vinylProductVariantData);

        setFormData({
          name: vinylProductVariantData.name,
          alt: vinylProductVariantData.alt,
          image: {
            file: vinylProductVariantData.image?.[0]?.filename || "",
            filepath: vinylProductVariantData.image?.[0]?.filepath || "",
          },
          product: vinylProductVariantData.product?._id || "",
        });

        

      } catch (error) {
        console.error("Error fetching vinyl product variant:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductVariant();
  }, []);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const res = await axios.get(`${apiUrl}/api/vinyl-product`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const products = res.data.vinylProducts || [];
      setProducts(products);
      console.log("Fetched products:", products);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  fetchProducts();
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
}

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
            if (formData.image.file) {
        formDataToSend.append("image", formData.image.file); 
        }

      formDataToSend.append("product", formData.product || "");

      await axios.patch(`${apiUrl}/api/vinyl-product-variant/${_id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        navigate("/admin/vinyl-product-variants");
      }, 1000);

              toast.success("Vinyl product variant updated successfully!");

    } catch (error) {
      console.error("Error adding vinyl product variants:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");

              toast.error("Failed to update vinyl product variant");

    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit vinyl product variant</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
         <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Product</label>
                <select
                  required
                  value={formData.product}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option selected disabled value="">Select product</option>
                  {products.map((variant) => (
                    <option key={variant._id} value={variant._id}>
                      {variant.name}
                    </option>
                  ))}
                </select>
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
                  value={formData.name}
                  onChange={handleChange}
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

            {/* Alt */}
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

export default EditVinylProductVariant;
