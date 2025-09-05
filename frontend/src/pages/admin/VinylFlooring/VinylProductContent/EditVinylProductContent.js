import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const EditVinylProductContent = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [vinylProductContent, setVinylProductContent] = useState("");
 
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

   const [formData, setFormData] = useState({
     title1: "",
     title2: "",
     content: "",
     product: "",
   });

   const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const access_token = localStorage.getItem("access_token");
      const response = await axios.get(`${apiUrl}/api/vinyl-product`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setProducts(response.data.vinylProducts || []);
      console.log("products", response.data.vinylProducts)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  fetchProducts();
}, []);


  useEffect(() => {
    const fetchVinylProductContent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/vinyl-product-content/${id}`);
        const vinylProductContentData = response.data.productContent;
        setVinylProductContent(vinylProductContentData);

        console.log("vinyl product content data", vinylProductContentData);

        setFormData({
          title1: vinylProductContentData.title1,
          title2: vinylProductContentData.title2,
          content: vinylProductContentData.content,
          product: vinylProductContentData.product?._id || "", 
        });
      } catch (error) {
        console.error("Error fetching vinyl product Content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVinylProductContent();
  }, []);

   const handleChange = (e) => {
    const { name, value } = e.target;

   setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
    }));
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.patch(`${apiUrl}/api/vinyl-product-content/${id}`,
        {
          title1: formData.title1,
          title2: formData.title2,
          content: formData.content,
        product: formData.product,
        },
        {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        
      });

      setTimeout(() => {
        navigate("/admin/vinyl-product-content");
      }, 1000);
    } catch (error) {
      console.error("Error adding vinyl product contents:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit vinyl product content</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Product</label>
                <select
                  required
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="form-control"
                >
                    <option selected disabled value="">Select product</option>
                    {products && products.map((pro) => (
                        <option key={pro._id} value={pro._id}>
                        {pro.name}
                        </option>
                    ))}
                    </select>

              </div>
            </div>

           <div className="col-lg-6">
                       <div className="theme-form">
                         <label>Title1</label>
                         <input
                           type="text"
                           required
                           name="title1"
                           value={formData.title1}
                           onChange={handleChange}
                         />
                       </div>
                     </div>
         
                     <div className="col-lg-6">
                       <div className="theme-form">
                         <label>Title2</label>
                         <input
                           type="text"
                           name="title2"
                           value={formData.title2}
                           onChange={handleChange}
                         />
                       </div>
                     </div>
         
                     <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                       <div className="theme-form">
                         <label>Content</label>
                         <Editor
                           apiKey={process.env.REACT_APP_TINY_CLOUD_API_KEY}
                           value={formData.content}
                           name="content"
                           init={{
                             height: 200,
                             menubar: false,
                             plugins: ["link", "lists", "code", "casechange"],
                             toolbar:
                               "undo redo | formatselect | fontsize | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | code",
                             content_style: `
                               body {
                                 font-family: 'Jost', sans-serif;
                                 color: #6d7175;
                               }
                             `,
                           }}
                           onEditorChange={(newContent) =>
                                setFormData((prev) => ({ ...prev, content: newContent }))
                             }
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


export default EditVinylProductContent;
