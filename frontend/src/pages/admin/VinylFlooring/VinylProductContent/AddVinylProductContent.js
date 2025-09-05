import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const AddVinylProductContent = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [product, setProduct] = useState(""); 
  const [products, setProducts] = useState([]); 
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const apiUrl = process.env.REACT_APP_API_URL;

        const res = await axios.get(`${apiUrl}/api/vinyl-product`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log("vinyl product", res.data.vinylProducts);

        setProducts(res.data.vinylProducts || []); // adjust key based on your API
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;
  setIsSubmitting(true);
  setErrorMessage("");

  try {
    const access_token = localStorage.getItem("access_token");
    const apiUrl = process.env.REACT_APP_API_URL;

    const plainContent = content.replace(/<\/?[^>]+(>|$)/g, "");

    await axios.post(
      `${apiUrl}/api/vinyl-product-content`,
      {
        product,
        title1: title1,
        title2: title2,
        content: plainContent, 
      },
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    setTimeout(() => {
      navigate("/admin/vinyl-product-content");
    }, 1000);
  } catch (error) {
    console.error("Error adding vinyl product:", error);
    setErrorMessage(error.response?.data?.message || "An error occurred");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add vinyl product content</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">

            {/* product Dropdown */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Product</label>
                <select
                  required
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="form-control"
                >
                  <option selected disabled value="">Select product</option>
                  {products.map((pro) => (
                    <option key={pro._id} value={pro._id}>
                      {pro.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Yellow Title */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title1</label>
                <input
                  type="text"
                  value={title1}
                  onChange={(e) => setTitle1(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Black Title */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title2</label>
                <input
                  type="text"
                  value={title2}
                  onChange={(e) => setTitle2(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Content */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Content</label>
                <Editor
                  apiKey={process.env.REACT_APP_TINY_CLOUD_API_KEY}
                  value={content}
                  init={{
                    height: 200,
                                            menubar: false,
                                             forced_root_block: "",
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
                  onEditorChange={(newContent) => setContent(newContent)} 
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

export default AddVinylProductContent;
