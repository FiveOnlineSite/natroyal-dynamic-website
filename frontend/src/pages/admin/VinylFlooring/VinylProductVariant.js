import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Layout from "../../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const VinylProductVariant = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [yellowTitle, setYellowTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [blackTitle, setBlackTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedProduct, setSelectedProduct] = useState({});

  const [product, setProduct] = useState([]);
  const [variant, setVariant] = useState([
    { name: "", image: null, alt: "", link: "", product_id: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchVinylProduct = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/vinyl-product`);
        const vinylProduct = response.data.vinylProduct;
        setProduct(vinylProduct);
      } catch (error) {
        console.error("Error fetching vinyl product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVinylProduct();
  }, []);

  useEffect(() => {
    const fetchVinylProductVariant = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/vinyl-product-variant`);
        const VinylProductVariantData = response.data.VinylProductVariant[0];

        setYellowTitle(VinylProductVariantData.yellow_title || "");
        setBlackTitle(VinylProductVariantData.black_title || "");
        setContent(VinylProductVariantData.content || "");

        const variant = (VinylProductVariantData.variant || []).map((vari) => ({
          ...vari,
          _id: vari._id?.toString() || "",
          name: vari.name || "",
          alt: vari.alt || "",
          image: vari.image || null,
          link: vari.link || "",
          product: vari.product || "",
          product_name: vari.product_name || "",
        }));
        setProduct(variant);

        const selectedProduct = {};
        product.forEach((vari) => {
          if (vari.product) {
            selectedProduct[vari._id] = vari.product.toString();
          }
        });
        setSelectedProduct(selectedProduct);
      } catch (error) {
        console.error("Error fetching product variant:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVinylProductVariant();
  }, []);

 const flattenedProducts = Array.isArray(product)
   ? product.flatMap((p) => (p.subProducts ? p.subProducts : [p]))
   : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    

    const imageErrors = variant.some((variant) => {
      return !variant._id && !(variant.image instanceof File);
    });

     if (imageErrors) {
       setErrorMessage("Please upload images for new application.");
       setIsSubmitting(false);
       return;
     }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const titleForm = new FormData();
      titleForm.append("yellow_title", yellowTitle);
      titleForm.append("black_title", blackTitle);
      titleForm.append("content", content);

      await axios.patch(`${apiUrl}/api/vinyl-product`, titleForm, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      for (const vari of variant) {
        const formData = new FormData();

        if (vari.image instanceof File) formData.append("image", vari.image);

        const variantArray = {
          _id: vari._id,
          name: vari.name || "",
          alt: vari.alt || "",
          link: vari.link || "",
          product: Array.isArray(vari.product) ? vari.product : [],
        };

        formData.append("variant", JSON.stringify([variantArray]));

        await axios.patch(`${apiUrl}/api/vinyl-product-variant`, formData, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setTimeout(() => navigate("/admin/vinyl-product-variants"), 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProductVariant = async (variantId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product variant?"
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.delete(`${apiUrl}/api/vinyl-product-variant/${variantId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const updatedVariant = variant.filter((item) => item._id !== variantId);
      setVariant(updatedVariant);

      setSelectedProduct((prev) => {
        const copy = { ...prev };
        delete copy[variantId];
        return copy;
      });
    } catch (error) {
      console.error("Error deleting product variant:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete product variant"
      );
    }
  };


  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Vinyl Product Variants</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <div className="theme-form">
                <label>Yellow Title</label>
                <input
                  type="text"
                  required
                  value={yellowTitle}
                  onChange={(e) => setYellowTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="theme-form">
                <label>Black Title</label>
                <input
                  type="text"
                  value={blackTitle}
                  onChange={(e) => setBlackTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Content</label>
                <Editor
                  apiKey={process.env.REACT_APP_TINY_CLOUD_API_KEY}
                  value={content}
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
                  onEditorChange={(content) => setContent(content)}
                />
              </div>
            </div>

            {variant.map((item, index) => (
              <div key={index} className="border p-3 mb-3 delete-button-div">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="theme-form">
                      <label>Name</label>
                      <input
                        type="text"
                        value={item.name}
                        required
                        onChange={(e) => {
                          const updated = [...product];
                          updated[index].name = e.target.value;
                          setProduct(updated);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="theme-form">
                      <label>Alt</label>
                      <input
                        type="text"
                        value={item.alt}
                        required
                        onChange={(e) => {
                          const updated = [...product];
                          updated[index].alt = e.target.value;
                          setProduct(updated);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="theme-form">
                      <label>Product</label>
                      <select
                        value={setSelectedProduct[item._id] || ""}
                        required
                        onChange={(e) =>
                          setSelectedProduct((prev) => ({
                            ...prev,
                            [item._id]: e.target.value,
                          }))
                        }
                      >
                        <option value="" selected disabled>
                          Select an Product
                        </option>
                        {flattenedProducts.map((pro) => (
                          <option key={pro._id} value={pro._id}>
                            {pro.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="theme-form">
                      <label>Image</label>
                      <input
                        type="file"
                        accept=".webp,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file && file.size > 10 * 1024 * 1024) {
                            setErrorMessage(
                              "Image too large. Max size is 10MB."
                            );
                            return;
                          }
                          const updated = [...product];
                          updated[index].image = file;
                          setProduct(updated);
                        }}
                      />
                      {Array.isArray(item.image) &&
                        !(item.image instanceof File) &&
                        item.image[0]?.filepath && (
                          <img
                            src={item.image[0].filepath}
                            alt={item.alt || ""}
                            className="form-profile mt-2"
                          />
                        )}
                    </div>
                  </div>
                </div>


                {item._id ? (
                  <button
                    type="button"
                    className="btn m-2 delete-btn"
                    onClick={() => handleDeleteProductVariant(item._id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn remove-btn m-2"
                    onClick={() => {
                      const updated = [...product];
                      updated.splice(index, 1);
                      setProduct(updated);
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {errorMessage && (
              <div className="text-danger col-12 mt-2">{errorMessage}</div>
            )}

            <div className="col-lg-6 d-flex align-items-center">
              <div className="theme-form">
                <button
                  type="button"
                  onClick={() =>
                    setVariant([
                      ...variant,
                      {
                        name: "",
                        image: null,
                        alt: "",
                        link: "",
                        product: "",
                      },
                    ])
                  }
                >
                  + Add New Product Variant
                </button>
              </div>

              <div className="theme-form ms-3">
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
    </Layout>
  );
};

export default VinylProductVariant;
